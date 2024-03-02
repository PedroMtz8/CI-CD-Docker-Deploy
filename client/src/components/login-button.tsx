import { Button } from '@/components/ui/button';
import { useLoginModal } from '@/hooks/useLoginModal';

export default function LoginButton() {


  const loginStore = useLoginModal();

  return (
      <Button onClick={loginStore.onOpen}>Iniciar sesión</Button>
  );
};
