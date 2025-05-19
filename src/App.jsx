// بتبدل بين الصفحات 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Swiper

import RoutLayout from "./routes/RoutLayout/RoutLayout";
import About from "./routes/About/About";
import IsMobileProvider from "./Contexts/IsMobileContext";
import AuthProvider from "./Contexts/authContext";
import Contact from "./routes/Contact/Contact";
import RepairRequest from "./routes/RepairRequest/RepairRequest";
import Products from "./routes/Products/Products";
import Home from "./routes/Home/Home";
import HomeContentProvider from "./Contexts/homeContentContext";
import MyOrders from "./routes/MyOrders/MyOrders";
import MyRepairRequests from "./routes/MyRepairRequests/MyRepairRequests";
import OrderDetails from "./routes/OrderDetails/OrderDetails";
import BasketProvider from "./Contexts/basketContext";
import ProductDetails from "./routes/ProductDetails/ProductDetails";
import Cart from "./routes/Cart/Cart";

import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";

import EmailConfirmOtp from "./routes/EmailConfirmOtp/EmailConfirmOtp";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import InverseProtectedRoute from "./Components/InverseProtectedRoute/InverseProtectedRoute";

import ForgetPasswordConfirmOtp from "./routes/ForgetPasswordConfirmOtp/ForgetPasswordConfirmOtp";
import ForgetPasswordEmail from "./routes/ForgetPasswordEmail/ForgetPasswordEmail";
import ForgetPasswordResetPass from "./routes/ForgetPasswordResetPass/ForgetPasswordResetPass";

import Error404 from "./routes/Error404/Error404";
import Profile from "./routes/Profile/Profile";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RoutLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
        {
          path: "/repairRequest",
          element: <RepairRequest />,
        },
        {
          path: "/Products",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/Profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Cart",
          element:
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>,
        },
        {
          path: "/my-orders",
          element: (
            // if user is not logged in, redirect to login page
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/my-orders/:orderId",
          element: (
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/my-Repair-requests",
          element: <MyRepairRequests />,
        },
        //Login and Register
        {
          path: "/login",
          element: (

            <InverseProtectedRoute>
              <Login />
            </InverseProtectedRoute>

          ),
        },
        {
          path: "/register",
          element: (

            <InverseProtectedRoute>
              <Register />
            </InverseProtectedRoute>

          ),
        },
        {
          path: "/forget-password-email",
          element: (

            <InverseProtectedRoute>
              <ForgetPasswordEmail />
            </InverseProtectedRoute>

          ),
        },
        {
          path: "/forget-password-otp",
          element: (

            <InverseProtectedRoute>
              <ForgetPasswordConfirmOtp />
            </InverseProtectedRoute>

          ),
        },
        {
          path: "/forget-password-reset",
          element: (

            <InverseProtectedRoute>
              <ForgetPasswordResetPass />
            </InverseProtectedRoute>

          ),
        },
        {
          path: "/EmailConfirmOtp",
          element: (

            <EmailConfirmOtp />

          ),
        },
      ],
      errorElement: <Error404 />,
    },
  ]);
  return (
    <AuthProvider>
      <IsMobileProvider>
        <HomeContentProvider>
          <BasketProvider>
            <RouterProvider router={router} />
          </BasketProvider>
        </HomeContentProvider>
      </IsMobileProvider>
    </AuthProvider>
  );
}
// SPA

/**
 * *** App Structure ***
 * Contexts
 *      - AuthContext Done ✅
 *      - CartContext Done ✅
 *      - IsMobileContext Done ✅
 *      - HomeContentContext Done ✅
 * Main Component
 *      -Navbar Done ✅
 *      -Footer Done ✅
 *      -WhatsappComponent Done ✅
 *     - ProfileIcon Done ✅
 *     - ScrollToTop Done ✅
 *     - Spinner Done ✅
 *     - ProtectedRoute Done ✅
 *     - InverseProtectedRoute Done ✅
 *     -mobileMenu
 * routes
 *      - Home
 *      - About (protected) Done ✅
 *      - Products (protected) Done ✅
 *               - Filter
 *               - Product Card
 *      - Product Details
 *      - Product Description
 *      - Contact (protected) Done ✅
 *      -Login (protected) Done ✅
 *      -Register (protected) Done ✅
 *      - Forget Password Email (protected) Done ✅
 *                - send Otp
 *                - Verify Otp
 *                - Reset Password
 *      - verify Email (protected) Done ✅
 *      - Error 404
 *      - Profile
 *      - Cart Done ✅
 *      - My Orders Done ✅
 *      - My Orders Details Done ✅
 */
