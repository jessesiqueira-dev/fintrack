import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useGetUserBalance } from '@/api/hooks/user'
import { formatCurrency } from '@/helpers/currency'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const chartItems = [
  {
    key: 'earnings',
    label: 'Ganhos',
    color: 'hsl(var(--primary-green))',
    icon: TrendingUpIcon,
  },
  {
    key: 'expenses',
    label: 'Gastos',
    color: 'hsl(var(--primary-red))',
    icon: TrendingDownIcon,
  },
  {
    key: 'investments',
    label: 'Investimentos',
    color: 'hsl(var(--primary-blue))',
    icon: PiggyBankIcon,
  },
]

const FinancialSummaryChart = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data, isPending, isError } = useGetUserBalance({ from, to })

  const chartData = chartItems.map((item) => ({
    ...item,
    value: Math.abs(Number(data?.[item.key]) || 0),
  }))
  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="flex min-h-[280px] flex-col">
      <CardHeader>
        <CardTitle className="text-base">Resumo do período</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        {isPending && (
          <p className="text-sm text-muted-foreground">Carregando resumo...</p>
        )}

        {isError && (
          <p className="text-sm text-primary-red">
            Não foi possível carregar o resumo.
          </p>
        )}

        {!isPending && !isError && total === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma movimentação neste período.
          </p>
        )}

        {!isPending && !isError && total > 0 && (
          <div className="flex w-full items-center gap-4">
            <div className="h-[190px] min-w-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart accessibilityLayer>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={3}
                  >
                    {chartData.map((item) => (
                      <Cell key={item.key} fill={item.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {chartData.map((item) => {
                const Icon = item.icon
                const percentage = Math.round((item.value / total) * 100)

                return (
                  <div key={item.key} className="flex items-center gap-2">
                    <Icon size={16} style={{ color: item.color }} />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold">{percentage}%</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FinancialSummaryChart
