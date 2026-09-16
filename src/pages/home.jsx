import { Navigate } from 'react-router'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import DateSelection from '@/components/date-selection'
import FinancialSummaryChart from '@/components/financial-summary-chart'
import Header from '@/components/header'
import TransactionsTable from '@/components/transactions-table'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Header />
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* PARTE DO TOPO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <DateSelection />
            <AddTransactionButton />
            {/* SELETOR DATA E BOTAO DE NOVA TRANSACAO */}
          </div>
        </div>

        {/* GRAFICOS ETC */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
          <Balance />
          <FinancialSummaryChart />
        </div>
        <TransactionsTable />
      </div>
    </>
  )
}

export default HomePage
