import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouter({
  children,
  isAllowed = true,
  redirect = "/",
}) {
  if (!isAllowed) return <Navigate to={redirect} replace />;

  return children || <Outlet />;
}
