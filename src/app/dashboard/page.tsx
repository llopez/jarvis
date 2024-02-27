import { getSession } from "../actions";

export default async function Dashboard() {
  const session = getSession();

  return (
    <div>
      <h1>Dashboard</h1>
      { session ? 'Welcome: ' + session.email : 'not signed in' }
    </div>
  );
};
