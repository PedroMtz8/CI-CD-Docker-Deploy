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
    <div className="w-full md:w-3/4 lg:w-[600px] h-[235px] sm:h-[130px] md:h-[175px] rounded overflow-hidden shadow-lg mx-auto my-4">
    <div className="h-full px-6 py-4 flex flex-col gap-2 ">
      <div className="font-bold text-xl mb-2 cursor-pointer"
        onClick={() => {
          navigate(`/${id}`)
        }}
      >
        {title}
      </div>
      <p className="text-gray-700 text-xs  mb-2 whitespace-pre-line">Creado por {author.username}</p>
      <p className="text-gray-700 whitespace-pre-line h-full overflow-hidden ">{truncatedContent}</p>
    </div>
  </div>
  );
}
