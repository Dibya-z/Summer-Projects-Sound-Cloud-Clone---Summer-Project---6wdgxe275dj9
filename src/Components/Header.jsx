import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSoundcloud} from '@fortawesome/free-brands-svg-icons'
import { useContext, useState } from 'react'
import MyContext from '../Context/context'
import {  useNavigate } from 'react-router-dom';
import {Avatar} from 'primereact/avatar'
import SearchPage from './SearchPage'

export default function Header(){
    const {name, isSignedIn , jwt , updateContext} = useContext(MyContext);
    const navigate = useNavigate()
    const fullName = name
    let initials = '';

    if (fullName) {
        const nameParts = fullName.split(' ');
        if (nameParts.length === 1) {
            initials = nameParts[0].charAt(0).toUpperCase();
        } else {
            initials = nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
        }
    }

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        updateContext({
            name : "",
            jwt : "",
            isSignedIn : false
        })
        navigate('/')
    };
    return (
            <div className="bg-zinc-500 w-full h-[74px] flex justify-between items-center px-8 fixed z-20">
                <button className="text-white flex items-center gap-1">
                    
                    <i className=' text-[38px]' ><FontAwesomeIcon icon={faSoundcloud} /></i> 
                    <span className='font-semibold'> SOUNDCLOUD</span>
                    
                </button>
                <div className='flex justify-between'>
                {/* <input 
                type = 'text'
                 placeholder='         Search Songs ' 
                className='w-28 h-12 ' 
                /> */}

                {/* <button 
                className='px-4 py-1 text-white border border-white rounded ' >Search</button> */}
                </div>
                {isSignedIn ? (
                    <div className="relative" onClick={toggleDropdown}>

                        <Avatar className = 'w-14 h-14 mr-18 text-xl mr-20' label={initials} shape="circle" style={{ backgroundColor: '#ffffff', color: 'C7DBE6'  }} />

                        {isDropdownVisible && (
                            <div className="absolute bg-black w-72 right-0 rounded-md shadow-lg z-20">
                                <div className='flex items-center p-6'>
                                    <Avatar className = 'w-6 h-6 text-xl gap-2' label={initials} shape="circle" style={{ backgroundColor: '#ffffff', color: 'C7DBE6'  }} />

                                    <p className='ml-2 text-white'>{fullName}</p>
                                </div>
                                <hr className="border-gray-600" />
                                <ul>
                                

                                    <hr className="border-gray-600" />
                                    <li className="px-4 py-2 cursor-pointer text-white" onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className='px-4 py-1 text-white border border-white rounded' onClick={() => navigate('/signin')}>
                        Sign In
                    </button>
                )}

                {/* <button className=" px-4 py-1 text-white border border-white rounded " onClick={() => {
                    if(contextData.isSignedIn){
                        contextData.updateContext({
                            name : "",
                            jwt : "",
                            isSignedIn : false
                        });
                    } else{
                        navigate("/signin")
                    }
                        
                }} >{contextData.isSignedIn ? "Sign Out" : "Sign In"}</button> */}
                
            </div>   
    )
}