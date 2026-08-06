import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'O e-mail é obrigatório.',
    })
    .email({
      message: 'O e-mail é inválido.',
    }),

  password: z
    .string()
    .min(1, {
      message: 'A senha é obrigatória.',
    })
    .min(6, {
      message: 'A senha deve ter no mínimo 6 caracteres.',
    }),
})

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 px-4">
      <Form {...form}>
        <form
          className="w-full max-w-[500px]"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Faça login</CardTitle>

              <CardDescription>
                Entre com a sua conta inserindo seus dados abaixo.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>

                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Entrando...' : 'Fazer login'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        <p className="text-center text-sm opacity-50">
          Ainda não possui uma conta?
        </p>

        <Button variant="link" asChild>
          <Link to="/signup">Crie agora</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
