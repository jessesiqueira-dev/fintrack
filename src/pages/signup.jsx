import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Crie uma nova conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input type="email" placeholder="Digite seu e-mail" />
          <div className="relative">
            <Input
              className="pr-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />
            <Button
              type="button"
              className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
              variant="ghost"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já tem uma conta?</p>

        <Button variant="link" asChild>
          <a href="/login">Faça login</a>
        </Button>
      </div>
    </div>
  )
}

export default SignUpPage
