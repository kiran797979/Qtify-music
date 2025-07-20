import axios from "axios";

const config = {
    endpoint: {
        TopAlbum: "https://qtify-backend-labs.crio.do/albums/top",
        NewAlbum: "https://qtify-backend-labs.crio.do/albums/new",
        Songs: "https://qtify-backend-labs.crio.do/songs",
        genres: "https://qtify-backend-labs.crio.do/genres",
    },
};

const fetchTopAlbum = async() => {
    try {
        let res = await axios.get(config.endpoint.TopAlbum);
        return res.data;
    } catch (err) {
        return new Error("Failed to Fetch !", err);
    }
};

const fetchNewAlbum = async() => {
    try {
        let res = await axios.get(config["endpoint"]["NewAlbum"]);
        return res.data;
    } catch (err) {
        return new Error("Failed to Fetch !", err);
    }
};

const fetchSongs = async() => {
    try {
        let res = await axios.get(config.endpoint.Songs);
        return res.data;
    } catch (err) {
        return new Error("Failed to Fetch !", err);
    }
};

const fetchGenres = async() => {
    try {
        let res = await axios.get(config["endpoint"].genres);
        return res.data;
    } catch (err) {
        return new Error("Failed to Fetch !", "err");
    }
};

export { fetchTopAlbum, fetchNewAlbum, fetchSongs, fetchGenres };