import Link from "next/link";
import { Form } from "./Form";
import { login } from "./actions";

export const dynamic = "force-dynamic";

export default async function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const carryOnParams = new URLSearchParams(searchParams).toString();

  const loginWithRedirect = async (uri: string) => {
    return async (prevState: any, data: FormData) => {
      "use server";
      return await login(data, uri);
    };
  };

  const action = await loginWithRedirect("/auth?".concat(carryOnParams));

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {Object.keys(searchParams).map((key) => (
            <li key={key}>
              {key}: {searchParams[key]}
            </li>
          ))}
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form action={action} />

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
