import "./App.css";
import AlbumSongsPage from "./components/Album Songs Page/AlbumSongsPage";
import HomePage from "./components/Home Page/HomePage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        {" "}
        <Route path="/" Component={HomePage} />{" "}
        <Route path="/album/:title" Component={AlbumSongsPage} />{" "}
      </Routes>{" "}
    </>
  );
};

export default App;
