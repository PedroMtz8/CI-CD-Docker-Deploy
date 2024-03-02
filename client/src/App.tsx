import { Route, Routes } from 'react-router-dom';
import Blogs from './pages/Blogs/Blogs';
import Navbar from './components/navbar';
import GlobalModals from './providers/ModalsProvider';
import BlogDetail from './pages/Blogs/[id]/BlogDetail';

export default function App() {

  return (
    <>
      <GlobalModals />
      <Navbar />

      <Routes>
        <Route path='/' element={ <Blogs /> } />
        <Route path='/:id' element={ <BlogDetail /> } />
        {/* BlogDetail */}
      </Routes>

    </>
  )
}
