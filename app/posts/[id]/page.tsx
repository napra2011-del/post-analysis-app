// app/posts/[id]/page.tsx

// ✅ Ensures route works dynamically
export const dynamic = 'force-dynamic';

import PostAnalysisClient from '../../../components/PostAnalysisClient';

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: Props) {
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
