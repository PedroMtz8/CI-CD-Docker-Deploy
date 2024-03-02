import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLoginModal } from '@/hooks/useLoginModal';
import useAuthStore from '@/auth/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const formSchema = z.object({
  username: z.string().min(5, 'Se requieren al menos 5 caracteres'),
  password: z.string().min(8, 'Se requieren al menos 8 caracteres'),
});

export default function LoginModal() {
  const { isOpen, onClose } = useLoginModal();
  const [ isLoading, setIsLoading ] = useState(false);

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const notify = (errorMessage: string) => toast.error(errorMessage, {
    position: 'top-center',
    autoClose: 3000,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    shouldUnregister: true,
  });

  const onSubmit = async (values: z.infer<typeof formSchema> ) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/auth/sign-in", values);
  
      setAuthenticated(true, response.data.accessToken, {
        username: response.data.username,
        email: response.data.email,
        id: response.data.id,
      });

      onClose();
    } catch (error: any) {
      const message = error.response.data.message;

      const possibleErros: { [key: string]: string } = {
        'User not found': 'Usuario no encontrado',
        'Invalid credentials': 'Credenciales incorrectas',
      }

      const possibleErrosArray = ['User not found', 'Invalid credentials', 'Something went wrong'];

      if(possibleErrosArray.includes(message.toLowerCase())) {
        notify(possibleErros[message]);
      }
      else {
        notify('Algo salió mal');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Iniciar sesión"
      description="Ingresa tus credenciales para iniciar sesión en tu cuenta."
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
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={onClose}>
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