import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";

import { fetchData, sendCartData } from "./store/cart/cartActions";
let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
    // const sendRequest = async () => {
    //   // send state as sending request
    //   dispatch(
    //     showNotification({
    //       open: true,
    //       message: "Sending Request",
    //       type: "warning",
    //     })
    //   );
    //   const res = await fetch(
    //     "https://redux-http-5c017-default-rtdb.firebaseio.com/cartItems.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   const data = await res.json();
    //   // send state as request is successful
    //   dispatch(
    //     showNotification({
    //       open: true,
    //       message: "Sent Request To Database Successfully",
    //       type: "success",
    //     })
    //   );
    // };
    // sendRequest().catch((err) => {
    //   dispatch(
    //     showNotification({
    //       open: true,
    //       message: "Sending Request Failed",
    //       type: "warning",
    //     })
    //   );
    // });
  }, [cart, dispatch]);
  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
