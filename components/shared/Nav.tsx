import { ModeToggle } from './ThemeSwitch'

const Nav = () => {
  return (
    <div className='flex items-center justify-between border-2 border-dashed p-2'>
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