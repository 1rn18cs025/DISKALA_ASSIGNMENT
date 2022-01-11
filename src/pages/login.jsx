import Input from "../components/input";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import '../css/login.css';
import {toast} from "react-toastify";
// import Loginn from 'ant-design-pro/lib/Login';
// import { Alert, Checkbox } from 'antd';

// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Loginn;

const apiendpoint_login = `${process.env.REACT_APP_API_URL}/user/login`;
function Login({setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  

  async function verify(e) {
    e.preventDefault();
    await fetch(apiendpoint_login, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {

        if (response.status===200) {
            // console.log(response.headers.get("x-auth-token"))
          sessionStorage.setItem("token", response.headers.get("x-auth-token"));
          setToken(response.headers.get('x-auth-token'));
          return response.text();
        } else {
          return Promise.reject(response);
        }
      })
      .then((value) => {
        if (value) {
          // console.log(respo_json)
          // setToken(respo_json)
          // console.log(document.cookie)
          // sessionStorage.setItem('token', value)?
          // setLoggedin(true)
          history.push("/viewcandidate");
        } else {
          // console.log('in else')
          history.replace("/login");
        }
      })
      .catch((error) => {
        console.log("in error", error);
        
        error.text().then((data) => {
          toast(data)
          console.log(data);
        });
        history.replace("/login");
      });
  }
  return (
    <div className="login-container">
        <form action='' onSubmit={verify}>

        <h3>Log in</h3>
        <div className="login-inputs">
        <Input name="Email-id" label="Email id" type="email" required placeholder="enter your email id" onChange={(e)=>setEmail(e.target.value)}/>
        <Input name="Password" label="Password" type="password" required placeholder="enter your password" onChange={(e)=>setPassword(e.target.value)}/>
        <span id="login-hollow-text">Minimun 8 alpha numeric</span>
        <button>
            Login
        </button>
        </div>
        </form>
    </div>
  );
}
export default Login;
