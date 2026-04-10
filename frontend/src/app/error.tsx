'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Something went wrong!</h2>
      <p className="text-gray-400 mb-8 max-w-md">{error.message || 'A critical error occurred in the application.'}</p>
      <button
        onClick={() => reset()}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  )
}
