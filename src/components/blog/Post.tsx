import Link from 'next/link';
import { Column, Flex, Heading, SmartImage, SmartLink, Tag, Text } from '@/once-ui/components';
import styles from './Posts.module.scss';
import { formatDate } from '@/app/utils/formatDate';

interface PostProps {
    post: any;
    thumbnail: boolean;
    direction?: "row" | "column";
}

// The post link stretches over the whole card; the tag link is a sibling on top of it (no nested <a>)
export default function Post({ post, thumbnail, direction }: PostProps) {
    return (
        <Flex
            position="relative"
            transition="micro-medium"
            direction={direction}
            radius="l"
            className={styles.hover}
            mobileDirection="column"
            fillWidth>
            {post.metadata.image && thumbnail && (
                <SmartImage
                    priority
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 640px"
                    border="neutral-alpha-weak"
                    cursor="interactive"
                    radius="l"
                    src={post.metadata.image}
                    // The generated OG fallback (/og?title=...) is already an optimized PNG
                    unoptimized={post.metadata.image.startsWith('/og')}
                    alt={'Thumbnail of ' + post.metadata.title}
                    aspectRatio="16 / 9"
                />
            )}
            <Column
                fillWidth gap="4"
                padding="24"
                vertical="center">
                <Heading
                    as="h2"
                    variant="heading-strong-l"
                    wrap="balance">
                    <SmartLink
                        unstyled
                        className={styles.stretchedLink}
                        href={`/blog/${post.slug}`}>
                        {post.metadata.title}
                    </SmartLink>
                </Heading>
                <Text
                    variant="label-default-s"
                    onBackground="neutral-weak">
                    {formatDate(post.metadata.publishedAt, false)}
                </Text>
                {post.metadata.tag && (
                    <Link
                        className={styles.tagLink}
                        href={`/blog/tag/${encodeURIComponent(post.metadata.tag)}`}>
                        <Tag
                            className="mt-12"
                            label={post.metadata.tag}
                            variant="neutral" />
                    </Link>
                )}
            </Column>
        </Flex>
    );
}
