import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "./SideBar";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "    https://hospital-management-r7hc.onrender.com/api/v1/message/messages",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return navigate("/login");
  }
  return (
    <>
      <SideBar />
      <section
        className="page messages"
        style={{ backgroundColor: " #0e8797 " }}
      >
        <h1 style={{ color: "white" }}>MESSAGE</h1>
        <div className="banner">
          {messages && messages.length > 0 ? (
            messages.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div className="details">
                    <p>
                      First Name: <span>{element.firstName}</span>
                    </p>
                    <p>
                      Last Name: <span>{element.lastName}</span>
                    </p>
                    <p>
                      Email: <span>{element.email}</span>
                    </p>
                    <p>
                      Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      Message: <span>{element.message}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Messages!</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Message;
