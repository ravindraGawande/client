import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slice/adminSlice";


const reduxStore = configureStore({
    reducer: {
        admin: adminSlice,
    },
})

export default reduxStore