// AlbumSongs.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchTopAlbum, fetchNewAlbum } from "../../api/api";
import Navbar from "../Navbar/Navbar";
import SongsHero from "../Songs Page Hero/SongsHero";
import SongsTable from "../Table/Table";
const AlbumSongsPage = () => {
  let location = useLocation();
  let clickedAlbum = location.state.album;
  const { title } = useParams();
  let [songs, setSongs] = useState([]);
  let fetchSongs = async (album) => {
    let findSong = album.find((song) => song.slug === title);
    setSongs(findSong.songs);
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      let topAlbum = await fetchTopAlbum();
      let newAlbum = await fetchNewAlbum();
      let allAlbum = topAlbum.concat(newAlbum);
      fetchSongs(allAlbum);
    };
    fetchAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  return (
    <div>
      <Navbar songsData={songs} page={"song"} />
      <SongsHero album={clickedAlbum} />
      <SongsTable album={clickedAlbum} />
    </div>
  );
};

export default AlbumSongsPage;
