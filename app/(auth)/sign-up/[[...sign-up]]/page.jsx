import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="flex justify-center items-center min-h-screen">
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
  )
}
