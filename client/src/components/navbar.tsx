import { useAuth } from '@/providers/AuthProvider';
import LoginButton from './login-button';
import RegisterButton from '@/components/register-button';
import UserNav from '@/components/user-nav';
import SearchBlogInput from './search-blog';
import CreateBlogButton from '@/pages/Blogs/components/create-blog-button';


export default function Navbar() {
  const { isAuthenticated } = useAuth();


  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 xl:px-[40px] ">
        <div className='flex items-center gap-5'>
          <a href="/" className="text-2xl font-bold">Logo</a>
          {/* here will be the search */}
          <SearchBlogInput />
        </div>

        <div className="ml-auto flex items-center space-x-4 ">
          <CreateBlogButton />

          {
            isAuthenticated ? (
              <UserNav />
            ) : 
            <>
              <RegisterButton />
              <LoginButton />
            </>
          
          }
          
        </div>
      </div>
    </nav>
  );
}