import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  MessageCircle
} from 'lucide-react'
import type { CSSProperties } from 'react'

type ShareIconsProps = {
  url: string
  text?: string
}

export default function ShareIcons ({
  url,
  text = 'Mirá este artículo'
}: ShareIconsProps) {
  const encodedURL = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const links = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedURL}`,
    instagram: `https://www.instagram.com/?url=${encodedURL}`
  }

  const iconWrapper: CSSProperties = {
    width: '34px',
    height: '34px',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.04)',
    cursor: 'pointer'
  }

  const iconStyle: CSSProperties = {
    width: '18px',
    height: '18px'
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '22px',
        marginBottom: '4px'
      }}
    >
      <span
        style={{
          fontSize: '14px',
          fontWeight: 500,
          opacity: 0.8
        }}
      >
        Compartir en:
      </span>

      <div style={{ display: 'flex', gap: '10px' }}>
        <a href={links.twitter} target='_blank' rel='noopener noreferrer'>
          <div style={iconWrapper}>
            <Twitter style={iconStyle} />
          </div>
        </a>

        <a href={links.facebook} target='_blank' rel='noopener noreferrer'>
          <div style={iconWrapper}>
            <Facebook style={iconStyle} />
          </div>
        </a>

        <a href={links.linkedin} target='_blank' rel='noopener noreferrer'>
          <div style={iconWrapper}>
            <Linkedin style={iconStyle} />
          </div>
        </a>

        <a href={links.whatsapp} target='_blank' rel='noopener noreferrer'>
          <div style={iconWrapper}>
            <MessageCircle style={iconStyle} />
          </div>
        </a>

        <a href={links.instagram} target='_blank' rel='noopener noreferrer'>
          <div style={iconWrapper}>
            <Instagram style={iconStyle} />
          </div>
        </a>
      </div>
    </div>
  )
}
