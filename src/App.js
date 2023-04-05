import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Board from "./pages/Board";
import BoardDetail from "./pages/BoardDetail";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";
import Register from "./pages/Register";
import LoginInfoArea from "./components/LoginInfoArea";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <LoginInfoArea />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
