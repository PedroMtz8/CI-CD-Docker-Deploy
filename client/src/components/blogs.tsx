import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogCard, { Author } from './blog-card';

interface Blog {
  title: string;
  content: string;
  author: Author
  id: string;
}

export default function Blogs(){

  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {

    async function getBlogs(){
      try {
        const response = await axios.get('/blogs');

        const blogs = response.data.blogs;

        setBlogs(blogs);
      } catch (error) {
        
      }
    }
    getBlogs();
    
  }, [])

  return (
    <main className='flex flex-col px-[25px] sm:px-[40px] md:px-[80px] lg:px-[100px] '>
      <h1 className="text-start text-3xl font-bold my-8">Blogs</h1>
      <section id="blogs" className="grid gap-4 ">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} content={blog.content} author={blog.author} />
        ))}
      </section>
    </main>
  )
}