import {
  ExternalLinkIcon,
  Loader2Icon,
  PiggyBankIcon,
  Trash2Icon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import { useDeleteTransaction } from '@/api/hooks/transaction'
import { useEditTransactionForm } from '@/forms/hooks/transaction'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)
  const { mutateAsync: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction(transaction.id)
  const { form, onSubmit } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      setSheetIsOpen(false)
      toast.success('Transação editada com sucesso!')
    },
    onError: () => {
      toast.error(
        'Ocorreu um erro ao editar a transação. Por favor, tente novamente.'
      )
    },
  })

  const handleDelete = async () => {
    try {
      await deleteTransaction()
      setDeleteDialogIsOpen(false)
      setSheetIsOpen(false)
      toast.success('Transação excluída com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error(
        'Ocorreu um erro ao excluir a transação. Por favor, tente novamente.'
      )
    }
  }

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full min-w-0 overflow-y-auto sm:min-w-[450px] sm:max-w-[520px]">
        <SheetTitle>Editar Transação</SheetTitle>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o nome da transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field: { ref, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel htmlFor="edit-transaction-amount">Valor</FormLabel>
                  <NumericFormat
                    {...field}
                    id="edit-transaction-amount"
                    getInputRef={ref}
                    placeholder="Digite o valor da transação"
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) => {
                      onChange(values.floatValue)
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      placeholder="Selecione a data da transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                      <Button
                        type="button"
                        variant={
                          field.value === 'EARNING' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EARNING')}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        Ganho
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === 'EXPENSE' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EXPENSE')}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="gap-2 sm:space-x-2">
              <AlertDialog
                open={deleteDialogIsOpen}
                onOpenChange={setDeleteDialogIsOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full"
                    disabled={form.formState.isSubmitting || isDeleting}
                  >
                    <Trash2Icon />
                    Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
                    <AlertDialogDescription>
                      A transação <strong>{transaction.name}</strong> será
                      excluída permanentemente. Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      disabled={isDeleting}
                      onClick={(event) => {
                        event.preventDefault()
                        handleDelete()
                      }}
                    >
                      {isDeleting && <Loader2Icon className="animate-spin" />}
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <SheetClose asChild>
                <Button
                  type="reset"
                  variant="secondary"
                  className="w-full"
                  disabled={form.formState.isSubmitting || isDeleting}
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting || isDeleting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
