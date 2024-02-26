"use client";

import { register } from "./actions";
import { useRef } from "react";
import { Button } from "./Button";
import { useFormState } from "react-dom";

const Alert = (props: { message: string }) => (
  <div className="p-2 rounded-md text-red-500 bg-red-200 flex items-center gap-3">
    <div className="ms-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    </div>

    <div>
      <div className="text-red-800 text-md font-semibold">Error</div>
      <div className="text-xs">{props.message}</div>
    </div>
  </div>
);

export const Form = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(
    async (prevState: any, data: FormData) => {
      const result = await register(prevState, data);

      if (!result) {
        ref.current?.reset();
      }

      return result;
    },
    { error: "" }
  );

  return (
    <form className="space-y-6" action={action} ref={ref}>
      {state?.error ? <Alert message={state.error} /> : ""}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password-confirmation"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password Confirmation
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password-confirmation"
            name="password-confirmation"
            type="password"
            autoComplete="off"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>

      <div>
        <Button />
      </div>
    </form>
  );
};
