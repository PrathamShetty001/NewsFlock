import React, {useState} from 'react'
import { useHistory,withRouter} from 'react-router-dom'
import logo from './logo.png';

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: ""})
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password,cpassword}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/news");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <>
     <div className="page-container" style={{ backgroundColor: "grey",height: '100vh'}} >
    <div  className="d-flex flex-column align-items-center" >      
    <form  onSubmit={handleSubmit}>
    <span style={{color:"black",fontSize:"50px",fontWeight:"bold"}} >News</span>
    <span style={{color:"blue",fontSize:"50px",fontWeight:"bold"}}>Flock</span>
    <br></br>
    <img
                className="mx-auto"
                src={logo}
                alt="NewsFlock Logo"
                style={{ display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '200px', height: '100px', marginTop: '10px' }}/>
    <br></br>
    <br></br>
    <br></br>
  <div  className="mb-3">
    <label  htmlFor="name"  className="form-label">Name</label>
    <input type="text"  className="form-control" id="name"name="name" onChange={onChange}/>
  </div>
  <div  className="mb-3">
    <label  htmlFor="email"  className="form-label">Email address</label>
    <input type="email"  className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div  className="mb-3">
    <label  htmlFor="password"  className="form-label">Password</label>
    <input type="password"  className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div  className="mb-3">
    <label  htmlFor="cpassword"  className="form-label">Confirm Password</label>
    <input type="password"  className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit"  className="btn btn-primary" style={{ display: 'block',marginLeft: 'auto',marginRight: 'auto'}}>Sign Up</button>
</form>
    </div>
    </div>
  </>
  )
}

export default withRouter(Signup);
