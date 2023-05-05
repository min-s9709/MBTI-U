import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../recoil/userAtom";
import { genreForMbti } from "../recoil/genreMbti";
import { useState } from "react";
import { getMovies } from "../lib/api";
import { makeImagePath } from "../util/imagePath";
import { useQuery } from "react-query";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  margin-top: 100px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieSlider = styled.div`
  position: relative;
  top: -100;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  position: absolute;
  margin: 0 auto;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieBox = styled(motion.div)`
  height: 150px;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
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
const MovieViewer = () => {
  const { userMBTI } = useRecoilValue(userInfoState);
  const mbtiGenre = useRecoilValue(genreForMbti);
  const [genreId] = mbtiGenre.filter((item) => item[userMBTI]);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 5;
  const { data, isLoading } = useQuery("movies", () =>
    getMovies(genreId[userMBTI])
  );

  const handleIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <MovieSlider>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row key={index} transition={{ type: "tween", duration: 1 }}>
              {data &&
                data.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <MovieBox
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key={movie.id}
                      bgimg={makeImagePath(movie.backdrop_path, "w500")}
                    />
                  ))}
              <ButtonWrapper>
                <button onClick={handleIndex}>next</button>
              </ButtonWrapper>
            </Row>
          </AnimatePresence>
        </MovieSlider>
      )}
    </Wrapper>
  );
};

export default MovieViewer;
