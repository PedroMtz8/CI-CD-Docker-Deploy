import { Button } from '@/components/ui/button';
import { useRegisterModal } from '@/hooks/useRegisterModal';

export default function RegisterButton() {


  const registerModal = useRegisterModal();

  return (
      <Button className='w-[115px]' variant="outline" onClick={registerModal.onOpen}>Registrarse</Button>
  );
};

