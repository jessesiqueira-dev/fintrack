import { FileQuestionIcon, HomeIcon } from 'lucide-react'
import { Link } from 'react-router'

import logo from '@/assets/images/logo.svg'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="items-center gap-4">
          <img src={logo} alt="FinTrack" className="max-w-[160px]" />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <FileQuestionIcon className="text-muted-foreground" size={32} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary-green">Erro 404</p>
            <CardTitle className="text-2xl">Página não encontrada</CardTitle>
            <CardDescription>
              O endereço acessado não existe ou pode ter sido alterado.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">
              <HomeIcon />
              Voltar ao início
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default NotFoundPage
