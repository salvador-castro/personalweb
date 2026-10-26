import { Button, Flex } from '@/once-ui/components'
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

// Every page is linked from every page, so the deepest ones stay one click away
function BlogPagination ({ page, totalPages }: { page: number, totalPages: number }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <Flex
      as='nav'
      aria-label='Paginación del blog'
      fillWidth
      horizontal='center'
      vertical='center'
      gap='8'
      wrap
      marginBottom='40'
    >
      {page > 1 && (
        <Button
          data-border='rounded'
          href={pageHref(page - 1)}
          variant='tertiary'
          size='s'
          prefixIcon='chevronLeft'
          aria-label='Página anterior'
        >
          Anterior
        </Button>
      )}
      {pages.map((n) => (
        <Button
          key={n}
          data-border='rounded'
          href={pageHref(n)}
          variant={n === page ? 'primary' : 'tertiary'}
          size='s'
          aria-label={`Página ${n}`}
          aria-current={n === page ? 'page' : undefined}
        >
          {n}
        </Button>
      ))}
      {page < totalPages && (
        <Button
          data-border='rounded'
          href={pageHref(page + 1)}
          variant='tertiary'
          size='s'
          suffixIcon='chevronRight'
          aria-label='Página siguiente'
        >
          Siguiente
        </Button>
      )}
    </Flex>
  )
}
