import { Button } from '../ui/button'
import { CircleArrowOutUpRight } from 'lucide-react'
import { Highlighter } from '../ui/highlighter'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="w-full bg-white dark:bg-black py-40 relative overflow-hidden border-2 border-dashed">
     <div
      className="absolute inset-0 hidden dark:block"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
      <div
    className="absolute inset-0 z-0 dark:hidden block"
    style={{
      backgroundImage: `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
      
      {/* Content */}
      <div className="relative z-10 px-4 py-6">
        <p className="text-3xl md:text-5xl md:w-xl lg:text-6xl lg:w-2xl">
          <Highlighter action="highlight" color="#87CEFA">
          Professional
        </Highlighter>{" "} invoices, made <Highlighter action="underline" color="#87CEFA">
          effortless.
        </Highlighter>{" "}
        </p>
        <Link href={'/create'}>
        <Button className='mt-8'>Create your first Invoice<CircleArrowOutUpRight /></Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero

