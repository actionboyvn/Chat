import { Routes, Route } from "react-router-dom";
import {useState} from "react"
import ChatInterface from "./pages/ChatInterface"
import Image from "./pages/Image";
import Home from "./pages/Home";
import Login from "./components/Login";
import { Navigate, Outlet } from "react-router-dom";

const LoggedUserRoutes = ({ isLogged }) => {
  return isLogged === null ? (
    <Outlet />
  ) : isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

const GuestRoutes = ({ isLogged }) => {
  return isLogged === null ? (
    <Outlet />
  ) : !isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default function App() {
  const [isLogged, setIsLogged] = useState(false);


  return (
    <div>
      <Routes>
        <Route element={<LoggedUserRoutes isLogged={isLogged}/>}>
          <Route element={<ChatInterface/>} path="/chat"/>
          <Route element={<Image/>} path="/image"/>
          <Route element={<Home/>} path="/"/>
        </Route>

        <Route element={<GuestRoutes isLogin={isLogged} />}>
          <Route element={<Login isLogged={isLogged} setIsLogged={setIsLogged}/> } path="/login"/>
        </Route>
      </Routes>
    </div>
  )
}