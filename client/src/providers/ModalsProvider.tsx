import LoginModal from '@/components/modals/login-modal';
import RegisterModal from '@/components/modals/register-modal';
import CreateBlogModal from '@/pages/Blogs/components/create-blog-modal';

export default function GlobalModals(){
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <CreateBlogModal />
    </>
  )
}