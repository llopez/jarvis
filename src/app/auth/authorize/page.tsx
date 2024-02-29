import { checkAuth } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Authorize() {
  await checkAuth(async (auth) => {
    if (auth) {
      return auth;
    }
    redirect("/auth");
  });

  return <h1>Authorize Google</h1>;
};
