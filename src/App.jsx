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

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRouter isAllowed={false} redirect={"/login"} />,
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
      element: <ProtectedRouter />,
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
