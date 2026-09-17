'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const DatePickerWithRange = ({
  value,
  onChange,
  className,
  placeholder = 'Selecione uma data',
}) => {
  const [numberOfMonths, setNumberOfMonths] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches
      ? 1
      : 2
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handleChange = (event) => setNumberOfMonths(event.matches ? 1 : 2)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full max-w-full justify-start overflow-hidden text-left text-xs font-normal sm:text-sm',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(value.to, 'LLL dd, y', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(value.from, 'LLL dd, y', {
                  locale: ptBR,
                })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="max-w-[calc(100vw-2rem)] overflow-auto p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
