import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../../redux/slices/userReducer";

export default function ProtectedRouter({
  children,
  redirect = "/",
  acceptedRoles = {},
}) {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  console.log(userInfo);

  if (!acceptedRoles[userInfo.role]) {
    return <Navigate to={redirect} replace />;
  }

  return children || <Outlet />;
}
