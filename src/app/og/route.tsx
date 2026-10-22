import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { ImageResponse } from 'next/og'
import { person } from '@/app/resources/content'

export const runtime = 'nodejs'

const WIDTH = 1920
const HEIGHT = 1080
const BACKGROUND = '#151515'
const DEFAULT_TITLE = 'Portfolio'
const MAX_TITLE_LENGTH = 120

const SUCCESS_CACHE = 'public, immutable, no-transform, max-age=31536000'
// Fallbacks are cached briefly so a fixed render replaces them soon
const FALLBACK_CACHE = 'public, max-age=300'

type Font = { name: string; data: Buffer; style: 'normal' }

let fontPromise: Promise<Font[]> | undefined
let avatarPromise: Promise<string | null> | undefined

function loadFonts (): Promise<Font[]> {
  fontPromise ??= readFile(path.join(process.cwd(), 'public/fonts/Inter.ttf'))
    .then((data): Font[] => [{ name: 'Inter', data, style: 'normal' }])
    .catch((error) => {
      console.error('[og] Failed to load Inter font, using default font:', error)
      fontPromise = undefined
      return []
    })
  return fontPromise
}

// Satori can't decode WebP, so the avatar is read from disk and converted to a PNG data URI
function loadAvatar (): Promise<string | null> {
  avatarPromise ??= sharp(path.join(process.cwd(), 'public', person.avatar))
    .resize(384, 384, { fit: 'cover' })
    .png()
    .toBuffer()
    .then((png) => `data:image/png;base64,${png.toString('base64')}`)
    .catch((error) => {
      console.error('[og] Failed to load avatar, rendering without it:', error)
      avatarPromise = undefined
      return null
    })
  return avatarPromise
}

function sanitizeTitle (raw: string | null): string {
  const title = (raw ?? '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!title) return DEFAULT_TITLE
  const chars = Array.from(title)
  return chars.length > MAX_TITLE_LENGTH
    ? chars.slice(0, MAX_TITLE_LENGTH - 1).join('').trimEnd() + '…'
    : title
}

function OgImage ({ title, avatar }: { title: string; avatar: string | null }) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '8rem',
        background: BACKGROUND
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '4rem',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          color: 'white'
        }}
      >
        <span
          style={{
            fontSize: '8rem',
            lineHeight: '8rem',
            letterSpacing: '-0.05em',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            textWrap: 'balance'
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5rem'
          }}
        >
          {avatar && (
            <img
              src={avatar}
              width={192}
              height={192}
              style={{
                width: '12rem',
                height: '12rem',
                objectFit: 'cover',
                borderRadius: '100%'
              }}
            />
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <span
              style={{
                fontSize: '4.5rem',
                lineHeight: '4.5rem',
                whiteSpace: 'pre-wrap',
                textWrap: 'balance'
              }}
            >
              {person.name}
            </span>
            <span
              style={{
                fontSize: '2.5rem',
                lineHeight: '2.5rem',
                whiteSpace: 'pre-wrap',
                textWrap: 'balance',
                opacity: '0.6'
              }}
            >
              {person.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ImageResponse renders lazily while streaming, so errors would surface after the
// headers were sent (500/502). Buffering here lets us catch them and fall back.
async function render (title: string, avatar: string | null, fonts: Font[]) {
  const image = new ImageResponse(<OgImage title={title} avatar={avatar} />, {
    width: WIDTH,
    height: HEIGHT,
    fonts
  })
  return Buffer.from(await image.arrayBuffer())
}

function pngResponse (body: Buffer, cacheControl: string) {
  return new Response(new Uint8Array(body), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': cacheControl
    }
  })
}

export async function GET (request: Request) {
  let title = DEFAULT_TITLE
  try {
    title = sanitizeTitle(new URL(request.url).searchParams.get('title'))
  } catch {
    // Malformed URL: keep the default title
  }

  const [fonts, avatar] = await Promise.all([loadFonts(), loadAvatar()])

  try {
    return pngResponse(await render(title, avatar, fonts), SUCCESS_CACHE)
  } catch (error) {
    console.error(`[og] Render failed for title "${title}":`, error)
  }

  try {
    // Strip anything outside Latin/punctuation (emoji, unsupported scripts) and drop the avatar
    const safeTitle = title.replace(/[^\p{Script=Latin}\p{N}\p{P}\p{Zs}]/gu, '').trim() || DEFAULT_TITLE
    return pngResponse(await render(safeTitle, null, fonts), FALLBACK_CACHE)
  } catch (error) {
    console.error('[og] Fallback render failed:', error)
  }

  // Last resort: a plain background image so crawlers never get a 5xx
  const blank = await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 3, background: BACKGROUND }
  }).png().toBuffer()
  return pngResponse(blank, FALLBACK_CACHE)
}
