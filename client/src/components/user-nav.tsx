import useAuthStore from '@/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function UserNav(){
  
  const { clearAuthState } = useAuthStore();

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
            <AvatarImage className='rounded-full ' src="https://i.pinimg.com/1200x/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> 
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        {/* <DropdownMenuLabel>Cerrar sesión</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={clearAuthState}
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}