import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  Loader2Icon,
  RefreshCwIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { formatCurrency } from '@/helpers/currency'

import EditTransactionButton from './edit-transaction-button'
import TransactionTypeBadge from './transaction-type-badge'
import { Button } from './ui/button'
import { DataTable } from './ui/data-table'

const SortableHeader = ({ column, children }) => {
  const sortDirection = column.getIsSorted()
  const SortIcon =
    sortDirection === 'asc'
      ? ArrowUpIcon
      : sortDirection === 'desc'
        ? ArrowDownIcon
        : ArrowUpDownIcon

  return (
    <Button
      type="button"
      variant="ghost"
      className="-ml-4"
      aria-label={`Ordenar por ${children}`}
      onClick={column.getToggleSortingHandler()}
    >
      {children}
      <SortIcon size={16} />
    </Button>
  )
}

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Título</SortableHeader>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <SortableHeader column={column}>Tipo</SortableHeader>
    ),
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <SortableHeader column={column}>Data</SortableHeader>
    ),
    sortingFn: (rowA, rowB) =>
      new Date(rowA.original.date).getTime() -
      new Date(rowB.original.date).getTime(),
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <SortableHeader column={column}>Valor</SortableHeader>
    ),
    sortingFn: (rowA, rowB) =>
      Number(rowA.original.amount) - Number(rowB.original.amount),
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount)
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    enableSorting: false,
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />
    },
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const {
    data: transactions,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useGetTransactions({ from, to })

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Transações</h2>

      {isPending && (
        <div className="flex h-[450px] items-center justify-center rounded-md border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2Icon className="animate-spin" size={18} />
            Carregando transações...
          </div>
        </div>
      )}

      {isError && (
        <div className="flex h-[450px] flex-col items-center justify-center gap-4 rounded-md border">
          <p className="text-sm text-muted-foreground">
            Não foi possível carregar as transações.
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <RefreshCwIcon />
            )}
            Tentar novamente
          </Button>
        </div>
      )}

      {!isPending && !isError && (
        <DataTable
          columns={columns}
          data={transactions ?? []}
          emptyMessage="Nenhuma transação encontrada neste período."
        />
      )}
    </section>
  )
}

export default TransactionsTable
