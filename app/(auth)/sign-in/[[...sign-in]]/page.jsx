import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div>
        <Image src={'/login.jpg'} alt='login' width={1920} height={1080} className='w-full object-contain'/>
      </div>

      <div className='flex justify-center items-center h-screen' >
        <SignIn />
      </div>
    </div>
  )
}