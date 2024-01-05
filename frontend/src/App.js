import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from "react"
import ChatInterface from "./pages/ChatInterface"
import Image from "./pages/Image";
import Home from "./pages/Home";
import Login from "./components/Login";
import { Navigate, Outlet } from "react-router-dom";
import io from 'socket.io-client';
import SwipeableRoutes from "./components/SwipeableRoutes"

const LoggedUserRoutes = ({ isLogged }) => {
  return isLogged === null ? (
    <Outlet />
  ) : isLogged ? (
    <SwipeableRoutes>
      <Outlet />
    </SwipeableRoutes>
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
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACK_END_URL, { transports : ['websocket'] });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div>
       <Routes>
        <Route element={<LoggedUserRoutes isLogged={isLogged}/>}>
          <Route element={<ChatInterface socket={socket}/>} path="/chat"/>
          <Route element={<Image socket={socket}/>} path="/image"/>
          <Route element={<Home/>} path="/"/>
        </Route>

        <Route element={<GuestRoutes isLogin={isLogged} />}>
          <Route element={<Login isLogged={isLogged} setIsLogged={setIsLogged}/> } path="/login"/>
        </Route>
      </Routes>
    </div>
  )
}