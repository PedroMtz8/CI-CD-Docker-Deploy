import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../Blogs';

export default function BlogDetail(){

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function getBlog(){
      try {
        const response = await axios.get(`/blogs/${id}`);

        if(response.data.blog){
          window.document.title = response.data.blog.title;
          setBlog(response.data.blog);
        }

      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getBlog();
  }, [id])

  if(loading){
    return <p>Cargando...</p>
  }

  if(!blog){
    return <p>No se encontro el blog</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4  rounded-md">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-2">Autor: {blog.author.username}</p>
      <p className="text-gray-700">{blog.content}</p>
    </div>
  )

}