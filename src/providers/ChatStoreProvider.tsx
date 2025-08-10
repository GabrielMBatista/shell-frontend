'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useChatStore, chatStoreActions } from 'chat-store';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 30}`;
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function ChatStoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { hydrate } = chatStoreActions;
  const conversationId = useChatStore((s) => s.conversationId);

  useEffect(() => {
    const cid = (router.query.cid as string) || getCookie('cid');
    if (cid) {
      hydrate(cid);
    }
  }, [router.query, hydrate]);

  useEffect(() => {
    if (conversationId) {
      setCookie('cid', conversationId);
    } else {
      deleteCookie('cid');
    }
  }, [conversationId]);

  return <>{children}</>;
}

