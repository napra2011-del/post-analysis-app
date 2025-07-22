'use client';

import { useState } from 'react';

type Props = {
  body: string;
  title: string;
};

export default function PostAnalysisClient({ body, title }: Props) {
  const [analysis, setAnalysis] = useState<null | { wordCount: number; keywords: string[] }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, title }),
      });

      if (!res.ok) throw new Error('Failed to analyze post');

      const data = await res.json();
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Post'}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {analysis && (
        <div className="mt-4">
          <p><strong>Word Count:</strong> {analysis.wordCount}</p>
          <p><strong>Keywords:</strong> {analysis.keywords.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
