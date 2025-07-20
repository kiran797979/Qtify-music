/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./songsHero.module.css";
import backButoon from "../../assets/back.svg";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
function SongsHero({ album }) {
  let { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  let [duration, setDuration] = useState({
    hours: 0,
    mins: 0,
  });

  let calculateDuration = () => {
    let totalMilliSeconds = album.songs.reduce((a, b) => a + b.durationInMs, 0);
    let totalHours = Math.floor(totalMilliSeconds / 3600000);
    let totalMins = Math.floor((totalMilliSeconds % 3600000) / 60000);
    setDuration({
      hours: totalHours,
      mins: totalMins,
    });
  };

  useEffect(() => {
    calculateDuration();
  }, [album]);

  return (
    <div>
      <img
        src={backButoon}
        alt="Back Button"
        className={styles.backButton}
        onClick={() => navigate("/")}
      />
      <div className={styles.card}>
        <div className={styles.albumImage}>
          <img src={album.image} alt="" />
        </div>
        <div className={styles.albumDetails}>
          <p className={styles.albumName}>{album.title}</p>
          <p className={styles.albumDescription}>{album.description}</p>
          <div className={styles.duration}>
            <p>{album.songs.length} Songs</p>
            <span className={styles.dot}></span>
            <p>
              {duration.hours} hr {duration.mins} min
            </p>
            <span className={styles.dot}></span>
            <p>{(album.follows / 1000).toFixed(2)}k Follows</p>
          </div>
          <div className={styles.buttons}>
            <p
              className={styles.shuffle}
              onClick={() =>
                enqueueSnackbar("Songs Shuffled", {
                  variant: "success",
                  autoHideDuration: 1500,
                })
              }
            >
              Shuffle
            </p>
            <p
              className={styles.library}
              onClick={() =>
                enqueueSnackbar("Song added to library", {
                  variant: "success",
                  autoHideDuration: 1500,
                })
              }
            >
              Add to Library
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongsHero;
