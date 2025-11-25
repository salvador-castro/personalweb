'use client'

import { mailchimp } from '@/app/resources'
import {
  Button,
  Heading,
  Input,
  Text,
  Background,
  Column,
  Flex
} from '@/once-ui/components'
import { opacity, SpacingToken } from '@/once-ui/types'
import { useState } from 'react'
import { Portal } from './Portal'

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T {
  let timeout: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }) as T
}

type NewsletterProps = {
  display: boolean
  title: string | JSX.Element
  description: string | JSX.Element
}

export const Mailchimp = ({ newsletter }: { newsletter: NewsletterProps }) => {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [touched, setTouched] = useState<boolean>(false)

  const validateEmail = (email: string): boolean => {
    if (email === '') {
      return true
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (!validateEmail(value)) {
      setError('Please enter a valid email address.')
    } else {
      setError('')
    }
  }

  const debouncedHandleChange = debounce(handleChange, 2000)

  const handleBlur = () => {
    setTouched(true)
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
    }
  }
  const [showPopup, setShowPopup] = useState(false)

  const handleSubmit = () => {
    setTimeout(() => {
      setShowPopup(true)
    }, 1200) // dejamos salir el POST de Mailchimp
  }

  return (
    <Column
      overflow='visible'
      fillWidth
      padding='xl'
      radius='l'
      marginBottom='m'
      horizontal='center'
      align='center'
      background='surface'
      border='neutral-alpha-weak'
    >
      <Background
        position='absolute'
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color
        }}
      />
      <Heading
        style={{ position: 'relative' }}
        marginBottom='s'
        variant='display-strong-xs'
      >
        {newsletter.title}
      </Heading>
      <Text
        style={{
          position: 'relative',
          maxWidth: 'var(--responsive-width-xs)'
        }}
        wrap='balance'
        marginBottom='l'
        onBackground='neutral-medium'
      >
        {newsletter.description}
      </Text>

      <iframe
        name='hidden-mailchimp-frame'
        style={{ display: 'none' }}
        title='hidden-mailchimp'
      />

      <form
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
        action={mailchimp.action}
        method='post'
        id='mc-embedded-subscribe-form'
        name='mc-embedded-subscribe-form'
        target='hidden-mailchimp-frame'
        onSubmit={handleSubmit}
      >
        {/* Contenedor en columna fijo (ya NO es Flex de Once UI) */}
        <div
          id='mc_embed_signup_scroll'
          style={{
            width: '100%',
            maxWidth: '24rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--static-space-8)'
          }}
        >
          {/* Fila 1: Nombre + Apellido */}
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--static-space-8)'
            }}
          >
            <Input
              formNoValidate
              labelAsPlaceholder
              id='mce-FNAME'
              name='FNAME'
              type='text'
              label='Nombre'
              required
              style={{ width: '100%' }}
            />
            <Input
              formNoValidate
              labelAsPlaceholder
              id='mce-LNAME'
              name='LNAME'
              type='text'
              label='Apellidos'
              required
              style={{ width: '100%' }}
            />
          </div>

          {/* Fila 2: Número de teléfono */}
          <Input
            formNoValidate
            labelAsPlaceholder
            id='mce-PHONE'
            name='PHONE'
            type='number'
            label='Número de teléfono'
            style={{ width: '100%' }}
          />

          {/* Respuestas Mailchimp (ocultas) */}
          <div id='mce-responses' className='clearfalse'>
            <div
              className='response'
              id='mce-error-response'
              style={{ display: 'none' }}
            />
            <div
              className='response'
              id='mce-success-response'
              style={{ display: 'none' }}
            />
          </div>

          {/* Honeypot (bot field) */}
          <div
            aria-hidden='true'
            style={{ position: 'absolute', left: '-5000px' }}
          >
            <input
              type='text'
              name='b_88b29d5e90032b558d0f0fb95_0966db89bf'
              tabIndex={-1}
              defaultValue=''
            />
          </div>

          {/* Fila 3: Email + botón */}
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '2fr auto',
              gap: 'var(--static-space-8)'
            }}
          >
            <Input
              formNoValidate
              labelAsPlaceholder
              id='mce-EMAIL'
              name='EMAIL'
              type='email'
              label='Email'
              required
              onChange={e => {
                if (error) {
                  handleChange(e)
                } else {
                  debouncedHandleChange(e)
                }
              }}
              onBlur={handleBlur}
              errorMessage={error}
              style={{ width: '100%' }}
            />
            <Flex height='48' vertical='center'>
              <Button
                id='mc-embedded-subscribe'
                name='subscribe'
                value='Subscribe'
                size='m'
                fillWidth
                type='submit'
              >
                Suscribirme
              </Button>
            </Flex>
          </div>
        </div>
      </form>
      {showPopup && (
        <Portal>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999
            }}
          >
            <div
              style={{
                background: 'var(--surface-background)',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                width: 'min(90%, 380px)',
                border: '1px solid var(--neutral-alpha-weak)'
              }}
            >
              <h2 style={{ marginBottom: '1rem' }}>¡Suscripción exitosa! 🎉</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Gracias por sumarte al newsletter. Te acabo de agregar a mi
                lista ✨
              </p>
              <Button
                size='m'
                onClick={() => {
                  setShowPopup(false)
                  window.location.reload()
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </Column>
  )
}
