import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import RoutLayout from "./routes/RoutLayout/RoutLayout";
import About from "./routes/About/About";
import IsMobileProvider from "./contexts/IsMobileContext";
import AuthProvider from "./contexts/authContext";
import Contact from "./routes/Contact/Contact";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RoutLayout />,
      children: [
        {
          index: true,
          element: <div>Home</div>,
        },
        {
          path: "/home",
          element: <div>Home</div>,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <IsMobileProvider>
        <RouterProvider router={router} />;
      </IsMobileProvider>
    </AuthProvider>
  );
}

/**
 * *** App Structure ***
 * Contexts
 *      - AuthContext Done ✅
 *      - CartContext
 *      - IsMobileContext Done ✅
 * Main Component
 *      -Navbar
 *      -Footer
 *      -Login
 *      -Register
 * routes
 *      - Home
 *      - About
 *      - Services
 *      - Products
 *               - Filter
 *               - Product Card
 *      - Product Details
 *      - Product Description
 *      - Contact
 *      - Forget Password
 *                - send Otp
 *                - Verify Otp
 *                - Reset Password
 *      - verify Email
 *
 *      - Error 404
 *      - Profile
 *      - Cart
 *      - My Orders
 *      - My Orders Details
 */
