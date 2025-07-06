
"use client"

import { useAppSelector } from "@/lib/store/hooks"


/* 
nextjs--> default component --> server component --> server side rendering (SEO huncah, browser level features, hooks haru use garna mildainw)
reactjs --> component --> client component --> client side rendering (SEO hudainw, browser level, DOM level, hooks haru use garna milxa)


*/
function Hehe(){

const {teacherName,teacherPassword} = useAppSelector((store)=>store.teacher)
console.log(data.teacherName,data.teacherPassword)
    return(
        <h1>Nepal Traning kathmandu</h1>
    )
}

export default Hehe