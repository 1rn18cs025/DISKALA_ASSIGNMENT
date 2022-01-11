import Input from "../components/input";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import stateArray from "../states";
import {toast} from "react-toastify";



const apiendpoint_getone = `${process.env.REACT_APP_API_URL}/candidate/getonecandidate`;
const apiendpoint_udpate = `${process.env.REACT_APP_API_URL}/candidate/editCandidate`;

function EditCandidate() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function verify() {
      await fetch(apiendpoint_getone, {
        method: "post",
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((response) => {
          if (response.status != 200) {
            return Promise.reject(response);
          } else {
            return response.json();
          }
        })
        .then((value) => {
          setName(value.name);
          setAddress(value.address);
          setAge(value.age);
          setPincode(value.pincode);
          setDob(value.dob);
          setState(value.state);
          setEmail(value.email);
          setResult(value.result);
        })
        .catch((error) => {
          error.text().then((data) => {
            toast(data)
          });
        });
    }
    verify();
  }, [id]);

  function handelcancel(){
    history.replace('/viewcandidate')
  }

  async function edit(e){
      e.preventDefault()
    await fetch(apiendpoint_udpate, {
      method: "post",
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        email,
        name,
        address,
        age,
        result,
        pincode,
        state,
        dob,
      }),
    })
    .then((response) => {
        if (response.status != 200) {
          return Promise.reject(response);
        } else {
          return response.json();
        }
      })
      .then((value) => {
        if (value) {

          history.replace("/viewcandidate");
        } else {
          history.replace("/viewcandidate");
        }
      })
      .catch((error) => {
        error.text().then((data) => {
          toast(data)
        });
          // history.replace('/viewcandidate')
      });
  }

  return (
    <div className="form-container">
      <form onSubmit={edit}>
        <h3>Edit Candidate</h3>
        <div className="form-inputs">
        <div className="form-input">
        <Input
          name="name"
          label="name"
          type="text"
          required
          value={name}
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="email"
          label="Email id"
          type="email"
          value={email}
          required
          placeholder="enter your email id"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="form-input">
        
        <Input
          name="dob"
          label="dob"
          type="date"
          required
          value={dob}
          placeholder="enter your DOB"
          onChange={(e) => setDob(e.target.value)}
        />

        <Input
          name="age"
          label="age"
          type="text"
          required
          value={age}
          placeholder="enter your age"
          onChange={(e) => setAge(e.target.value)}
        />
       </div>
       <div className="form-input">

        <Input
          name="address"
          label="address"
          type="text"
          required
          value={address}
          placeholder="enter your address"
          onChange={(e) => setAddress(e.target.value)}
        />
        
        <div className="stateInput">
              <label htmlFor={name} className="state-label">
                State
              </label>
              <select onChange={(e)=>setState(e.target.value)} id="stateList">
              <option className="selectPlaceholder" value={state} selected disabled>{state}</option>
                {stateArray.map((state)=>{
                  return <option key={state} value={state}>{state}</option>
                })}
              </select>
                </div>
        </div>
        <div className="form-input">
         <Input
          name="pincode"
          label="pincode"
          type="text"
          value={pincode}
          required
          placeholder="enter your 6 digit pincode"
          onChange={(e) => setPincode(e.target.value)}
        />
        
        <Input
          name="result"
          label="result"
          type="text"
          required
          value={result}
          placeholder="enter your result"
          onChange={(e) => setResult(e.target.value)}
        />
        </div>
        <div className="form-button">

        <button onClick={handelcancel} id="cancelbutton">Cancel</button>
        <button >Update</button>
        </div>
        </div>
      </form>
    </div>
  );
}
export default EditCandidate;
