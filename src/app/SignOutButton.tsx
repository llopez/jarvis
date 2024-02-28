"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeSession } from "./actions";

export const SignOutButton = () => {
  return (
    <button
      onClick={() => {
        removeSession();
      }}
      className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2"
    >
      <span>Sign Out</span>
      <XMarkIcon className="h-4" />
    </button>
  );
};
