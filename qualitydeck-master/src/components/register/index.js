import { useEffect, useState } from "react";
import "./index.css";

//import { createUserWithEmailAndPassword } from "firebase/auth";
import { handler } from "../../database/firebase";
import { nanoid } from "nanoid";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async () => {
    const data = {
      name: name,
      email: email,
      id: nanoid(),
    };
    try {
      const user = await handler(data);
      if (user) {
        setMessage("User has been added successfully !!");
        setName("");
        setEmail("");
      } else {
        setMessage("Sorry, some error has been occured !!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      class="modal fade"
      id="modal-register"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Register new user
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setMessage("")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label>Name</label>
            <input
              className="w-100 mb-3"
              placeholder="W1NGS Kumar"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <label>Email</label>
            <input
              className="w-100 mb-3"
              placeholder="quickdeck.testmail@gmail.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <h3 className="">{message}</h3>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="register-btn"
              data-dismiss="modal"
              onClick={() => {
                setName("");
                setEmail("");
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="register-btn"
              onClick={registerUser}
            >
              Create New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
