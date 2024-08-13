import { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import MyContext from '../Context/context';
export default function SignIn(){
    const contextData = useContext(MyContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email : "",
        password: ""
    });
    const [state, setState] = useState(false);
    const checkPassword = (str) => {
        if(str.length < 6) return false;
        let lowerCase = false, upperCase = false, special = false;
        for(let i = 0; i < str.length; i++){
            if(str[i] >= 'a' && str[i] <= 'z') lowerCase = true;
            if(str[i] >= 'A' && str[i] <= 'Z') upperCase = true;
            if (str[i] === '@' || str[i] === '#' || str[i] === '$' || str[i] === '%' || 
                str[i] === '^' || str[i] === '&' || str[i] === '*' || str[i] === '(' || str[i] === ')' || 
                str[i] === '_') {
                special = true;
            }
        }
        return lowerCase && upperCase && special;
    }
    const checkData = (userData) => {
        if(!userData.email || !userData.password) setState(false);
        else if(userData.email.includes('@') && checkPassword(userData.password)) setState(true);
        else setState(false);
    }
    const handleChange = (e) => {
        setUserData(prev => {
            checkData({
                ...prev,
                [e.target.name] : e.target.value
            });
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!state){
            alert("All feilds are requried\nEmail must have '@'\nThe password should be at least 6 letters and should include both lower, and uppercase letters and symbols[@#$%^&*()_]");
            return;
        }
        const submitData = async () => {
            const response = await fetch("https://academics.newtonschool.co/api/v1/user/login", {
                method : "POST",
                headers : {
                    'accept': 'application/json',
                    'projectID': 'gonikotv90ms',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({...userData, "appType": "music"}),
            });
            const result = await response.json();
            if(result.status === 'fail'){
                alert(result.message);
                return;
            }
            contextData.updateContext({jwt : result.token, name : result.data.user.name, isSignedIn: true});
            setUserData({
                email : "",
                password: ""
            });
            navigate('/');
        }
        submitData();
    }

    


    
    return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-sans mb-4 text-orange-600">Sign In</h1>
        <form className="flex flex-col w-[400px]"onSubmit={handleSubmit}>
          
            <input
                value={userData.name}
                placeholder="Email address"
              type="text"
              id="email"
              name="email"
              required
              className="w-full p-2 m-1 border rounded "
              onChange={handleChange}
            />
            <input
                value={userData.password}
                placeholder="Password"
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 m-1 border rounded "
              onChange={handleChange}
            />
          <button
            type="submit"
            className="p-2 m-2 bg-orange-600 text-white w-full  border-none cursor-pointer">
            Continue
          </button>
        </form>
        <p className="text-center mt-10 text-orange-600">
          Don't have an account?
          <Link to="/signup" className="border-none cursor-pointer text-orange-600 hover:underline ml-1">
            Sign Up
          </Link>
        </p>
    </div>
 
    )
}