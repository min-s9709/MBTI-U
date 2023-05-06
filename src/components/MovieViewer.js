import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../recoil/userAtom";
import { genreForMbti } from "../recoil/genreMbti";
import { useState } from "react";
import { getMovies } from "../lib/api";
import { makeImagePath } from "../util/imagePath";
import { useQuery } from "react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

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
  top: -150;
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
  margin-left: 10px;
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
  const { scrollY } = useScroll();
  const movieIdMatch = useMatch(`/movie/:id`);
  const { data, isLoading } = useQuery("movies", () =>
    getMovies(genreId[userMBTI])
  );
  console.log(movieIdMatch);
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

  const onOverlayClick = () => {
    navigate("/movie");
  };
  const handleClicked = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleDetail = (movieId) => {
    navigate(`/movie/${movieId}/detail`);
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
              <Overlay
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigMovie
                layoutId={movieIdMatch.params.id}
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
          ) : null}
        </AnimatePresence>
      </>
    </Wrapper>
  );
};

export default MovieViewer;
