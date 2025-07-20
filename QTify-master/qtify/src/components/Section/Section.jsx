import * as React from "react";
import styles from "../Section/section.module.css";
import "./material.css";
import { useState } from "react";
import Card from "../Card/Card";
import { Box, CircularProgress, Tabs, Tab } from "@mui/material";
import Carousel from "../Carousel/Carousel";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Section = ({ title, data, type, genres }) => {
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: "#34c94b",
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("all");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterSongs = () => {
    if (type === "songs" && value !== "all") {
      return data.filter((ele) => ele.genre.key === value);
    }
    return data;
  };

  return (
    <div>
      <div className={styles.header}>
        <p>{title}</p>
        <p className={styles.showAll} onClick={handleToggle}>
          {toggle ? "Collapse" : "Show All"}
        </p>
      </div>
      {type === "songs" && (
        <ThemeProvider theme={theme}>
          <Box sx={{ width: "100%", padding: "10px 20px" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              aria-label="Genre Filter Tabs"
            >
              <Tab
                value="all"
                label="All"
                key="all"
                className={styles.genreTab}
              />
              {genres.map((tab) => (
                <Tab
                  key={tab.key}
                  value={tab.key}
                  label={tab.label}
                  className={styles.genreTab}
                />
              ))}
            </Tabs>
          </Box>
        </ThemeProvider>
      )}
      {!data.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <CircularProgress color="success" />
          <p style={{ marginLeft: "10px" }}>Loading...</p>
        </Box>
      ) : (
        <>
          <div className={styles.cardsWrapper}>
            <div className={styles.wrapper}>
              {toggle ? (
                // Use the filtered data directly
                type === "songs" ? (
                  filterSongs().map((card) => (
                    <Card key={card.id} data={card} type={type} />
                  ))
                ) : (
                  data.map((card) => (
                    <Card key={card.id} data={card} type={type} />
                  ))
                )
              ) : (
                // Pass filtered data to Carousel
                <Carousel
                  data={type === "songs" ? filterSongs() : data}
                  component={(card) => (
                    <Card key={card.id} data={card} type={type} />
                  )}
                />
              )}
            </div>
          </div>
          {toggle && title === "Top Albums" && <hr />}
        </>
      )}
    </div>
  );
};

export default Section;
