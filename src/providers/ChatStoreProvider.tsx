'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import useChatStore from 'chat-store';

export function ChatStoreProvider({ children }: { children: ReactNode }) {
  const hydrate = useChatStore((s) => s.hydrate);
  const router = useRouter();

  useEffect(() => {
    let cid: string | undefined = router.query.cid as string | undefined;
    if (!cid && typeof document !== 'undefined') {
      const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith('cid='));
      if (match) {
        cid = match.split('=')[1];
      }
    }
    hydrate(cid);
  }, [router.query.cid, hydrate]);

  return <>{children}</>;
}

export default ChatStoreProvider;
