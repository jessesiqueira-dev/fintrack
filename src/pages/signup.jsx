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

  const handleSignup = (data) => {
    console.log(data)

    const signupData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }

    console.log(signupData)
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
