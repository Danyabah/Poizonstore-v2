import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRouter from "./components/hoc/ProtectedRouter";
import HomePage from "./components/pages/HomePage";
import UserLoginPage from "./components/pages/UserLoginPage";
import WorkerLoginPage from "./components/pages/WorkerLoginPage";
import CalulatePage from "./components/pages/CalulatePage";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/Layout";
import UserPage from "./components/pages/UserPage";

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRouter
          redirect={"/login"}
          acceptedRoles={{
            admin: true,
            productmanager: true,
            ordermanager: true,
          }}
        />
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "*",
          element: <Navigate to={"/"} />,
        },
      ],
    },
    {
      element: (
        <ProtectedRouter
          redirect={"/login"}
          acceptedRoles={{
            admin: true,
            productmanager: true,
            ordermanager: true,
            client: true,
          }}
        />
      ),
      children: [
        {
          path: "/user",
          element: <UserPage />,
        },
        {
          path: "*",
          element: <Navigate to={"/"} />,
        },
      ],
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/login/user",
          element: <UserLoginPage />,
        },
        {
          path: "/login/worker",
          element: <WorkerLoginPage />,
        },
        {
          path: "/login/calculate",
          element: <CalulatePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
