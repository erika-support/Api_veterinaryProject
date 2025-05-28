import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;

    return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
  } catch (error) {
    console.error("Token inválido:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
