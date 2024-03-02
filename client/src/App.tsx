import Blogs from './components/blogs';
import Navbar from './components/navbar';
import GlobalModals from './providers/ModalsProvider';

export default function App() {

  return (
    <>
      <GlobalModals />
      <Navbar />
      <Blogs />
    </>
  )
}
