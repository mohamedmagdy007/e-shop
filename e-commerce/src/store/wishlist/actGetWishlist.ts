import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product";
import { RootState } from "@store/index";
type TDataType = "productsFullInfo" | "ProductIds";
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `http://localhost:5005/wishlist?userId=${auth.user?.id}`
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "ProductIds") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, dataType: "productsIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "ProductsFullInfo" };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetWishlist;
