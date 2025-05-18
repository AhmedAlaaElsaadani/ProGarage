import React, { createContext, useContext, useEffect, useState } from "react";
import ApiManager from "../Utilies/ApiManager";
import Swal from "sweetalert2";
import { authContext } from "./authContext";
export const basketContext = createContext();

export default function BasketProvider({ children }) {
  const [basketId, setBasketId] = useState(localStorage.getItem("basketId"));
  const { token } = useContext(authContext);
  const [basket, setBasket] = useState(null);
  const [coupon, setCoupon] = useState(null);

  const OpenBasket = async () => {
    try {
      const { data } = await ApiManager.openBasket();
      setBasketId(data.id);
      setBasket(data);
      localStorage.setItem("basketId", data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const getBasket = async () => {
    try {
      const { data } = await ApiManager.getBasketData(basketId, token);
      if (data.code === 200) {
        setBasket(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBasket = async (basket) => {
    try {
      const { data } = await ApiManager.updateBasket(basketId, basket);
      if (data.code === 200) {
        setBasket(data.data);
      }
      return data.code === 200;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  const deleteBasket = async () => {
    try {
      const { data } = await ApiManager.deleteBasket(basketId);
      if (data.code === 200) {
        setBasket(null);
        setBasketId(null);
        localStorage.removeItem("basketId");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBasketItem = async (item) => {
    try {
      let basketCopyItems = [...basket.items];
      let itemIndex = basketCopyItems.findIndex(
        (basketItem) => basketItem.id === item.id
      );
      if (itemIndex === -1) {
        basketCopyItems.push(item);
        let basketCopy = { ...basket, items: basketCopyItems };
        let successFlag = await updateBasket(basketCopy);
        if (successFlag) {
          Swal.fire({
            title: "Added To Basket",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Something went wrong, please try again later",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {

        Swal.fire({
          title: "already In Basket",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeBasketItem = async (id) => {
    let basketCopyItems = [...basket.items];
    let itemIndex = basketCopyItems.findIndex(
      (basketItem) => basketItem.id === id
    );

    if (itemIndex !== -1) {
      if (basketCopyItems[itemIndex].quantity === 1) {
        basketCopyItems.splice(itemIndex, 1);
      } else {
        basketCopyItems[itemIndex].quantity -= 1;
      }
      let basketCopy = { ...basket, items: basketCopyItems };

      await updateBasket(basketCopy);
    }
  };

  const containInBasket = (id) => {

    return basket?.items?.some((item) => item.id === id) || false;
  };

  const clearBasket = async () => {
    let basketCopy = { ...basket, items: [] };
    await updateBasket(basketCopy);
  };

  const applyCoupon = async (coupon) => {
    try {
      const { data } = await ApiManager.addCoupon(basket.id, coupon);

      if (data.code == 200) {
        setBasket(data.data);
        Swal.fire("Applied!", "Coupon has been applied.", "success");
      } else if (data.code === 400) {
        Swal.fire("Error", "Coupon is Expired", "error");
      }
      if (data.code === 404)
        Swal.fire("Error", "Coupon is not valid", "error");
    } catch (error) {
      const errorCode = error.response.data.code;
      if (errorCode === 400) {
        Swal.fire("Error", "Coupon is Expired", "error");
      } else if (errorCode === 404)
        Swal.fire("Error", "Coupon is not valid", "error");
      else
        Swal.fire(
          "Error",
          "Something went wrong, please try again later",
          "error"
        );
    }
  };
  useEffect(() => {
    if (!basketId) OpenBasket();
    else getBasket();
  }, []);
  useEffect(() => {
    setCoupon(basket?.coupon?.code);
  }, [basket]);

  return (
    <basketContext.Provider
      value={{
        basket,
        removeBasketItem,
        clearBasket,
        getBasket,
        addBasketItem,
        containInBasket,
        applyCoupon,
        setCoupon,
        coupon,
      }}
    >
      {children}
    </basketContext.Provider>
  );
}
