'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ChatMessage = {
  id: string;
  role: string;
  text: string;
  ts: number;
};

export type ChatStatus = 'idle' | 'sending' | 'error';

interface ConversationsMap {
  [id: string]: ChatMessage[];
}

interface ChatStoreState {
  conversationId: string | null;
  messages: ChatMessage[];
  status: ChatStatus;
  start: (id?: string) => void;
  append: (msg: ChatMessage | ChatMessage[]) => void;
  hydrate: (id?: string) => void;
  clear: (id?: string) => void;
  _conversations: ConversationsMap; // persisted map
}

function setCidCookie(cid: string | null) {
  if (typeof document === 'undefined') return;
  if (cid) {
    document.cookie = `cid=${cid}; path=/`;
  } else {
    document.cookie = 'cid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const useChatStore = create<ChatStoreState>()(
  persist(
    (set, get) => ({
      conversationId: null,
      messages: [],
      status: 'idle',
      _conversations: {},
      start: (id?: string) => {
        const cid = id ?? crypto.randomUUID();
        setCidCookie(cid);
        const stored = get()._conversations[cid] ?? [];
        set({ conversationId: cid, messages: stored, status: 'idle' });
      },
      append: (msg: ChatMessage | ChatMessage[]) => {
        const { conversationId, messages, _conversations } = get();
        if (!conversationId) return;
        const newMsgs = Array.isArray(msg) ? [...messages, ...msg] : [...messages, msg];
        set({
          messages: newMsgs,
          _conversations: { ..._conversations, [conversationId]: newMsgs },
        });
      },
      hydrate: (id?: string) => {
        const cid = id ?? get().conversationId;
        if (!cid) return;
        const msgs = get()._conversations[cid] ?? [];
        setCidCookie(cid);
        set({ conversationId: cid, messages: msgs, status: 'idle' });
      },
      clear: (id?: string) => {
        const cid = id ?? get().conversationId;
        if (!cid) return;
        const conv = { ...get()._conversations };
        delete conv[cid];
        setCidCookie(null);
        set({ conversationId: null, messages: [], status: 'idle', _conversations: conv });
      },
    }),
    {
      name: 'chat-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversationId: state.conversationId,
        messages: state.messages,
        status: state.status,
        _conversations: state._conversations,
      }),
    }
  )
);

export default useChatStore;
