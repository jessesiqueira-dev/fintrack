import { Navigate } from 'react-router'

import Header from '@/components/header'
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
      <div className="flex items-center justify-between">
        <h2>Dashboard</h2>
        <div>|{/*SELETOR DATA E BOTAO DE NOVA TRANSAÇÃO*/}</div>
      </div>
    </>
  )
}

export default HomePage
