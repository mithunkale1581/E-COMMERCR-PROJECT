import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice";
import AdminOrderSlice from "./admin/order-slice";
import ShopProductsSlice from "./shop/products-slice";
import ShopCartSlice from "./shop/cart-slice";
import ShopAddressSlice from "./shop/address-slice";
import ShopOrderSlice from "./shop/order-slice";
import ShopSearchSlice from "./shop/search-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminOrder: AdminOrderSlice,
    shopProducts: ShopProductsSlice,
    shopCart: ShopCartSlice,
    shopAddress: ShopAddressSlice,
    shopOrder: ShopOrderSlice,
    shopSearch: ShopSearchSlice,
  },
});

export default store;
