import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import useHandleResize from '@/hooks/useHandleResize';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

export default function SearchBlogInput() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const isMobile = useHandleResize({ maxWidth: 768 });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const newUrl = value ? `/?search=${value}` : '/';
    navigate(newUrl, { replace: true });
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleChangeMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  }

  const onSubmit = () => {
    const newUrl = searchTerm ? `/?search=${searchTerm}` : '/';
    navigate(newUrl, { replace: true });
  }

  return (
    <>
      {
        isMobile && <SearchBlogMobile value={searchTerm} onChange={handleChangeMobile} onSubmit={onSubmit} />
      }
      <input
      className=' hidden md:block px-3 py-2 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={handleChange}
      />
    </>
  );
}

function SearchBlogMobile(
  { value, onSubmit, onChange }: 
  { 
    value: string, 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void
  }
  ) {


  return (
    <Dialog>
      <DialogTrigger>
          <Search />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buscar blog</DialogTitle>
        </DialogHeader>
         
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
          type="text"
          placeholder="Buscar..."
          value={value}
          onChange={onChange}
        /> 

      <DialogClose >
        <Button className='w-full' onClick={onSubmit} >Buscar</Button>
      </DialogClose>
      </DialogContent>
    </Dialog>
  )
}