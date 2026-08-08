import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
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
import { Checkbox } from '@/components/ui/checkbox'
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
import api from '@/lib/axios'

const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'O nome é obrigatório.' }),

    lastName: z
      .string()
      .trim()
      .min(1, { message: 'O sobrenome é obrigatório.' }),

    email: z
      .string()
      .trim()
      .min(1, { message: 'O e-mail é obrigatório.' })
      .email({ message: 'Informe um e-mail válido.' }),

    password: z.string().min(6, {
      message: 'A senha deve ter no mínimo 6 caracteres.',
    }),

    confirmPassword: z.string().min(6, {
      message: 'A confirmação deve ter no mínimo 6 caracteres.',
    }),

    terms: z.boolean().refine((value) => value === true, {
      message:
        'Você deve aceitar os termos de uso e a política de privacidade.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

const SignupPage = () => {
  const [user, setUser] = useState(null)

  const signupMutation = useMutation({
    mutationKey: ['signup'],

    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })

      return response.data
    },
  })

  const form = useForm({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })
  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        if (!accessToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.error(error)
      }
    }

    init()
  }, [])

  const handleSignup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken

        setUser(createdUser)

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        toast.success('Conta criada com sucesso!')
      },
      onError: (error) => {
        console.log('STATUS:', error.response?.status)
        console.log('ERRO DA API:', error.response?.data)
      },
    })
  }

  if (user) {
    return (
      <div>
        <h1>Bem-vindo(a), {user.first_name}!</h1>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 px-4 py-8">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>

          <CardDescription>Insira os seus dados abaixo.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignup)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Digite seu nome"
                        autoComplete="given-name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Digite seu sobrenome"
                        autoComplete="family-name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>

                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                      <FormLabel
                        htmlFor="terms"
                        className="cursor-pointer text-xs font-normal leading-relaxed text-muted-foreground"
                      >
                        Ao clicar em “Criar conta”, você aceita{' '}
                        <a
                          href="#"
                          className="text-foreground underline underline-offset-4"
                          onClick={(event) => event.stopPropagation()}
                        >
                          nossos termos de uso e política de privacidade.
                        </a>
                      </FormLabel>
                    </div>

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
                {form.formState.isSubmitting
                  ? 'Criando conta...'
                  : 'Criar conta'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="flex items-center justify-center">
        <p className="text-center text-sm opacity-50">Já possui uma conta?</p>

        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
