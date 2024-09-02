"use client"

import { Children } from "react"
import { Provider } from "react-redux"
import Store from "./Store"



export const StoreProvider =({children})=>{

    return <Provider store={Store}>{children}</Provider>
}