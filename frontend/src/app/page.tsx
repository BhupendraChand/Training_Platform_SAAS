import { setName } from "@/lib/store/user.slice";

import { useDispatch } from "react-redux";


export default function Home() {
  let name = "romeo"
  const dispatch = useDispatch()
  dispatch(setName(name))
  return (
   <h1>haha hehe huhu</h1>
  );
}