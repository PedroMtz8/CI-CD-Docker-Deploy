import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Blog } from '../Blogs';
import useAuthStore from '@/auth/auth';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';

export default function BlogDetail() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { user, token } = useAuthStore();
  const { id } = useParams();
  const { setValue } = useForm();

  useEffect(() => {
    async function getBlog() {
      try {
        const response = await axios.get(`/blogs/${id}`);
        if (response.data.blog) {
          window.document.title = response.data.blog.title;
          setBlog(response.data.blog);
        }
      } catch (error: any) {
        window.document.title = 'Blog no encontrado';
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getBlog();
  }, [id]);

  const handleEdit = () => {
    // Inicializa los valores del formulario con los datos actuales del blog
    setValue('title', blog?.title);
    setValue('content', blog?.content);

    setIsEditing(true);
  };

  const handleSave = async (data: any) => {
    try {
      await axios.put(`/blogs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });

      setBlog((prevBlog) => ({
        ...prevBlog!,
        title: data.title,
        content: data.content,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!blog) {
    return (
      <div className='max-w-2xl mx-auto mt-8 p-4 rounded-md grid gap-3'>
        <p>No se encontró el blog</p>

        <div>
          <Button variant='secondary' onClick={() => {
            navigate('/');
          }}>Ir a blogs</Button>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 rounded-md">
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? 
          <EditBlogForm
          initialValues={{ title: blog.title, content: blog.content }}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        : (
          // Muestra el título y el botón de edición
          <>
            {blog.title}
            {user.id === blog.author.id && (
              <Button
                variant="secondary"
                className="ml-2"
                onClick={handleEdit}
              >
                <Edit />
              </Button>
            )}
          </>
        )}
      </h1>
      {
        !isEditing && 
        <>
          <p className="text-sm text-gray-500 mb-2">Autor: {blog.author.username}</p>
          <p className="text-gray-700">{blog.content}</p>
        </>
      }
    </div>
  );
}

interface EditBlogFormProps {
  initialValues: { title: string; content: string };
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

function EditBlogForm({ initialValues, onSave, onCancel }: EditBlogFormProps) {
  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <input
        type="text"
        {...register('title', { required: true })}
        className="text-3xl font-bold mb-4 focus:outline-none border-b-2 "
      />
      <textarea
        {...register('content', { required: true })}
        className="text-gray-700 mb-4 h-40 w-full focus:outline-none "
      />
      <div className='flex gap-2'>

        <Button type="submit" className="mr-2">
          <Save /> Guardar
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}