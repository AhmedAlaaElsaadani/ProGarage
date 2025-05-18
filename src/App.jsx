import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import RoutLayout from "./routes/RoutLayout/RoutLayout";
import About from "./routes/About/About";
import IsMobileProvider from "./Contexts/IsMobileContext";
import AuthProvider from "./Contexts/authContext";
import Contact from "./routes/Contact/Contact";
import RepairRequest from "./routes/RepairRequest/RepairRequest";
import Products from "./routes/Products/Products";
import Home from "./routes/Home/Home";
import Spinner from "./Components/Ui/Spinner/Spinner";
import HomeContentProvider from "./Contexts/homeContentContext";
import MyOrders from "./routes/MyOrders/MyOrders";
import MyRepairRequests from "./routes/MyRepairRequests/MyRepairRequests";
import OrderDetails from "./routes/OrderDetails/OrderDetails";
import BasketProvider from "./Contexts/basketContext";
import ProductDetails from "./routes/ProductDetails/ProductDetails";
import Cart from "./routes/Cart/Cart";

const Login = lazy(() => import("./routes/Login/Login"));
const Register = lazy(() => import("./routes/Register/Register"));
const EmailConfirmOtp = lazy(() =>
  import("./routes/EmailConfirmOtp/EmailConfirmOtp")
);
const ProtectedRoute = lazy(() =>
  import("./Components/ProtectedRoute/ProtectedRoute")
);
const InverseProtectedRoute = lazy(() =>
  import("./Components/InverseProtectedRoute/InverseProtectedRoute")
);
const ForgetPasswordEmail = lazy(() =>
  import("./routes/ForgetPasswordEmail/ForgetPasswordEmail")
);
const ForgetPasswordConfirmOtp = lazy(() =>
  import("./routes/ForgetPasswordConfirmOtp/ForgetPasswordConfirmOtp")
);
const ForgetPasswordResetPass = lazy(() =>
  import("./routes/ForgetPasswordResetPass/ForgetPasswordResetPass")
);
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
          path: "/Cart",
          element:
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>,
        },
        {
          path: "/my-orders",
          element: (
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
            <Suspense fallback={<Spinner />}>
              <InverseProtectedRoute>
                <Login />
              </InverseProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<Spinner />}>
              <InverseProtectedRoute>
                <Register />
              </InverseProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/forget-password-email",
          element: (
            <Suspense fallback={<Spinner />}>
              <InverseProtectedRoute>
                <ForgetPasswordEmail />
              </InverseProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/forget-password-otp",
          element: (
            <Suspense fallback={<Spinner />}>
              <InverseProtectedRoute>
                <ForgetPasswordConfirmOtp />
              </InverseProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/forget-password-reset",
          element: (
            <Suspense fallback={<Spinner />}>
              <InverseProtectedRoute>
                <ForgetPasswordResetPass />
              </InverseProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/EmailConfirmOtp",
          element: (
            <Suspense fallback={<Spinner />}>
              <EmailConfirmOtp />
            </Suspense>
          ),
        },
      ],
      // errorElement: <Error404 />,
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
 *      - Cart
 *      - My Orders
 *      - My Orders Details
 */
