
"use client"

import { useAppDispatch } from "@/lib/store/hooks"
import { setAddress, setName } from "@/lib/store/user.slice"
import { useState } from "react"
import { useDispatch } from "react-redux"

function Contact(){
    let address = "Kathmandu"
    let name = "Romeo"
    const dispatch = useAppDispatch()
    dispatch(setName(name))
    dispatch(setAddress(address))
    return (
        <h1>haha hehe huhu</h1>
    )
}

export default Contact