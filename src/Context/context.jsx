import { createContext, useState } from "react";

const MyContext = createContext({
    name : "",
    jwt : "",
    updateContext : () => {}
});

function ContextProvider({children}){
    const [data, setData] = useState({
        name : "",
        jwt : "",
        isSignedIn : false
    });
    const [songs, setSongs] = useState([])
    const updateContext = (obj) => {
        setData({...obj});
    }
    return (
        <MyContext.Provider value={{...data, updateContext, setSongs}} >
            {children}
        </MyContext.Provider>
    );
}
export default MyContext;
export {ContextProvider};