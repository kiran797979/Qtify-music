import React, { useState, useRef, useEffect } from "react";
import styles from "./AudioPlayer.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import Button from "../Button/Button";
import { ImLoop, ImVolumeMedium, ImVolumeMute2 } from "react-icons/im";
// import { HiVolumeUp } from "react-icons/hi";

function AudioPlayer({ song, album = "Album Name" }) {
  const [playToggle, setPlayToggle] = useState(false);
  const [songProgress, setSongProgres] = useState(0);
  const [metaDataDuration, setMetaDataDuration] = useState(0);
  const [progressBarWidth, setprogressBarWidth] = useState("0%");
  const [songLoop, setSongLoop] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(80);

  let songDef = {
    image: require("../../assets/hero.svg"),
    title: "Song Name",
  };

  if (song?.title) songDef = { ...song };

  const audioPlayer = useRef(null);
  const sliderSong = useRef(null);

  function volumeMute() {
    setMute(true);
  }
  function volumeUnMute() {
    setMute(false);
  }

  function handleVolumeChange(e) {
    const value = parseInt(e.target.value);
    setVolume(value);
    // console.log(value);
    if (value === 0) {
      volumeMute();
      audioPlayer.current.volume = 0;
    } else {
      volumeUnMute();
      audioPlayer.current.volume = (value / 100).toFixed(2);
    }
  }

  function handleVolumeBtnClick(e) {
    if (!mute) {
      volumeMute();
      setVolume(0);
      audioPlayer.current.volume = 0;
    } else {
      volumeUnMute();
      setVolume(50);
      audioPlayer.current.volume = 0.5;
    }
  }

  function handleClickPlayPause(e) {
    if (!playToggle) audioPlayer.current.play();
    else audioPlayer.current.pause();
    setPlayToggle(!playToggle);
    console.log(audioPlayer, "audioPlayer");
    console.log(audioPlayer.current, "current");
  }

  function handleLoadMetaData(e) {
    setMetaDataDuration(e.target.duration);
  }

  function calculateTime(secs) {
    const seconds = Math.floor(secs % 60);
    const minutes = Math.floor(secs / 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }

  useEffect(() => {
    if (audioPlayer.current.readyState > 0) {
      // setMetaDataDuration(200);
      setMetaDataDuration(audioPlayer.current.duration);
    } else {
      audioPlayer.current.addEventListener(
        "loadedmetadata",
        handleLoadMetaData
      );
    }
  }, []);

  function handleLoopToggle(e) {
    setSongLoop(!songLoop);
  }

  function handleChangeProgress(e) {
    setSongProgres(e.target.value);
    audioPlayer.current.currentTime = e.target.value;
    console.log(e.target.value);
    // console.log((songProgress / metaDataDuration) * 100);
  }
  function handleCurrentTimeUpdate(e) {
    setSongProgres(e.target.currentTime);
    // console.log(e.target.currentTime);
  }

  // useEffect(() => {
  //   console.log(
  //     audioPlayer.current.buffered.end(audioPlayer.current.buffered.length - 1),
  //     audioPlayer.current.seekable
  //   );
  // });

  useEffect(() => {
    // console.log(audioPlayer.current.duration);
    if (audioPlayer.current.duration === songProgress) {
      setPlayToggle(false);
      setSongProgres(0);
      setprogressBarWidth(`0%`);
    } else {
      setprogressBarWidth(`${(songProgress / metaDataDuration) * 100}%`);
    }
  }, [metaDataDuration, songProgress]);

  return (
    <div className={styles.player_container}>
      <div className={styles.song_image_name}>
        <img
          className={styles.song_image}
          src={songDef.image || require("../../assets/hero.svg")}
          alt={`${songDef.title} thumbnail`}
        />
        <div className={styles.album_song_name}>
          <p className={styles.album_name}>{album}</p>
          <p className={styles.song_name}>{songDef.title}</p>
        </div>
      </div>
      <div className={styles.audio_player_container}>
        <div className={styles.audio_player_controls}>
          <Button
            onClick={handleLoopToggle}
            className={`${styles.loopBtn} ${
              songLoop ? styles.loopBtnActive : ""
            }`}
          >
            <ImLoop />
          </Button>
          <Button onClick={handleClickPlayPause} className={styles.PlayPause}>
            {playToggle ? <FaPause /> : <FaPlay />}
          </Button>
          <div className={styles.volumeBtnContainer}>
            <input
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
              type="range"
              className={styles.volume_range}
            />
            <Button
              onClick={handleVolumeBtnClick}
              className={`${styles.volumeBtn} ${mute ? styles.volumeMute : ""}`}
            >
              {mute ? <ImVolumeMute2 /> : <ImVolumeMedium />}
            </Button>
          </div>
        </div>
        <audio
          src="https://p.scdn.co/mp3-preview/315b151078df729934712ed1cc21e11506c64017?cid=f6a40776580943a7bc5173125a1e8832"
          ref={audioPlayer}
          className={styles.audio_player}
          preload="metadata"
          id={styles.audio_player}
          onTimeUpdate={handleCurrentTimeUpdate}
          loop={songLoop}
          // onLoadedMetadata={handleLoadMetaData}
          // controls
        />
        <div className={styles.song_progress_container}>
          <p className={styles.currOrTotalTime}>
            {calculateTime(songProgress) || "00:00"}
          </p>
          <div className={styles.song_progress__bar_container}>
            <input
              type="range"
              ref={sliderSong}
              // style={{ "--my-css-var": 10 } as React.CSSProperties}
              onChange={handleChangeProgress}
              className={styles.song_progress}
              max={metaDataDuration || "100"}
              value={songProgress}
            />
            <div
              style={{ width: progressBarWidth }}
              className={styles.song_progress_bar}
            ></div>
          </div>
          <p className={styles.currOrTotalTime}>
            {calculateTime(metaDataDuration)}
          </p>
        </div>
      </div>
      <div className={styles.dummyDiv}></div>
    </div>
  );
}

export default AudioPlayer;
