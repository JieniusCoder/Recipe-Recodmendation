import React, { useRef, useState } from "react";
import { render } from "@react-email/components";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import emailjs from "emailjs-com";


export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const form = useRef<HTMLFormElement>(null);


  //Email service using EmailJS
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("Form:", form.current);
    setSubmitted(true);

    emailjs.sendForm('service_csm42zs', 'template_rqmz857', 
        form.current as HTMLFormElement, 'YhOmCTpyu2NtnafKR')
    .then(
      (result) => {
        console.log(result.text);
        setSubmitted(true);
      },
      (error) => {
        console.log(error.text);
      }
    );

    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Contact</h1>
      {submitted && (
        <p>Thank you for your message! I'll get back to you soon.</p>
      )}
      <form ref={form} onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="name" style={{ color: "grey" }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name = "from_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="email" style={{ color: "grey" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name = "from_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="message" style={{ color: "grey" }}>
            Message
          </label>
          <textarea
            id="message"
            name = "message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
