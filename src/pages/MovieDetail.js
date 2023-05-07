import { Outlet } from "react-router-dom";
import MovieDetailViewer from "../components/MovieDetailViewer";

const MovieDetail = () => {
  return (
    <>
      <MovieDetailViewer />
      <Outlet />
    </>
  );
};

export default MovieDetail;
