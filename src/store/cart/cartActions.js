import { showNotification } from "../ui/uiSlice";
import { replaceData } from "./cartSlice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = fetch(
        "https://redux-http-5c017-default-rtdb.firebaseio.com/cartItems.json"
      );
      const data = (await res).json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(replaceData(cartData));
    } catch (error) {
      dispatch(
        showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "warning",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      // send state as sending request
      dispatch(
        showNotification({
          open: true,
          message: "Sending Request",
          type: "warning",
        })
      );
      const res = await fetch(
        "https://redux-http-5c017-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // send state as request is successful
      dispatch(
        showNotification({
          open: true,
          message: "Sent Request To Database Successfully",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "warning",
        })
      );
    }
  };
};
