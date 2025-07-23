// app/posts/[id]/page.tsx

import PostAnalysisClient from '@/components/PostAnalysisClient';

export const dynamic = 'force-dynamic'; // ✅ Prevent build-time rendering

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);
  if (!post) return <div>Post not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.body}</p>
      <PostAnalysisClient body={post.body} title={post.title} />
    </div>
  );
}
