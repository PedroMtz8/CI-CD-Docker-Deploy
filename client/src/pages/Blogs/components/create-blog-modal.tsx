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
import { Textarea } from '@/components/ui/textarea';
import { useCreateBlogModal } from '@/hooks/useCreateBlogModal';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/auth/auth';

const formSchema = z.object({
  title: z.string().min(5, 'Se requieren al menos 5 caracteres'),
  content: z.string().min(10, 'Se requieren al menos 10 caracteres'),
});

export default function CreateBlogModal() {
  const { isOpen, onClose } = useCreateBlogModal();
  const [ isLoading, setIsLoading ] = useState(false);

  const navigate = useNavigate();

  const { token } = useAuthStore();


  const notify = (errorMessage: string, type: 'error' | 'success') => toast(errorMessage, {
    type,
    position: 'top-center',
    autoClose: 3000,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
    shouldUnregister: true,
  });

  const onSubmit = async (values: z.infer<typeof formSchema> ) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/blogs", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  

      navigate(`/${response.data.id}`);

      notify('Blog creado correctamente', 'success');
      onClose();
    } catch (error: any) {
      const message = error.response.data.message;
      
      notify(message[0] || 'Algo salió mal', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Crear blog"
      description="Crea un blog para compartir tus ideas con el mundo."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Titulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenido</FormLabel>
                    <FormControl>
                      <Textarea className=' max-h-[200px] lg:max-h-[500px]' disabled={isLoading} placeholder="Escribe la descripción de tu blog.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" type='button' onClick={onClose}>
                  Cancelar
                </Button>
                <Button disabled={isLoading} type="submit">
                  Crear blog {isLoading && <Loader2 className="ml-2 animate-spin duration-1000" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}