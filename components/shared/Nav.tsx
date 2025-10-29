import { ModeToggle } from './ThemeSwitch'

const Nav = () => {
  return (
    <div className='flex items-center justify-between border-2 border-b-0 border-dashed p-2'>
        <div>
            <p className='font-mono text-xl'>Invox</p>
        </div>
        <div>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Nav