import { useState, useEffect } from "react";
// External Imports
import { Link } from "react-router-dom";
import RegisterForm from "../components/register";
import "./css/users.css";

import Card from "../components/card";

import { fetchHandler, deleteHandler } from "../database/firebase";

function Users({ isLoggedIn }) {
  const [users, setUsers] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchUsers = async () => {
    const usersDoc = await fetchHandler();
    setUsers(usersDoc);
    setUpdated(true);
  };

  const deleteUser = async (id) => {
    const usersDoc = await deleteHandler(id);
    if (usersDoc) {
      setUpdated(true);
    }
  };

  const clearAll = async () => {
    // while (users.length != 0) {
    //   const doc = users[0];
    //   deleteUser(doc.fieldID);
    // }
    // const usersDoc = await fetchHandler();
    // setUsers(usersDoc);
    // setUpdated(true);
  };

  useEffect(() => {
    fetchUsers();
    setUpdated(false);
  }, [updated]);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoggedIn)
    return (
      <div className="Home content">
        <RegisterForm />
        <div className="wrapper-users">
          <div className="btn-container">
            <button className="btn-user-container" onClick={clearAll}>
              Clear All
            </button>
            <button
              className="btn-user-container"
              data-toggle="modal"
              data-target="#modal-register"
            >
              Add User
            </button>
          </div>
          <div className="users-container">
            {users.map((data) => {
              return (
                <Card
                  name={data.name.stringValue}
                  fid={data.fieldID}
                  key={data.id.stringValue}
                  mail={data.email.stringValue}
                  deleteHandler={deleteUser}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="Home content">
        <h1 className="text-center m-5">Login first to access the app.</h1>
        <div className="m-auto goto-btn-container">
          <Link to="/auth" className="li">
            <button className="goto-btn">Go to the Auth page</button>
          </Link>
        </div>
      </div>
    );
}

export default Users;
