import { Button, Card, Column, Grid, Heading, Text } from '@/once-ui/components'
import { getPosts, type BlogPost } from '@/app/utils/utils'
import { servicios } from '@/app/resources/content'
import Post from './Post'

const RELATED_COUNT = 4

const byNewest = (a: BlogPost, b: BlogPost) =>
  new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()

/** Posts with the same tag, topped up with the most recent ones; never includes the current post. */
function getRelatedPosts (current: BlogPost) {
  const others = getPosts(['src', 'app', 'blog', 'posts'])
    .filter((post) => post.slug !== current.slug)
    .sort(byNewest)
  const sameTag = others.filter((post) => current.metadata.tag && post.metadata.tag === current.metadata.tag)
  const recent = others.filter((post) => !sameTag.includes(post))
  return [...sameTag, ...recent].slice(0, RELATED_COUNT)
}

export function RelatedPosts ({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post)

  return (
    <Column as='aside' fillWidth gap='24' marginTop='40'>
      {related.length > 0 && (
        <Column fillWidth gap='12'>
          <Heading as='h2' variant='heading-strong-xl'>
            Artículos relacionados
          </Heading>
          <Grid columns='2' mobileColumns='1' fillWidth gap='12'>
            {related.map((relatedPost) => (
              <Post
                key={relatedPost.slug}
                // Post doesn't render the body: skip it in the RSC payload
                post={{ ...relatedPost, content: '' }}
                thumbnail={false}
                headingAs='h3'
              />
            ))}
          </Grid>
        </Column>
      )}
      <Card direction='column' padding='24' gap='12' radius='l' background='brand-alpha-weak'>
        <Heading as='h2' variant='heading-strong-l' wrap='balance'>
          ¿Necesitás una web para tu negocio?
        </Heading>
        <Text variant='body-default-m' onBackground='neutral-weak'>
          Diseño y desarrollo sitios rápidos, fáciles de encontrar en Google y pensados para conseguir clientes.
        </Text>
        <Button href={servicios.path} variant='secondary' size='s' arrowIcon style={{ width: 'fit-content' }}>
          Ver servicios y precios
        </Button>
      </Card>
    </Column>
  )
}
