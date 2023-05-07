import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../recoil/userAtom";
import { genreForMbti } from "../recoil/genreMbti";
import { useState } from "react";
import { getMovies } from "../lib/api";
import { makeImagePath } from "../util/imagePath";
import { useQuery } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import MovieModal from "./MovieModal";

const Wrapper = styled.div`
  margin-top: 180px;
`;

const RecommandInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieSlider = styled.div`
  position: relative;
  top: -200;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  position: absolute;
  margin: 0 auto;
`;

const MovieBox = styled(motion.div)`
  height: 150px;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: #2f2f2f;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 15px;
    color: white;
  }
`;

const Button = styled.button`
  width: 100px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  margin-top: 25px;
  font-size: 12px;
  font-weight: 500;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const MovieViewer = () => {
  const { userMBTI } = useRecoilValue(userInfoState);
  const mbtiGenre = useRecoilValue(genreForMbti);
  const [genreId] = mbtiGenre.filter((item) => item[userMBTI]);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 5;
  const navigate = useNavigate();
  const movieIdMatch = useMatch(`/movie/:id`);
  const { data, isLoading } = useQuery("movies", () =>
    getMovies(genreId[userMBTI])
  );

  const handleIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const handleClicked = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const clickedMovie =
    movieIdMatch?.params.id &&
    data?.results.find((movie) => movie.id + "" === movieIdMatch.params.id);

  return (
    <Wrapper>
      <RecommandInfo>
        <h2>{userMBTI}에 맞는 영화 추천 리스트입니다.</h2>
        <Button onClick={handleIndex}>NEXT</Button>
      </RecommandInfo>
      {isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <Container>
          <MovieSlider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
                transition={{ type: "tween", duration: 1 }}
              >
                {data &&
                  data.results
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <MovieBox
                        layoutId={movie.id + ""}
                        onClick={() => handleClicked(movie.id)}
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        key={movie.id}
                        bgimg={makeImagePath(movie.backdrop_path, "w500")}
                      >
                        <Info variants={infoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </MovieBox>
                    ))}
              </Row>
            </AnimatePresence>
          </MovieSlider>
        </Container>
      )}
      <>
        <AnimatePresence>
          {movieIdMatch ? (
            <>
              <MovieModal {...clickedMovie} />
            </>
          ) : null}
        </AnimatePresence>
      </>
    </Wrapper>
  );
};

export default MovieViewer;
