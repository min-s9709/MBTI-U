import BoardDetailViewer from "../components/BoardDetailViewer";
import { Outlet } from "react-router-dom";

const BoardDetail = () => {
  return (
    <>
      <BoardDetailViewer />
      <Outlet />
    </>
  );
};

export default BoardDetail;
