import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import logo from '@/assets/images/logo.svg'
import { useAuthContext } from '@/contexts/auth'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button'
import { Card, CardContent } from './card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'

const Header = () => {
  const { user, signOut } = useAuthContext()
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-4">
        <div>
          <img src={logo} alt="FinTrack" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />

                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <p className="text-sm">
                  {user.firstName} {user.lastName}
                </p>

                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={signOut}>
                <LogOutIcon />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
