import { useNavigate } from 'react-router-dom';

export interface Author {
  username: string;
  id: string;
}

interface BlogCardProps {
  title: string;
  author: Author;
  content: string;
  id: string;
}

export default function BlogCard({ title, content, author, id }: BlogCardProps) {
  const navigate = useNavigate();
  function truncateContent(content: string): string {
    return content.length > 70 ? content.substring(0, 70) + '...' : content;
  }

  const truncatedContent = truncateContent(content);

  return (
    <div className="w-full sm:w-2/4 md:w-[500px] h-[155px] rounded overflow-hidden shadow-lg mx-auto my-4">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 cursor-pointer"
        onClick={() => {
          navigate(`/${id}`)
        }}
      >
        {title}
      </div>
      <p className="text-gray-700 text-xs  mb-2 whitespace-pre-line">Creado por {author.username}</p>
      <p className="text-gray-700 whitespace-pre-line">{truncatedContent}</p>
    </div>
  </div>
  );
}
