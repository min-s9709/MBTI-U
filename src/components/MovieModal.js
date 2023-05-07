import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../util/imagePath";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #2f2f2f;
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const BigTitle = styled.h3`
  color: #fff;
  padding: 10px;
  font-size: 28px;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  color: #fff;
  top: -60px;
  font-size: 15px;
`;

const DetailBtn = styled.button`
  background-color: inherit;
  border-radius: 20px;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-left: 10px;
`;

const MovieModal = (clickedMovie) => {
  const movieIdMatch = useMatch(`/movie/:id`);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate("/movie");
  };

  const handleDetail = (movieId) => {
    navigate(`/movie/${movieId}/detail`);
  };

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie
        layoutId={movieIdMatch?.params.id}
        style={{ top: scrollY.get() + 100 }}
      >
        {clickedMovie && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedMovie.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigTitle>{clickedMovie.title}</BigTitle>
            <BigOverview>{clickedMovie.overview}</BigOverview>
            <DetailBtn onClick={() => handleDetail(clickedMovie.id)}>
              상세보기 ❤
            </DetailBtn>
          </>
        )}
      </BigMovie>
    </>
  );
};

export default MovieModal;
