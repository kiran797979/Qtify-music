import React, { useState } from "react";
import styles from "./table.module.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Pagination from "../Pagination/Pagination";
function SongsTable({ album }) {
  let [currentPage, setCurrentPage] = useState(1);
  let songsPerPage = 10;

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  let indexOfLastSong = currentPage * songsPerPage;
  let indexOfFirstSong = indexOfLastSong - songsPerPage;
  let currentSongs = album.songs.slice(indexOfFirstSong, indexOfLastSong);

  return (
    <div>
      <div style={{ marginBottom: "70px" }}></div>
      <div className={styles.table}>
        <Pagination
          songsPerPage={songsPerPage}
          totalSongs={album.songs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      <TableContainer
        sx={{
          maxHeight: {
            xs: 550,
            sm: "100vh",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table" className={styles.table}>
          <TableHead>
            <TableRow className={styles.tableHeader}>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentSongs.map((song) => {
              let mins = Math.floor(song.durationInMs / 60000);
              let sec = Math.floor((song.durationInMs % 60000) / 1000);
              let duration = `${mins}:${sec}`;
              return (
                <TableRow key={song.id}>
                  <TableCell className={styles.rowData}>
                    <div className={styles.imgRow}>
                      <div className={styles.songImg}>
                        <img src={song.image} alt={song.title} />
                      </div>
                      {song.title}
                    </div>
                  </TableCell>
                  <TableCell className={styles.rowData}>
                    {song.artists.join(", ")}{" "}
                  </TableCell>
                  <TableCell className={styles.rowData}>{duration}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          margin: "20px 0 70px 0",
          borderBottom: "3px solid rgba(255, 255, 255, 0.35)",
        }}
      ></div>
    </div>
  );
}

export default SongsTable;
