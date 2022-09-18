import { useState, useEffect, useRef } from "react";
import "./css/dashboard.css";

// External Imports
import { Link } from "react-router-dom";
import { db } from "../database/realtime-db";
import { ref, get, child } from "firebase/database";

import { postMail } from "../email/mail";
import { mailString } from "../database/firebase";

function Dashboard({ isLoggedIn }) {
  const [deviceConnected, setDeviceConnection] = useState(false);
  const [message, setMessage] = useState("Feching data ....");
  const [methaneLevel, setMethaneLevel] = useState("");

  const [mailSent, setMailSent] = useState(false);
  const [HumidityMessage, setHumidityMessage] = useState("");
  const [TemperatureMessage, setTemperatureMessage] = useState("");

  const delay = 2500;

  const fetchData = () => {
    get(child(ref(db), "/")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setMethaneLevel(data.Data);
        setMessage("Methane Level");
        setHumidityMessage("Humidity Level");
        setTemperatureMessage("Temperature");
      }
    });
  };

  useEffect(() => {
    const mailHandler = async () => {
      if (parseInt(methaneLevel.Methane_Level) >= 250) {
        if (mailSent === false) {
          const mailstring = await mailString();
          console.log(mailstring);
          postMail({
            METHANE_LEVEL: methaneLevel.Methane_Level,
            TEMPERATURE: methaneLevel.Temparature,
            HUMIDITY: methaneLevel.Humidity,
            USERS: mailstring,
          });
          setMailSent(true);
        }
      }
    };
    mailHandler();
  }, [methaneLevel]);

  const connectToDB = () => {
    setDeviceConnection(true);

    setTimeout(async () => {
      fetchData();
      setInterval(() => {
        fetchData();
      }, 3000);
    }, delay);
  };

  if (isLoggedIn)
    return (
      <div className="Dashboard content">
        <div className="container">
          {!deviceConnected ? (
            <div className="not-found">
              <i className="fa-solid fa-bug bug"></i>
              <h3 className="message">Device not Connected</h3>
              <button className="search-btn" onClick={connectToDB}>
                Connect <i className="fa-solid fa-wifi"></i>
              </button>
            </div>
          ) : (
            <>
              <div
                className="dashboardDataViewer"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3>{HumidityMessage}</h3>
                  <h1
                    style={{
                      fontSize: "5em",
                    }}
                  >
                    {methaneLevel ? methaneLevel.Humidity + "%" : ""}
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3>{message}</h3>
                  <h1
                    style={{
                      fontSize: "5em",
                    }}
                  >
                    {methaneLevel ? `${methaneLevel.Methane_Level} ppm` : ""}
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3>{TemperatureMessage}</h3>
                  <h1
                    style={{
                      fontSize: "5em",
                    }}
                  >
                    {methaneLevel ? methaneLevel.Temparature + "°C" : ""}
                  </h1>
                </div>
              </div>
              <p style={{ width: "100%", margin: "auto", textAlign: "center" }}>
                Normal atmospheric methane level is somewhere arround 0.003% or
                30-35ppm
              </p>
            </>
          )}
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

export default Dashboard;
