import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { z } from 'zod';


const formSchema = z.object({
  title: z.string().min(5, 'Se requieren al menos 5 caracteres'),
  content: z.string().min(8, 'Se requieren al menos 8 caracteres'),
});

export default function CreateBlogPage(){

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <div>

      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name="title"
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
                name="content"
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
              
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                {/* <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button> */}
                <Button disabled={isLoading} type="submit">
                  Iniciar sesión {isLoading && <Loader2 className="ml-2 animate-spin duration-1000" />}
                </Button>
              </div>
            </form>
      </Form>

    </div>
  )


}