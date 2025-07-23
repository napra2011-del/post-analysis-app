// app/posts/[id]/page.tsx
import PostAnalysisClient from '../../../components/PostAnalysisClient';
import { notFound } from 'next/navigation';

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateStaticParams() {
  // Pre-generating static pages for the first 10 posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts = await res.json();

  return posts.map((post: any) => ({
    id: post.id.toString(),
  }));
}

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);
  if (!post) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.body}</p>
      <PostAnalysisClient body={post.body} title={post.title} />
    </div>
  );
}
