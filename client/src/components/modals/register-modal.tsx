import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { useLoginModal } from '@/hooks/useLoginModal';

const formSchema = z.object({
  username: z.string().min(5, 'Se requieren al menos 5 caracteres'),
  password: z.string().min(8, 'Se requieren al menos 8 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
});

export default function RegisterModal() {
  const { isOpen, onClose } = useRegisterModal();
  const loginModal = useLoginModal()


  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    shouldUnregister: true,
  });

  const notify = (errorMessage: string, status: 'error' | 'success') => toast[status](errorMessage, {
    position: 'top-center',
    autoClose: status === 'error' ? 3000 : 5000,
  });

  const onSubmit = async (values: z.infer<typeof formSchema> ) => {

    try {
      setIsLoading(true);
      await axios.post("/auth/sign-up", values);
  
      notify('Usuario registrado con éxito', 'success')
      onClose();
      
      setTimeout(() => {
        loginModal.onOpen();
      }, 300);
    } catch (error: any) {

      const possibleErrors: { [key: string]: string } = {
        'username': 'Nombre de usuario ya en uso',
        'email': 'Correo electrónico ya en uso',
      }
      
      const message = error.response.data.message.toLowerCase(); // Convertir a minúsculas
      
      const matchedErrorKey = Object.keys(possibleErrors).find(key =>
        message.includes(key)
      );
      
      if (matchedErrorKey) {
        notify(possibleErrors[matchedErrorKey], 'error');
      } else {
        notify('Algo salió mal', 'error');
      }

    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Modal
      title="Registrarse"
      description="Regístrate para poder publicar blogs"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="password" placeholder="Contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-end w-full">
                <span className="text-sm">¿Ya tienes una cuenta?</span>
                <button
                  className="text-sm text-blue-500 ml-2 cursor-pointer"
                  type='button'
                  onClick={() => {
                    onClose();
                    loginModal.onOpen();
                  }}
                >
                  Iniciar sesión
                </button>
              </div>

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" type='button' onClick={onClose}>
                  Cancelar
                </Button>
                <Button disabled={isLoading} type="submit">
                  Iniciar sesión {isLoading && <Loader2 className="ml-2 animate-spin duration-1000" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}