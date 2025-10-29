import { SignedIn, SignedOut, SignUpButton, UserButton } from '@clerk/nextjs'
import { ModeToggle } from './ThemeSwitch'
import { Button } from '../ui/button'


const Nav = () => {
  return (
    <div className='flex items-center justify-between border-2 border-b-0 border-dashed p-2'>
        <div>
            <p className='font-mono text-xl'>Invox</p>
        </div>
        <div className='flex items-center gap-2'>
          <SignedOut>
            <SignUpButton>
            <Button variant={"outline"} className='h-8'>Login</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Nav