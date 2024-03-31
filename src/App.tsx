import { AxiosError, AxiosResponse } from "axios";
import "./App.css";
import Chat_landing from "./Pages/chat_landing";
import Landing from "./Pages/landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login_Page from "./Pages/login";
import Signup_Page from "./Pages/signup";

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
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
