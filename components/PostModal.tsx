'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';

type Props = {
  onClose: () => void;
  onCreate: (post: { id: number; title: string; body: string }) => void;
};

export default function PostModal({ onClose, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    const newPost = {
      id: Math.floor(Math.random() * 10000),
      title,
      body,
    };
    onCreate(newPost);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl mb-4">Create New Post</h2>
        <input
          className="border w-full mb-2 p-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="border w-full mb-4 p-2"
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </div>
    </div>
  );
}
