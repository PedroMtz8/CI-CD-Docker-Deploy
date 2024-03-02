import { Route, Routes } from 'react-router-dom';
import Blogs from './components/blogs';
import Navbar from './components/navbar';
import GlobalModals from './providers/ModalsProvider';

export default function App() {

  return (
    <>
      <GlobalModals />
      <Navbar />

      <Routes>
        <Route path='/' element={ <Blogs /> } />
      </Routes>

    </>
  )
}
