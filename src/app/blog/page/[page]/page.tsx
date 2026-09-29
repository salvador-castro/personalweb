import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import { Column, Heading } from '@/once-ui/components'
import { BlogPage, getTotalPages } from '@/components/blog/BlogPagination'
import { baseURL } from '@/app/resources'
import { blog, person } from '@/app/resources/content'
import { Meta, Schema } from '@/once-ui/modules'

export const dynamicParams = false

export async function generateStaticParams () {
  const totalPages = getTotalPages()
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export async function generateMetadata ({
  params
}: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const { page } = await params
  const title = `${blog.title} – Página ${page}`
  return Meta.generate({
    title,
    description: blog.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
    path: `${blog.path}/page/${page}`
  })
}

export default async function BlogPaginated ({
  params
}: {
  params: Promise<{ page: string }>
}) {
  const { page: pageParam } = await params
  const page = Number(pageParam)

  if (page === 1) redirect(blog.path)
  if (!Number.isInteger(page) || page < 1 || page > getTotalPages()) notFound()

  return (
    <Column maxWidth='s'>
      <Schema
        as='blog'
        baseURL={baseURL}
        title={`${blog.title} – Página ${page}`}
        description={blog.description}
        path={`${blog.path}/page/${page}`}
        image={`${baseURL}/og?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`
        }}
      />
      <Heading marginBottom='xs' variant='display-strong-m'>
        {blog.title}
      </Heading>
      <Heading marginBottom='l' variant='body-default-l'>
        {blog.description}
      </Heading>
      <Column fillWidth flex={1}>
        <BlogPage page={page} />
      </Column>
    </Column>
  )
}
