import React from "react";
import styles from "./footer.module.css";
import image from "../../assets/hero.svg";

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.imgCard}>
        <div className={styles.img}>
          <img src={image} alt="" />
        </div>
        <div>
          <p className={styles.songName}>Song Name</p>
          <p className={styles.albumName}> Album Name</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
