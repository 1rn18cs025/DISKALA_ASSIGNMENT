import Input from "../components/input";
import { useState } from "react";
import {useHistory} from "react-router-dom";
import config from "../config.json";
// const apiurl = config.apiurl;
import '../css/createCandidate.css';
import stateArray from "../states";

const apiendpoint = `${process.env.REACT_APP_API_URL}/candidate/addcandidate`;

function CreateCandidate(){
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [pincode, setPincode] = useState('');
    const [dob, setDob] = useState('')
    const [state, setState] = useState('')
    const [email, setEmail] = useState('')
    const [result, setResult] = useState('')
    const history = useHistory()
    // const stateArray = stateArray;
    // console.log(apiurl);

    function handelcancel(){
      history.replace('/viewcandidate')
    }

    async function verify(e) {
        e.preventDefault();
        await fetch(apiendpoint, {
          method: "post",
          headers: {
            'x-auth-token':sessionStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          //make sure to serialize your JSON body
          body: JSON.stringify({
            email,name,address,age,result,pincode,state,dob
          })
        }
        )
        .then((response) => {
            if(response.status!=200){
                return Promise.reject(response);
            }else{
                return response.text();
            }

        })
        .then((value)=>{
          if(value){
            // console.log(respo_json)
            // setToken(respo_json)
            // console.log(document.cookie)
            // sessionStorage.setItem('token', value)?
            // setLoggedin(true)
            history.replace('/viewcandidate')
          }
          else{
            // console.log('in else')
            history.replace('/viewcandidate')
          }
        })
        .catch((error)=>{
          console.log('in error',error)
          error.text().then((data)=>{
              console.log(data)
          })
        //   history.replace('/candidate')
    
        })
       
      }
    return(
        
        <div className="form-container">
            <form action='' onSubmit={verify}>

            <h3>Create Candidate</h3>
            <div className="form-inputs">

            <div className="form-input">
              <Input name="name" label="name" type="text" required placeholder="enter your name" onChange={(e)=>setName(e.target.value)}/>
              <Input name="email" label="Email id" type="email" required placeholder="enter your email id" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-input" >
              <Input name="dob" label="Date Of Birth" type="date" required placeholder="enter your DOB" onChange={(e)=>setDob(e.target.value)}/>
              <Input name="age" label="age" type="text" required placeholder="enter your age" onChange={(e)=>setAge(e.target.value)}/>
            </div >
            <div className="form-input">
              <Input name="address" label="address" type="text" required placeholder="enter your address" onChange={(e)=>setAddress(e.target.value)}/>
              {/* <Input list="stateList" name="state" label="state" type="text" required placeholder="enter your state" onChange={(e)=>setState(e.target.value)}/> */}
              <div className="stateInput">
              <label htmlFor={name} className="state-label">
                State
              </label>
              <select onChange={(e)=>setState(e.target.value)} id="stateList">
                {stateArray.map((state)=>{
                  return <option value={state}>{state}</option>
                })}
              </select>
                </div>
            </div>
            <div className="form-input">
              <Input name="pincode" label="pincode" type="text" required placeholder="enter your pincode" onChange={(e)=>setPincode(e.target.value)}/>
              <Input name="result" label="result" type="text" required placeholder="enter your result" onChange={(e)=>setResult(e.target.value)}/>
            </div>
            <div className="form-button">
            <button id="cancelbutton" onClick={handelcancel}>
                Cancel
            </button >
            <button>
                Create
            </button >
   
            </div>
            </div>
            </form>
        </div>
    )
}
export default CreateCandidate;