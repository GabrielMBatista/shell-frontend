// ───────────────────────────────────────────────
// 🔗 Remotes: Chatbot
// ───────────────────────────────────────────────
declare module 'Chatbot/Chatbot';
declare module 'Chatbot/App';
declare module 'Chatbot/GabsIAWidget';

// ───────────────────────────────────────────────
// 🔗 Remotes: Dashboard
// ───────────────────────────────────────────────
declare module 'Dashboard/Dashboard';
declare module 'Dashboard/App';
declare module 'chat-store' {
  export * from './src/store/chat-store';
  const useChatStore: typeof import('./src/store/chat-store').default;
  export default useChatStore;
}
