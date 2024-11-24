import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='min-h-screen bg-gradient-to-r flex justify-center items-center'>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto p-6">
        <div className="relative flex justify-center items-center bg-white rounded-lg shadow-lg md:order-1">
          <Image 
            src='/login.jpg' 
            alt='Login' 
            width={1920} 
            height={1080} 
            className='w-full h-full object-cover rounded-lg' 
          />
        </div>

        <div className='flex justify-center items-center bg-white rounded-lg shadow-lg p-8 md:p-12'>
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Welcome Back! Please Sign In
            </h2>
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500',
                  formInput: 'border border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  formLabel: 'text-gray-700 text-lg font-semibold',
                  formField: 'mb-4',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
