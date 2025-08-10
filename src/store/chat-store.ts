'use client';

import { useSyncExternalStore } from 'react';

export type ChatMessage = {
  id: string;
  role: string;
  text: string;
  ts: number;
};

export type ChatStatus = 'idle' | 'sending' | 'error';

interface ChatState {
  conversationId?: string;
  messages: ChatMessage[];
  status: ChatStatus;
  conversations: Record<string, { messages: ChatMessage[]; status: ChatStatus }>;
}

const initialState: ChatState = {
  conversationId: undefined,
  messages: [],
  status: 'idle',
  conversations: {},
};

let state: ChatState = initialState;
const listeners = new Set<() => void>();

function setState(partial: Partial<ChatState> | ((s: ChatState) => Partial<ChatState>)) {
  const next = typeof partial === 'function' ? partial(state) : partial;
  state = { ...state, ...next };
  if (typeof window !== 'undefined') {
    localStorage.setItem('chat-store', JSON.stringify({ conversations: state.conversations }));
  }
  listeners.forEach((l) => l());
}

export function useChatStore<T>(selector: (s: ChatState) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => selector(state),
    () => selector(state),
  );
}

export const chatStoreActions = {
  start(id: string) {
    setState((s) => ({
      conversationId: id,
      messages: [],
      status: 'idle',
      conversations: { ...s.conversations, [id]: { messages: [], status: 'idle' } },
    }));
  },
  append(message: ChatMessage) {
    setState((s) => {
      const id = s.conversationId;
      if (!id) return {};
      const messages = [...s.messages, message];
      return {
        messages,
        conversations: { ...s.conversations, [id]: { messages, status: s.status } },
      };
    });
  },
  hydrate(id: string) {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('chat-store');
        if (raw) {
          const data = JSON.parse(raw) as Pick<ChatState, 'conversations'>;
          state = { ...state, conversations: data.conversations || {} };
        }
      } catch {
        /* ignore */
      }
    }
    const conv = state.conversations[id];
    setState({
      conversationId: id,
      messages: conv?.messages ?? [],
      status: conv?.status ?? 'idle',
    });
  },
  clear() {
    setState((s) => {
      const id = s.conversationId;
      if (id) {
        const rest = { ...s.conversations };
        delete rest[id];
        return {
          conversationId: undefined,
          messages: [],
          status: 'idle',
          conversations: rest,
        };
      }
      return { conversationId: undefined, messages: [], status: 'idle' };
    });
  },
  setStatus(status: ChatStatus) {
    setState((s) => {
      const id = s.conversationId;
      return {
        status,
        conversations: id
          ? { ...s.conversations, [id]: { messages: s.messages, status } }
          : s.conversations,
      };
    });
  },
};

// Hydrate conversations map on first import
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('chat-store');
    if (raw) {
      const data = JSON.parse(raw) as Pick<ChatState, 'conversations'>;
      state = { ...state, conversations: data.conversations || {} };
    }
  } catch {
    // ignore
  }
}

