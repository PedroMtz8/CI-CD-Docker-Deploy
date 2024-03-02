import { Button } from '@/components/ui/button';
import { useRegisterModal } from '@/hooks/useRegisterModal';

export default function RegisterButton() {


  const registerModal = useRegisterModal();

  return (
      <Button variant="outline" onClick={registerModal.onOpen}>Registrarse</Button>
  );
};

