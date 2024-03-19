import { checkAuth } from "@/app/actions";
import { App } from "./App";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await checkAuth(async (auth) => {
    if (auth) {
      return auth;
    }
    redirect("/signin");
  });

  return <App user={user}>{children}</App>;
}
