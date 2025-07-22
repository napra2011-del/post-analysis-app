'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import PostModal from '../components/PostModal';

type Post = { id: number; title: string; body: string };
const POSTS_PER_PAGE = 10;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const paginated = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCreate = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Button onClick={() => setShowModal(true)}>New Post</Button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100 text-left">
          <tr><th className="p-2">ID</th><th className="p-2">Title</th><th className="p-2">View</th></tr>
        </thead>
        <tbody>
          {paginated.map(post => (
            <tr key={post.id} className="border-t">
              <td className="p-2">{post.id}</td>
              <td className="p-2">{post.title}</td>
              <td className="p-2"><Link href={`/posts/${post.id}`} className="text-blue-600 underline">View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4">
        <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
        <Button onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>

      {showModal && <PostModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
    </div>
  );
}
