import Hero from '@/components/shared/Hero'
import Nav from '@/components/shared/Nav'

const page = () => {
  return (
    <div className='max-w-5xl mx-auto'>
      <Nav/>
      <div>
        <Hero/>
      </div>
    </div>
  )
}

export default page