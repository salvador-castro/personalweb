import { Column, Heading } from '@/once-ui/components'
import { Mailchimp } from '@/components'
import { BlogPage } from '@/components/blog/BlogPagination'
import { baseURL } from '@/app/resources'
import { blog, person, newsletter } from '@/app/resources/content'
import { Meta, Schema } from '@/once-ui/modules'

export async function generateMetadata () {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
    path: blog.path
  })
}

export default function Blog () {
  return (
    <Column maxWidth='s'>
      <Schema
        as='blog'
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
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
        <BlogPage page={1} />
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  )
}
