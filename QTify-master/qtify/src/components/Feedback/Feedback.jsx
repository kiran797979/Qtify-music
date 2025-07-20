import React, { useState } from "react";
import styles from "./feedback.module.css";
import { useSnackbar } from "notistack";
function Feedback({ onClose }) {
  let { enqueueSnackbar } = useSnackbar();
  let [feedbackData, setFeedbackData] = useState({
    fullName: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackData({
      fullName: "",
      email: "",
      subject: "",
      description: "",
    });
    enqueueSnackbar("Feedback submitted successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  const handleChange = (e, type) => {
    setFeedbackData((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  return (
    <div
      id="feedback"
      className={`${styles.feedback} ${styles.feedbackClicked}`}
    >
      <div className={styles.feedbackWrapper}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.closeWrapper}>
              <div></div>
              <h3>FeedBack</h3>
              <h3 onClick={onClose} className={styles.close}>
                X
              </h3>
            </div>
            <input
              type="text"
              placeholder="Full name"
              required
              className={styles.fullName}
              value={feedbackData["fullName"]}
              onChange={(e) => handleChange(e, "fullName")}
            />
            <input
              type="email"
              placeholder="Email ID"
              required
              className={styles.email}
              value={feedbackData["email"]}
              onChange={(e) => handleChange(e, "email")}
            />
            <input
              type="text"
              placeholder="Subject"
              required
              className={styles.subject}
              value={feedbackData["subject"]}
              onChange={(e) => handleChange(e, "subject")}
            />

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className={styles.description}
              placeholder="Description"
              value={feedbackData["description"]}
              onChange={(e) => handleChange(e, "description")}
            ></textarea>
            <button className={styles.submitFeedback}>Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
