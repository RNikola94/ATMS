import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./RootLayout"
import ErrorPage from "./pages/error/Error.page"
import SignupPage from "./pages/sign-up/SignUp.page"
import LandingPage from "./pages/landing-page/LandingPage.page"
import { useSelector } from "react-redux"
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.page"
import UserDashboard from "./pages/user-dashboard/UserDashboard.page"
import LoginPage from "./pages/login/Login.page"

function App() {

  const { user } = useSelector((state) => state.auth)


  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: 'register',
      element: <SignupPage />
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'dashboard',
          element: user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard /> 
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
