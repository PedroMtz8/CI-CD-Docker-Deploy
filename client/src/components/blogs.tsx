import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogCard, { Author } from './blog-card';
import { useLocation } from 'react-router-dom';

interface Blog {
  title: string;
  content: string;
  author: Author
  id: string;
}

export default function Blogs(){

  const [blogs, setBlogs] = useState<Blog[]>([])

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');

  useEffect(() => {

    async function getBlogs(){

      const search = searchQuery ? `?search=${searchQuery}` : '';

      try {
        const response = await axios.get(`/blogs${search}`);

        const blogs = response.data.blogs;

        setBlogs(blogs);
      } catch (error) {
        
      }
    }
    getBlogs();
    
  }, [searchQuery])

  return (
    <main className='flex flex-col px-[25px] sm:px-[40px] md:px-[80px] lg:px-[100px] '>
      <h1 className="text-start text-3xl font-bold my-8">Blogs</h1>
      <section id="blogs" className="grid gap-4 ">
        {(blogs.length < 0 && !searchQuery) ? 
        <p>No existe ningun blog</p>
        :

        blogs.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} content={blog.content} author={blog.author} />
        ))
        }
        {
          blogs.length === 0 && searchQuery && <p>No se encontraron blogs con el criterio de busqueda </p>
        }
      </section>
    </main>
  )
}