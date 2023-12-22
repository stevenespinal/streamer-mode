import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarStore {
  variant: ChatVariant;
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  variant: ChatVariant.CHAT,
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));
