import { Button, Flex, Text } from '@/once-ui/components'
import { getPosts } from '@/app/utils/utils'
import { Posts } from './Posts'

// 1 featured + 2 with thumbnail + 10 in a 2-column grid
export const POSTS_PER_PAGE = 13

export function getTotalPages () {
  const total = getPosts(['src', 'app', 'blog', 'posts']).length
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE))
}

export function pageHref (page: number) {
  return page <= 1 ? '/blog' : `/blog/page/${page}`
}

export function BlogPage ({ page }: { page: number }) {
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  return (
    <>
      <Posts range={[start + 1, start + 1]} thumbnail direction='column' />
      <Posts range={[start + 2, start + 3]} thumbnail />
      <Posts range={[start + 4, end]} columns='2' />
      <BlogPagination page={page} totalPages={getTotalPages()} />
    </>
  )
}

function BlogPagination ({ page, totalPages }: { page: number, totalPages: number }) {
  if (totalPages <= 1) return null

  return (
    <Flex
      as='nav'
      aria-label='Paginación del blog'
      fillWidth
      horizontal='space-between'
      vertical='center'
      gap='12'
      marginBottom='40'
    >
      <Flex flex={1} horizontal='start'>
        {page > 1 && (
          <Button
            data-border='rounded'
            href={pageHref(page - 1)}
            variant='tertiary'
            size='s'
            prefixIcon='chevronLeft'
          >
            Anteriores
          </Button>
        )}
      </Flex>
      <Text variant='body-default-s' onBackground='neutral-weak'>
        Página {page} de {totalPages}
      </Text>
      <Flex flex={1} horizontal='end'>
        {page < totalPages && (
          <Button
            data-border='rounded'
            href={pageHref(page + 1)}
            variant='tertiary'
            size='s'
            suffixIcon='chevronRight'
          >
            Siguientes
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
