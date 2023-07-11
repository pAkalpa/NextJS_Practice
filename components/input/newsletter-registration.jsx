import classes from "./newsletter-registration.module.css";
import useSWR from "swr";
import { useRef } from "react";

function NewsletterRegistration() {
  const emailInputRef = useRef(null);

  const registrationHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(
      "🤬 ~ file: newsletter-registration.jsx:17 ~ registrationHandler ~ data:",
      data
    );
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
