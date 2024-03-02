import { create } from 'zustand';

interface CreateBlogModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateBlogModal = create<CreateBlogModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));