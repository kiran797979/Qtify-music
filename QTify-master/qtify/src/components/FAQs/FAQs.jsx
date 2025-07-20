import styles from "./faqs.module.css";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

let query = {
  "Is QTify free to use?": "Yes! It is 100% free, and has 0% ads!",
  "Can I download and listen to songs offline?":
    "Sorry, unfortunately we don't provide the service to download any songs.",
};

const FAQs = () => {
  return (
    <div className={styles.FaqsWrapper}>
      <div className={styles.Faqs}>
        <h1>FAQs</h1>

        {Object.keys(query).map((question, index) => {
          return (
            <Accordion key={question} className={styles.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                className={styles.question}
              >
                <Typography>{question}</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.answer}>
                <Typography>{query[question]}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export { FAQs };
