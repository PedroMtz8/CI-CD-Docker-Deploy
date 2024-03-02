import useAuthStore from '@/auth/auth';
import { Button } from '@/components/ui/button';
import { useCreateBlogModal } from '@/hooks/useCreateBlogModal';
import { useLoginModal } from '@/hooks/useLoginModal';
import { Plus } from 'lucide-react';

export default function CreateBlogButton() {


  const createBlogModal = useCreateBlogModal();
  const loginModal = useLoginModal();

  const { isAuthenticated } = useAuthStore();

  return (
      <Button 
        variant="secondary"
        className='mr-4' 
        onClick={() => {
        if (!isAuthenticated) return loginModal.onOpen();
          createBlogModal.onOpen();
        }}
      >
        <Plus />
      </Button>
  );
};
