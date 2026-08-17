import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing url parameter' },
      { status: 400 }
    );
  }

  try {
    if (url.includes('gitlab.com')) {
      const parts = url.split('gitlab.com/')[1];
      if (parts) {
        const encodedPath = encodeURIComponent(parts.replace(/\/$/, ''));
        const res = await fetch(
          `https://gitlab.com/api/v4/projects/${encodedPath}`,
          {
            next: { revalidate: 3600 },
          }
        );
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ stars: data.star_count });
        }
      }
    } else if (url.includes('github.com')) {
      const parts = url.split('github.com/')[1];
      if (parts) {
        const cleanPath = parts.replace(/\/$/, '');
        const res = await fetch(`https://api.github.com/repos/${cleanPath}`, {
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ stars: data.stargazers_count });
        }
      }
    }
  } catch (error) {
    console.error('Error fetching repo stats:', error);
  }

  return NextResponse.json({ stars: 0 }, { status: 200 });
}
