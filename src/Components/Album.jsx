import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay} from '@fortawesome/free-regular-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../Context/context'

export default function Album({url, artist, title, id}){
    const {isSignedIn} = useContext(MyContext)
    const navigate = useNavigate()
    const handleClick = () => {
        if(isSignedIn){
            navigate(`/song/${id}`);
        }
        else{
            navigate('/signin')
        }
    }
    const handleHover=()=>{
        
    }
    return(
        <div className=' mr-12'>
            <div className="w-[230px] h-[230px] relative bg-gray-500">
                <img className=" h-full w-full object-cover" src={url}></img>
                <i className='text-white text-[28px] absolute bottom-2 right-3 hover-bg-red-500 '  onClick={handleClick} ><FontAwesomeIcon icon={faCirclePlay} /></i>
            </div>
            <div className="pt-1">
                <h2 className="text-gray-500 font-light">{title}</h2>
                <p className="text-gray-400 text-[15px] font-light">{artist}</p>
            </div>
        </div>
    );
}