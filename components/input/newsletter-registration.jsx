import classes from "./newsletter-registration.module.css";
import { useContext, useRef } from "react";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef(null);
  const notificationContext = useContext(NotificationContext);

  const registrationHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    notificationContext.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      notificationContext.showNotification({
        title: "Error!",
        message: message,
        status: "error",
      });
      return;
    }
    const data = await response.json();
    notificationContext.showNotification({
      title: "Success!",
      message: "Successfully registered for newsletter!",
      status: "success",
    });
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
