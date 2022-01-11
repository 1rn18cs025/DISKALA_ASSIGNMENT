import { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/candidateView.css";

const apiendpoint_get = `${process.env.REACT_APP_API_URL}/candidate/getCandidate`;
const apiendpoint_delete = `${process.env.REACT_APP_API_URL}/candidate/deleteCandidate`;

function ViewCandidate() {
  const [data, setdata] = useState([]);
  const history = useHistory();

  function handleNewCandidate() {
    history.push("/addcandidate");
  }

  async function fetchData() {
    await fetch(apiendpoint_get, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status != 200) {
          return Promise.reject(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setdata(data);
      });
  }

  function deleteEntry(id) {
    const newData = data.filter((d) => {
      if (d._id === id) {
        return false;
      }
      return true;
    });
    setdata(newData);
  }
  async function handleDelete(id) {
    await fetch(apiendpoint_delete, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          return Promise.reject(response);
        } else {
          deleteEntry(id);

          return response.toString();
        }
      })
      .then((data) => {
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  const headings = ["", "name", "dob", "email", "result", "", "", ""];
  return (
    <div>
      <div className="listLength"> 
      <span >Candidate List:{data.length}</span>
      </div>
      <div className="task-wrapper">
        <table>
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((candidate, index) => (
              <tr key={index + 1}>
              
                <td>{index + 1}</td>  
                <td>{candidate.name}</td>
                <td>{candidate.dob}</td>
                <td>{candidate.email}</td>
                <td>{candidate.result}</td>
                <td>
                  <Link to={`/editCandidate/${candidate._id}`}>
                    <svg width="12" fill="skyblue" id="icon-pencil" viewBox="0 0 32 32">
                      <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
                    </svg>
                  </Link>
                </td>
                <td>
                  <a href="#" onClick={() => handleDelete(candidate._id)}>
                    <svg width="12" fill="skyblue" id="icon-bin" viewBox="0 0 32 32">
                      <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                      <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a className="add_cand" href="#" onClick={() => handleNewCandidate()}> + Add New Candidate</a>
      </div>
    </div>
  );
}
export default ViewCandidate;
