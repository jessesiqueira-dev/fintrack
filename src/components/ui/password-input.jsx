import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './button'
import { Input } from './input'

const PasswordInput = ({ placeholder = 'Digite sua senha ' }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input
        className="pr-10"
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  )
}
export default PasswordInput
