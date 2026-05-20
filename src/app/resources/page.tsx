'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ResourceCard from '@/components/ResourceCard';

interface Resource {
  _id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'tool' | 'file';
  category: string;
  description?: string;
  thumbnail?: string;
  addedBy?: { name: string };
}

export default function ResourcesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/resources')
        .then((res) => res.json())
        .then((data) => {
          setResources(data.resources || []);
          setCategories(data.categories || []);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  const filteredResources = resources.filter((r) => {
    const matchCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchType = selectedType === 'all' || r.type === selectedType;
    const matchSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchType && matchSearch;
  });

  // Group by category
  const groupedResources = filteredResources.reduce<Record<string, Resource[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <div className="w-64 bg-surface border-r border-border" />
        <div className="flex-1 flex items-center justify-center">
          <svg className="w-8 h-8 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Resources</h1>
            <p className="text-text-secondary mt-1">
              Curated learning materials — videos, articles, and tools
            </p>
          </div>

          {/* Filters */}
          <div className="bg-surface border border-border rounded-xl p-4 mb-6 space-y-3">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl pl-10 pr-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-sm transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Type filter */}
              <div className="flex gap-1 bg-surface-2 rounded-lg p-1">
                {['all', 'video', 'article', 'tool', 'file'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                      selectedType === type
                        ? 'bg-accent text-background'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-surface-2 border border-border text-text-secondary text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Resources */}
          {Object.keys(groupedResources).length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-text-secondary font-medium">No resources found</p>
              <p className="text-text-muted text-sm mt-1">
                {search ? 'Try different search terms' : 'Resources will be added by your instructor'}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedResources).map(([category, categoryResources]) => (
                <div key={category}>
                  <h2 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </span>
                    {category}
                    <span className="text-text-muted text-sm font-normal">
                      ({categoryResources.length})
                    </span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {categoryResources.map((resource) => (
                      <ResourceCard key={resource._id} resource={resource} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
