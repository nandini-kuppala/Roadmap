'use client';

import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: {
    _id: string;
    title: string;
    url: string;
    type: 'video' | 'article' | 'tool' | 'file';
    category: string;
    description?: string;
    thumbnail?: string;
    addedBy?: { name: string };
  };
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (resource: ResourceCardProps['resource']) => void;
}

const typeConfig = {
  video: {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    color: 'text-red-400',
    bg: 'bg-red-500/15',
    border: 'border-red-500/20',
    label: 'Video',
  },
  article: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/20',
    label: 'Article',
  },
  tool: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/20',
    label: 'Tool',
  },
  file: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/15',
    border: 'border-yellow-500/20',
    label: 'File',
  },
};

export default function ResourceCard({ resource, isAdmin, onDelete, onEdit }: ResourceCardProps) {
  const config = typeConfig[resource.type] || typeConfig.article;

  return (
    <div className="bg-surface border border-border rounded-xl p-4 hover:border-accent/30 transition-all group">
      <div className="flex items-start gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', config.bg, 'border', config.border)}>
          <span className={config.color}>{config.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-primary hover:text-accent transition-colors text-sm leading-snug"
            >
              {resource.title}
            </a>
            {isAdmin && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={() => onEdit?.(resource)}
                  className="p-1.5 rounded-lg hover:bg-blue-500/15 text-text-muted hover:text-blue-400 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete?.(resource._id)}
                  className="p-1.5 rounded-lg hover:bg-error/15 text-text-muted hover:text-error transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {resource.description && (
            <p className="text-xs text-text-muted mt-1 line-clamp-2">{resource.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={cn('text-xs px-2 py-0.5 rounded-full border', config.bg, config.border, config.color)}>
              {config.label}
            </span>
            <span className="text-xs text-text-muted bg-surface-2 rounded-full px-2 py-0.5">
              {resource.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
