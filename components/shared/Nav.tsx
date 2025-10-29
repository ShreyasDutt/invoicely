import React from 'react'
import { Button } from '../ui/button'
import { ModeToggle } from './ThemeSwitch'

const Nav = () => {
  return (
    <div className='flex items-center justify-between max-w-5xl mx-auto px-4 py-4'>
        <div>
            <p className='font-mono text-2xl'>Invoicely</p>
        </div>
        <div>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Nav