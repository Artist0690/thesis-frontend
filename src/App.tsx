import "./App.css";
import Chat_landing from "./Pages/chat_landing";
import Landing from "./Pages/landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login_Page from "./Pages/login";
import TestSomething from "./Pages/test";
import Signup_Page from "./Pages/Signup";
import { Toaster } from "sonner";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/chat",
      element: <Chat_landing />,
    },
    {
      path: "/login",
      element: <Login_Page />,
    },
    {
      path: "/signup",
      element: <Signup_Page />,
    },
    {
      path: "/test",
      element: <TestSomething />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster richColors closeButton duration={5000} />
    </div>
  );
}

export default App;
