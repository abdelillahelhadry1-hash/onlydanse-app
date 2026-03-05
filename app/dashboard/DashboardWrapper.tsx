import DashboardClient from "./DashboardClient";

export default function DashboardWrapper({
  user,
  roles,
}: {
  user: any;
  roles: string[];
}) {
  return <DashboardClient user={user} roles={roles} />;
}
