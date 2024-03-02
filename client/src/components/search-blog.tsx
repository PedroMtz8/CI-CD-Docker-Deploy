import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';

export default function SearchBlogInput() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const newUrl = value ? `?search=${value}` : '/';
    navigate(newUrl, { replace: true });
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <input
    className=' px-3 py-2 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
}
