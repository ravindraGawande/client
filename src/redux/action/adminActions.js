import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const addCustomer = createAsyncThunk(
    "addCustomer",
    async (customerData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.post("/customers", customerData)
            return true
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })
export const getAllCustomers = createAsyncThunk(
    "getAllCustomers",
    async (customerData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.get("/customers")
            return data
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })

export const placOrder = createAsyncThunk(
    "placOrder",
    async (ordersData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.post("/orders", ordersData)
            return true
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })

export const getHistory = createAsyncThunk(
    "getHistory",
    async (id, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.get("/orders", {
                params: {
                    userId: id
                }
            })
            return data
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })

export const clientHistoryFilter = createAsyncThunk(
    "clientHistoryFilter",
    async (clientData, { rejectWithValue, getState }) => {

        try {
            const { data } = await API.get("/orders", {
                params: {
                    userId: clientData.id
                }
            })
            return data.filter(item => {
                const d = new Date(item.date)
                const m = d.getMonth()
                return m === +clientData.month
            })
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })


export const login = createAsyncThunk(
    "login",
    async (adminData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.get("/admin", {
                params: adminData
            })
            if (data.length === 0) {
                return rejectWithValue("INVALID Creadentials")
            }
            localStorage.setItem("auth", JSON.stringify(data[0]))
            return data[0]
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })