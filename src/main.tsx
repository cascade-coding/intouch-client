import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Auth from "./routes/auth/auth";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "./components/ui/toaster";
import ReSendActivationEmail from "./routes/auth/resend-activation-email";
import PasswordReset from "./routes/auth/password-reset";
import PasswordResetConfirm from "./routes/auth/password-reset-confirm";
import Activate from "./routes/auth/activate";
import AuthLayout from "./routes/auth/auth-layout";
import Home from "./routes/home";
import Follow from "./routes/users/follow";
import Profile from "./routes/users/profile";
import Root from "./routes/root";
import { store } from "./app/store";
import { Provider } from "react-redux";
import EditProfile from "./routes/users/edit-profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users/follow",
        element: <Follow />,
      },
      {
        path: "users/profile/:username",
        element: <Profile />,
      },
      {
        path: "users/edit_profile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: "resend_activation_email",
        element: <ReSendActivationEmail />,
      },
      {
        path: "password_resets",
        element: <PasswordReset />,
      },
      {
        path: "password_reset_confirm/:uid/:token",
        element: <PasswordResetConfirm />,
      },
      {
        path: "activate/:uid/:token",
        element: <Activate />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
