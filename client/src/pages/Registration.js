import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function Registration() {
  const [mobileno,setmobileno]=useState('')
  const [email,setemail]=useState('')
  const [username,setUsername]=useState('')
  const[password,setpassword]=useState('')
  const[password1,setpassword1]=useState('')

  const[isLogin,setLogin]=useState(true)
  const [loginStatus, setLoginStatus] = useState("");
  const [regStatus, setregStatus] = useState("");
const forlogin = () =>
{
  setLoginStatus("")
  setregStatus("")
  setLogin(true)

}
const forreg = () =>

{
  setLoginStatus("")
  setregStatus("")
  setLogin(false)

}

  Axios.defaults.withCredentials = true;

  const register = () => {
    if(username == ''){
      alert('user name should not be blank')

    }
    
    else if (email.includes('@')==false || email.includes(' ')==true){
      alert('invalid email id ')
    }
    else if (mobileno.length !== 10){
      alert('mobile no invalid')
          }
    else if (password.length < 8)
    {
      alert('password length should be 8')
    }
    else if ( password !== password1)
    {
      alert('confirm password not match with password')
    }
    else{
    Axios.post("http://localhost:3001/register", {
      name: username,
      password: password,
      mobile:mobileno,
      email:email
    }).then((response) => {
      setregStatus(response.data.message);
    });
  }
  };

  const login = () => {
    if(username=='')
    {
      alert('Please fill username')
    }
    else if (password.length <8)
    {
      alert('passwoord length should be 8')
    }
   
    else{
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });}
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    
    <div className='App'>
    <br/>
    <br/>
    {isLogin ? <h1 className='text-center'> Please login </h1> : <h1 className='text-center'> Please Register </h1>}
    <br/>
    <br/>
    
    {isLogin ? 
              

    <div className='mb-3'>

        <input type="text" className="form-control"   id='username' placeholder="enter name here"
        value ={username} onChange ={e => setUsername(e.target.value)} required/>
        <br/>
        <input type="password" className="form-control"   id='password' placeholder="enter Password here"
        value ={password} onChange ={e => setpassword(e.target.value)} required/>
        <br/>

        </div>
        

        :
<        div className='mb-3'>

        <input type="text" className="form-control" id='username' placeholder="enter name here"
        value ={username} onChange ={e => setUsername(e.target.value)}/>
        <br/>
       
        
        <input type="email" className="form-control" id='email' placeholder="enter Email ID here"
        value ={email} onChange ={e => setemail(e.target.value)}/>
        <br/>
        <input type="text" className="form-control" id='lastname' placeholder="enter Mobile no here"
        value ={mobileno} onChange ={e => setmobileno(e.target.value)}/>
        <br/>

        <input type="password" className="form-control" id='password' placeholder="enter Password here"
        value ={password} onChange ={e => setpassword(e.target.value)}/>
        <br/>
        <input type="password" className="form-control" id='password1' placeholder="enter  confirm Password here"
        value ={password1} onChange ={e => setpassword1(e.target.value)}/>
        <br/>

</div>
    }
    <div className='d-grid gap-2'>
       {isLogin ? <button onClick={login} className="btn btn-primary" >Login</button>
        :         <button onClick={register} className="btn btn-primary" >Register</button>
        
    }
    </div>

        <div className="mb-3">
            <br/>
            {isLogin ? <h5>If You Don't Have Account, Please <button className='btn btn-primary' onClick={forreg}> Register</button> here </h5>
            : <h5> If you have Account , Please <button className='btn btn-primary' onClick={forlogin}>Login</button>here</h5>    
        }
        </div>
        <h1>{loginStatus}</h1>
        <h1>{regStatus}</h1>
    </div>
    
    
    )
}
