import "./App.css";
import Login from "./component/pages/Login";
import AuctionRoom from "./component/pages/AuctionRoom";
import Register from "./component/pages/Register";
import ProfilePage from "./component/pages/ProfilePage";
import ProductInfo from "./component/pages/ProductInfo";
import PostAuctionPage from "./component/pages/PostAuction";
import Home from "./component/pages/Home";
import axios from "axios";
import { UserActions } from "./store/UserSlice";
import { getToken } from "./utils/authutils";
import { GetAuctions } from "./store/AuctionSlice";


import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./component/Navbar";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />}></Route>
        <Route path="/userinfo" element={<ProfilePage />}></Route>
        <Route path="/auction/post" element={<PostAuctionPage />}></Route>
        <Route path="/product/:id" element={<ProductInfo />}></Route>
        <Route path="/auction/:id" element={<AuctionRoom />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  const token = getToken();

  useEffect(() => {
    
    if(token){
      const getUser = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://auctionwars.onrender.com/api/auth/",
          config
        );

        dispatch(UserActions.login(response.data));
      };
      getUser();

      dispatch(GetAuctions());
    }
  }, [dispatch]);

  return (
    <div className=" text-white">
      {/* <Home/> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
