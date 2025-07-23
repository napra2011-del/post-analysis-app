import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { body, title } = await req.json();

    if (!body || !title) {
      return NextResponse.json({ error: 'Missing title or body' }, { status: 400 });
    }

    // Call the C++ analyzer backend
    const analyzerRes = await fetch('https://post-analysis-app-1.onrender.com/analyze', {
      method: 'POST',
      body,
    });

    if (!analyzerRes.ok) {
      throw new Error('C++ analyzer failed');
    }

    const { wordCount, keywords } = await analyzerRes.json();

    // Join keywords into a string for DB storage
    const keywordString = Array.isArray(keywords)
      ? keywords.join(', ')
      : String(keywords);

    // Save in DB
    const savedPost = await prisma.post.create({
      data: {
        title,
        body,
        analysis: {
          create: {
            wordCount,
            keywords: keywordString,
          },
        },
      },
      include: {
        analysis: true,
      },
    });

    return NextResponse.json({
      wordCount: savedPost.analysis.wordCount,
      keywords: savedPost.analysis.keywords.split(',').map(k => k.trim()),
    });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Failed to analyze post' }, { status: 500 });
  }
}
