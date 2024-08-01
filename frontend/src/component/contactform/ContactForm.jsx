import { useState } from "react";
import Button from "../../component/button/Button";
import "./ContactFormCss.css";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "    https://hospital-management-r7hc.onrender.com/api/v1/message/send",
          { firstName, lastName, phone, email, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((resp) => {
          toast.success(resp.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="container1">
      <div className="contact_image2">
        <img src="/ContactService.png" alt="Contact Service" />
      </div>
      <div className="contact_form">
        <div className="top_btn">
          <a
            href="https://wa.me/918528852528?text=Hello, I have a question about Medical Mitra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              text="Via Chat Support"
              image={<img src="/message.png" alt="Chat Support" />}
            />
          </a>
          <a href="tel:8528852528">
            <Button
              text="Via Call"
              image={<img src="/telephone-call.png" alt="Call Support" />}
            />
          </a>
        </div>
        <a
          href="mailto:saumypandey8080@gmail.com?Subject=About%20Medical%20Mitra&body=Hello,%20I%20have%20a%20question%20about%20Medical%20Mitra"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            isOutline={true}
            text="Via eMail"
            image={<img src="/email.png" alt="Email Support" />}
          />
        </a>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <form onSubmit={handleSubmit}>
          <div className="form_control">
            <label htmlFor="Name">First Name</label>
            <input
              style={{ border: "1px solid black" }}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              placeholder="Enter your last name"
              type="text"
              name="First Name"
            />
          </div>
          <div className="form_control">
            <label htmlFor="Name">Last Name</label>
            <input
              style={{ border: "1px solid black" }}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              placeholder="Enter your last name"
              type="text"
              name="Last Name"
            />
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <input
              style={{ border: "1px solid black" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Enter your valid Email"
              type="email"
              name="email"
            />
          </div>
          <div className="form_control">
            <label htmlFor="number">Contact Number</label>
            <input
              style={{ border: "1px solid black" }}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Enter your number"
              type="tel"
              name="number"
            />
          </div>
          <div className="form_control">
            <label htmlFor="message">Message</label>
            <textarea
              style={{ border: "1px solid black" }}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              rows={4}
              placeholder="Message"
              name="message"
            />
          </div>
          <div className="form_control_check">
            <input
              style={{ border: "1px solid black" }}
              required
              type="checkbox"
              name="check"
            />
            <label htmlFor="chec">
              {" "}
              I authorize Medical Mitra to contact me via email, SMS & voice
              call.
            </label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              padding: "0 22%",
            }}
          >
            <Button text="SUBMIT" />
          </div>
        </form>
      </div>
      <div className="contact_image">
        <img
          src="/ContactService.png"
          width={608}
          height={615}
          alt="Contact Service"
        />
      </div>
    </section>
  );
};

export default ContactForm;
