import { createSlice } from "@reduxjs/toolkit"
import { addCustomer, clientHistoryFilter, getAllCustomers, getHistory, login, placOrder } from "../action/adminActions"

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: { auth: JSON.parse(localStorage.getItem("auth")) },
    reducers: {
        invalidate: (state) => {
            state.customerAdded = false
            state.orderPlaced = false
        },
        filterHistory: (state, { payload }) => {
            state.history = state.history.filter(item => {
                const d = new Date(item.date)
                const m = d.getMonth()
                // console.log(d);
                return m === +payload
            })
        },
        logout: (state) => {
            localStorage.removeItem("auth")
            state.auth = null
        }
    },
    extraReducers: builder => builder
        .addCase(addCustomer.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(addCustomer.fulfilled, (state, { payload }) => {
            state.loading = false
            state.customerAdded = true
        })
        .addCase(addCustomer.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(getAllCustomers.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getAllCustomers.fulfilled, (state, { payload }) => {
            state.loading = false
            state.customers = payload
        })
        .addCase(getAllCustomers.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(placOrder.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(placOrder.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orderPlaced = true
        })
        .addCase(placOrder.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(getHistory.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getHistory.fulfilled, (state, { payload }) => {
            state.loading = false
            state.history = payload
        })
        .addCase(getHistory.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(clientHistoryFilter.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(clientHistoryFilter.fulfilled, (state, { payload }) => {
            state.loading = false
            state.history = payload
        })
        .addCase(clientHistoryFilter.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })


        .addCase(login.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(login.fulfilled, (state, { payload }) => {
            state.loading = false
            state.auth = payload
        })
        .addCase(login.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

})

export const { invalidate, filterHistory, logout } = adminSlice.actions
export default adminSlice.reducer