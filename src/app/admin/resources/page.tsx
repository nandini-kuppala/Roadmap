'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
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

type ResourceType = 'video' | 'article' | 'tool' | 'file';
interface FormData { title: string; url: string; type: ResourceType; category: string; description: string; }
const emptyForm: FormData = { title: '', url: '', type: 'video', category: '', description: '' };

export default function AdminResourcesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    if (status === 'authenticated' && (session?.user as { role?: string })?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  const fetchResources = () => {
    fetch('/api/resources')
      .then((res) => res.json())
      .then((data) => setResources(data.resources || []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (status === 'authenticated') fetchResources();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const method = editResource ? 'PUT' : 'POST';
      const url = editResource ? `/api/resources/${editResource._id}` : '/api/resources';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      fetchResources();
      setShowForm(false);
      setEditResource(null);
      setFormData(emptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/resources/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setResources((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditResource(resource);
    setFormData({
      title: resource.title,
      url: resource.url,
      type: resource.type,
      category: resource.category,
      description: resource.description || '',
    });
    setShowForm(true);
  };

  const groupedResources = resources.reduce<Record<string, Resource[]>>((acc, r) => {
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
      <AdminSidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Resources</h1>
              <p className="text-text-secondary mt-1">{resources.length} resources added</p>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditResource(null); setFormData(emptyForm); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-background rounded-xl font-medium text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Resource
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-surface border border-border rounded-2xl p-6 mb-6 animate-fade-in">
              <h2 className="font-semibold text-text-primary mb-4">
                {editResource ? 'Edit Resource' : 'Add New Resource'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-error/10 border border-error/30 rounded-lg px-4 py-2 text-error text-sm">
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-secondary">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      required
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-secondary">URL *</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData((p) => ({ ...p, url: e.target.value }))}
                      required
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-secondary">Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value as 'video' | 'article' | 'tool' | 'file' }))}
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent"
                    >
                      <option value="video">Video</option>
                      <option value="article">Article</option>
                      <option value="tool">Tool</option>
                      <option value="file">File</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-secondary">Category *</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                      required
                      placeholder="e.g. DSA, System Design, OOPs"
                      className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-secondary">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    rows={2}
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-background rounded-xl font-medium text-sm disabled:opacity-60 transition-colors"
                  >
                    {isSaving ? 'Saving...' : editResource ? 'Update' : 'Add Resource'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditResource(null); setFormData(emptyForm); }}
                    className="px-5 py-2.5 bg-surface-2 border border-border text-text-secondary rounded-xl text-sm hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Delete Confirm */}
          {deleteConfirm && (
            <div className="bg-error/10 border border-error/30 rounded-xl p-4 mb-6 flex items-center justify-between">
              <p className="text-error text-sm">Are you sure you want to delete this resource?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-3 py-1.5 bg-error text-white rounded-lg text-xs font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-3 py-1.5 bg-surface-2 border border-border text-text-secondary rounded-lg text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Resources grouped */}
          {Object.keys(groupedResources).length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-12 text-center">
              <p className="text-text-secondary">No resources yet. Add your first resource above.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedResources).map(([category, catResources]) => (
                <div key={category}>
                  <h2 className="font-semibold text-text-primary mb-3">{category}</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {catResources.map((resource) => (
                      <ResourceCard
                        key={resource._id}
                        resource={resource}
                        isAdmin
                        onDelete={(id) => setDeleteConfirm(id)}
                        onEdit={handleEdit}
                      />
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
