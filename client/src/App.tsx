import Navbar from './components/navbar';
import GlobalModals from './providers/ModalsProvider';

export default function App() {

  return (
    <>
      <GlobalModals />
      <Navbar />
      <h1 className='text-blue-500' >Hello world</h1>
    </>
  )
}
