import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Menu } from 'lucide-react'
import LoginButton from './login-button'
import RegisterButton from './register-button'


export default function NavMenu(){
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Menu />
        </MenubarTrigger>
        <MenubarContent className='min-w-[180px]' >
          <MenubarItem>
            Bienvenido
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <RegisterButton />
          </MenubarItem>
          <MenubarItem>
            <LoginButton />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}