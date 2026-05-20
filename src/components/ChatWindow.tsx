'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { cn, formatRelativeTime, getInitials } from '@/lib/utils';

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePicture?: string;
  };
  receiverId?: { _id: string; name: string } | null;
}

interface ChatWindowProps {
  withUserId?: string;
  withUserName?: string;
  placeholder?: string;
}

export default function ChatWindow({ withUserId, withUserName, placeholder }: ChatWindowProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const currentUserId = (session?.user as { id: string })?.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = useCallback(
    async (isInitial = false) => {
      try {
        const url = withUserId
          ? `/api/chat?with=${withUserId}`
          : '/api/chat';

        if (!isInitial && lastMessageId) {
          const res = await fetch(`${url}&after=${lastMessageId}`);
          if (!res.ok) return;
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages((prev) => [...prev, ...data.messages]);
            setLastMessageId(data.messages[data.messages.length - 1]._id);
            scrollToBottom();
          }
        } else {
          setIsLoading(true);
          const res = await fetch(url);
          if (!res.ok) return;
          const data = await res.json();
          setMessages(data.messages || []);
          if (data.messages?.length > 0) {
            setLastMessageId(data.messages[data.messages.length - 1]._id);
          }
          setIsLoading(false);
          setTimeout(scrollToBottom, 100);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        if (isInitial) setIsLoading(false);
      }
    },
    [withUserId, lastMessageId]
  );

  useEffect(() => {
    fetchMessages(true);
    // Poll every 3 seconds
    pollingRef.current = setInterval(() => {
      fetchMessages(false);
    }, 3000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withUserId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const content = newMessage.trim();
    setNewMessage('');
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          receiverId: withUserId || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data.message]);
        setLastMessageId(data.message._id);
        setTimeout(scrollToBottom, 50);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setNewMessage(content); // Restore on error
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-text-muted text-sm">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      {withUserName && (
        <div className="px-4 py-3 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-xs font-bold">
            {getInitials(withUserName)}
          </div>
          <div>
            <p className="text-text-primary font-medium text-sm">{withUserName}</p>
            <p className="text-text-muted text-xs">Student</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-text-muted">Live</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center">
              <svg className="w-7 h-7 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-text-secondary font-medium">No messages yet</p>
              <p className="text-text-muted text-sm">
                {placeholder || 'Start the conversation!'}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId._id === currentUserId;
            return (
              <div
                key={message._id}
                className={cn('flex gap-2', isOwnMessage ? 'flex-row-reverse' : 'flex-row')}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 overflow-hidden">
                  {message.senderId.profilePicture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={message.senderId.profilePicture}
                      alt={message.senderId.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(message.senderId.name)
                  )}
                </div>
                <div className={cn('max-w-[75%] space-y-1', isOwnMessage && 'items-end flex flex-col')}>
                  <div className="flex items-center gap-2">
                    {!isOwnMessage && (
                      <span className="text-xs font-medium text-text-secondary">
                        {message.senderId.name}
                      </span>
                    )}
                    <span className="text-xs text-text-muted">
                      {formatRelativeTime(message.createdAt)}
                    </span>
                  </div>
                  <div
                    className={cn(
                      'px-3 py-2 rounded-xl text-sm break-words',
                      isOwnMessage
                        ? 'bg-accent text-background rounded-tr-sm'
                        : 'bg-surface-2 text-text-primary border border-border rounded-tl-sm'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            maxLength={2000}
            className="flex-1 bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="w-10 h-10 rounded-xl bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
          >
            {isSending ? (
              <svg className="w-4 h-4 animate-spin text-background" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
