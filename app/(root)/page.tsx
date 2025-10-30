import { FooterText } from '@/components/shared/Footer'
import Hero from '@/components/shared/Hero'
import Nav from '@/components/shared/Nav'

const page = () => {
  return (
    <div className='max-w-5xl mx-auto'>
      <Nav/>
      <div>
        <Hero/>
      </div>
      <div className='border-2 border-t-0 border-dashed'>
        <FooterText/>
      </div>
    </div>
  )
}

export default page