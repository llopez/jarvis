'use client';

import { useFormStatus } from "react-dom";

export const Button = () => {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      { pending ? 'Signing Up' : 'Sign Up' }
    </button>
  )
}