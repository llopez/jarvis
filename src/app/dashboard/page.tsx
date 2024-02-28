import { redirect } from "next/navigation";
import { checkAuth } from "../actions";

export default async function Dashboard() {
  const user = await checkAuth(async (auth) => {
    if (auth) {
      return auth;
    }
    redirect("/signin");
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? "Welcome: " + user.email : "not signed in"}
    </div>
  );
}
