import BlogPost from '@/components/pages/Blog/BlogPost'

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return <BlogPost postId={params.id} />
}

