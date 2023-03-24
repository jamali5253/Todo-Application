// -------------------------------------------- Require Section
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import cookies from "cookies-js";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
const Stylediv = styled.div`
  @import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

  * {
    box-sizing: border-box;
  }

  :root {
    --checkbox-color: #ee9ca7;
    --checkbox-shadow: rgba(238, 156, 167, 0.2);
    --add-button: #ee9ca7;
    --add-button-shadow: rgba(238, 156, 167, 0.4);
  }

  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
        62deg,
        rgba(1, 95, 183, 0.9732216701223994) 13%,
        rgba(255, 122, 151, 0.5) 4%
      ),
      linear-gradient(
        44deg,
        rgba(0, 43, 99, 0.07922090238615942) 39%,
        rgba(242, 140, 143, 0.5) 18%
      ),
      linear-gradient(
        118deg,
        rgba(84, 202, 242, 0.03152997265339608) 40%,
        rgba(247, 155, 187, 0.5) 54%
      ),
      linear-gradient(
        58deg,
        rgba(90, 90, 237, 0.16144443572260592) 83%,
        rgba(249, 156, 142, 0.5) 23%
      );
    background-blend-mode: normal, lighten, multiply, hard-light;
    font-family: "DM Sans", sans-serif;
    overflow: hidden;
  }

  input {
    outline: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .app-container {
    border-radius: 8px;
    width: 100%;
    max-width: 480px;
    max-height: 100%;
    background-color: #10101d;
    padding: 24px;
    overflow: auto;
  }

  .app-header {
    font-size: 20px;
    line-height: 32px;
    margin: 0 0 12px 0;
    color: #fff;
  }

  .submit-task {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border: none;
    background: var(--add-button);
    color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='feather feather-plus'%3E%3Cline x1='12' y1='5' x2='12' y2='19'/%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E");
    background-size: 18px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 12px 0 var(--add-button-shadow);
  }
  .submit-task2 {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border: none;
    background: var(--add-button);
    color: #fff;
    background-size: 18px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 12px 0 var(--add-button-shadow);
  }

  .add-task {
    height: 40px;
    font-size: 14px;
    display: flex;
  }

  .task-input {
    border-right: none;
    width: 100%;
    padding: 0 4px;
    outline: none;
    border: none;
    border-bottom: 1px solid #fff;
    background-color: transparent;
    margin-right: 12px;
    color: #fff;
    box-shadow: none;
    border-radius: 0;

    &:placeholder {
      color: #fff;
    }
  }

  .task-list-item {
    background-color: #191933;
    border-radius: 4px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    padding: 8px;

    input {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid #fff;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='feather feather-check' stroke='%23fff'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0;
      transition: 0.2s;
      margin-right: 8px;
      flex-shrink: 0;
      margin-top: 4px;
      appearance: none;

      &:hover {
        border-color: var(--checkbox-color);
        box-shadow: 0 0 0 3px var(--checkbox-shadow);
      }

      &:checked {
        background-size: 10px;
        border: 1px solid var(--checkbox-color);
        background-color: var(--checkbox-color);

        + span {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: line-through rgba(255, 255, 255, 0.8);
        }
      }
    }

    &-label {
      display: flex;
      align-items: flex-start;
      color: #fff;
      margin-right: 8px;
      font-size: 14px;
      line-height: 24px;
      position: relative;
      transition: 0.2s;
      cursor: pointer;
    }
  }

  .delete-btn {
    margin-left: auto;
    display: block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff3d46' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='feather feather-trash-2'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/%3E%3Cline x1='10' y1='11' x2='10' y2='17'/%3E%3Cline x1='14' y1='11' x2='14' y2='17'/%3E%3C/svg%3E");
    background-size: 16px;
    background-position: center;
    cursor: pointer;
  }

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type="checkbox"],
    input[type="radio"] {
      -webkit-appearance: none;
      -moz-appearance: none;
    }
  }
`;
// console.log
//--------------------------------------------------
const Main_Todo = () => {
  // ----------------------------------------- Hook Section
  const [userdata, Setuserdata] = useState([]);
  const [data, Setdata] = useState("");
  const [storedata, Setstoredata] = useState([]);
  const [userid, Setuserid] = useState("");
  const [tooglebtn, Settooglebtn] = useState(true);
  const [curritem, Setcurritem] = useState("");
  const nav = useNavigate();

  // --------------------------------------- Function-1
  const getdata = async () => {
    const res = await axios.get("/api/todo", { withCredentials: true });
    console.log(res);
    Setuserdata(res.data);
    const userid = res.data._id;
    Setuserid(userid);
    Read(userid);
  };

  // ------------------------------------- Read

  const Read = async (userid) => {
    try {
      const readdata = await axios(`/api/read/${userid}`, {
        withCredentials: true,
      });
      // console.log(readdata);
      Setstoredata(readdata.data.map((item) => item.tododata));
    } catch (error) {
      // console.log("There is some err");
    }
  };
  //--------------------------------------------- Create
  const Create = async () => {
    const res = await fetch(`/api/create/${userid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: true,
      },
      body: JSON.stringify({ data: data }),
    });
    const showres = await res.json();
    // console.log(showres.userid);
    Read(showres.userid);
    Setuserid(showres.userid);
    Setdata("");
  };
  //---------------------------------------- Delete
  const Delete = async (item, itemid) => {
    const afterdel = await axios.post(`/api/delete/${item}`, {
      userid: userid,
    });
    const data = afterdel.data.map((item) => item.tododata);
    // console.log(data);
    Setstoredata(data);
    const deldata = await axios.delete(`/api/duser/${item}`);
    if (deldata) {
      alert("Todo Deleted Successfully");
    }
  };
  //----------------------------------------------- Update-btn-item
  const Update = async (itemdata) => {
    Settooglebtn(false);
    Setdata(itemdata);
    // console.log(data);
    Setcurritem(itemdata);
  };
  //------------------------------------------------ Main-Update-btn
  const Updatedata = async () => {
    const res = await axios.post(`/api/update/${curritem}`, { updated: data });
    // console.log(res);
    Settooglebtn(true);
    Read(res.data.userid);
    Setdata("");
  };
  // -------------------- Useeffect
  useEffect(() => {
    getdata();
    Read();
  }, []);

  return (
    <>
      <h1>TODO APPLICATION</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => {
            cookies.expire("authtoken");
            nav("/signup");
          }}
        >
          Logout
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav text-black-100">
            <a className="nav-item nav-link active" href="#">
              Welcome {userdata.username} 🤩
            </a>
          </div>
        </div>
      </nav>
      <Stylediv>
        <div className="app-container" id="taskList">
          <h1 className="app-header">TO DO LIST</h1>
          <div className="add-task">
            <input
              type="text"
              autoComplete="off"
              placeholder="Add New Task"
              v-model="tasks.name"
              className="task-input"
              onChange={(e) => Setdata(e.target.value)}
              value={data}
            />
            {tooglebtn ? (
              <input
                type="submit"
                value=""
                className="submit-task"
                title="Add Task"
                onClick={Create}
              />
            ) : (
              <button className="submit-task2" onClick={Updatedata}>
                ✔
              </button>
            )}
          </div>
          {storedata.map((item, id) => {
            return (
              <ul className="task-list" key={id}>
                <li className="task-list-item" v-for="task in tasks">
                  <label className="task-list-item-label">
                    <input type="✔" onClick={() => Update(item)} />
                    <span>{item}</span>
                  </label>
                  <span
                    className="delete-btn"
                    title="Delete Task"
                    onClick={() => Delete(item, id)}
                  ></span>
                </li>
              </ul>
            );
          })}
        </div>
      </Stylediv>
    </>
  );
};
// https://codepen.io/aybukeceylan/pen/abmLNag
export default Main_Todo;