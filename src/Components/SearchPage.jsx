import MyContext from "../Context/context"
import Header from "./Header"
import { useContext } from "react"
const SearchPage = () =>{
    const {songs, setSongs} = useContext(MyContext)
    return (<div className="w-screen h-screen ">
        <Header/>

    </div>)
}

export default SearchPage