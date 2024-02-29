import { checkAuth } from "@/app/actions";
import { redirect } from "next/navigation";
import { User } from "@/models/User";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Authorize({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const user = await checkAuth(async (auth) => {
    if (auth) {
      return auth;
    }

    const carryOnParams = new URLSearchParams(searchParams).toString();

    redirect("/auth/signin?".concat(carryOnParams));
  });

  const allow = async () => {
    "use server";

    const token = crypto.randomBytes(64).toString("hex");

    if (!user) return;

    await User.updateOne({ _id: user._id }, { token });

    const { redirect_uri, state } = searchParams;

    const queryParams = new URLSearchParams({ state, code: token }).toString();

    redirect(redirect_uri.concat("?").concat(queryParams));
  };

  const deny = async () => {
    "use server";

    if (!user) return;

    await User.updateOne({ _id: user._id }, { token: null });

    revalidatePath("/auth");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Authorize Google
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex gap-2 justify-center">
        <form action={deny}>
          <button
            disabled={!user?.token}
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Revoke
          </button>
        </form>

        <form action={allow}>
          <button
            disabled={!!user?.token}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Grant
          </button>
        </form>
      </div>
    </div>
  );
}
