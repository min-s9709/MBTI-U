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
import BoardWrite from "./pages/BoardWrite";
import BoardComment from "./pages/BoardComment";
import MovieComment from "./pages/MovieComment";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <LoginInfoArea />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/movie/:id/detail" element={<MovieDetail />}>
          <Route path="moviecomment" element={<MovieComment />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
        <Route path="/boardwrite" element={<BoardWrite />} />
        <Route path="/board/:id" element={<BoardDetail />}>
          <Route path="boardcomment" element={<BoardComment />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
