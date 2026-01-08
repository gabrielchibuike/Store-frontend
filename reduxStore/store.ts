"use client";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  main_category: string;
  product_category: string;
  sub_category: string;
  color: string[];
  size: string[];
  price_max: number;
  manufacturer_brand: string;
  searchQuery: string;
}

const tokenSlice = createSlice({
  name: "Token",
  initialState: { value: { tokenPayload: null } },
  reducers: {
    tokenPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});

const productSlice = createSlice({
  name: "products",
  initialState: { value: { productPayload: [] } },
  reducers: {
    productPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: { value: { addToCartPayload: [] } },
  reducers: {
    cartPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});

const searchDataSlice = createSlice({
  name: "searchData",
  initialState: { value: { searchDataPayload: [] } },
  reducers: {
    searchPayloadData: (state, action) => {
      state.value = action.payload;
    },
  },
});

const initialState: FiltersState = {
  main_category: "",
  product_category: "",
  sub_category: "",
  color: [],
  size: [],
  price_max: 7000,
  manufacturer_brand: "",
  searchQuery: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setMainCategory: (state, action: PayloadAction<string>) => {
      state.main_category = action.payload;
    },
    setProductCategory: (state, action: PayloadAction<string>) => {
      state.product_category = action.payload;
    },
    setSubCategory: (state, action: PayloadAction<string>) => {
      state.sub_category = action.payload;
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      state.color = state.color.includes(color)
        ? state.color.filter((c) => c !== color)
        : [...state.color, color];
    },
    toggleSize: (state, action: PayloadAction<string>) => {
      const size = action.payload;
      state.size = state.size.includes(size)
        ? state.size.filter((s) => s !== size)
        : [...state.size, size];
    },
    setPriceMax: (state, action: PayloadAction<number>) => {
      state.price_max = action.payload;
    },
    setManufacturerBrand: (state, action: PayloadAction<string>) => {
      state.manufacturer_brand = action.payload;
    },
    clearFilters: (state, action: PayloadAction<FiltersState>) => {
      return { ...action.payload };
    },
  },
});

export const {
  setSearchQuery,
  setMainCategory,
  setProductCategory,
  setSubCategory,
  toggleColor,
  toggleSize,
  setPriceMax,
  setManufacturerBrand,
  clearFilters,
} = filtersSlice.actions;

export const { tokenPayload } = tokenSlice.actions;

export const { productPayload } = productSlice.actions;

export const { searchPayloadData } = searchDataSlice.actions;

export const { cartPayload } = addToCartSlice.actions;

export const store = configureStore({
  reducer: {
    getTokenResult: tokenSlice.reducer,
    productStore: productSlice.reducer,
    addToCartStore: addToCartSlice.reducer,
    filters: filtersSlice.reducer,
    search: searchDataSlice.reducer,
  },
});
