import React, {useState} from 'react'
import { useHistory,withRouter} from 'react-router-dom'
import logo from './logo.png';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
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
        <div  className="d-flex justify-content-center " >
           
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
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary" style={{ display: 'block',marginLeft: 'auto',marginRight: 'auto'}}>Submit</button>
                <br></br>
                <span class="psw" style={{ display: 'block',marginLeft: 'auto',marginRight: 'auto', textAlign:'center'}}>Forgot <a href="/signup">password?</a></span>
            </form>
        </div>
        </div>
    
    </>
    )
}

export default withRouter(Login);