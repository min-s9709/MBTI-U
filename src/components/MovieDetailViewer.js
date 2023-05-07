import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail } from "../lib/api";
import { makeImagePath } from "../util/imagePath";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "./BoardCommentViewer";

const MovieWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  width: 1024px;
  margin: 0 auto;
  margin-top: 80px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PosterWrapper = styled.div`
  width: 45vh;
  height: 500px;
  border-radius: 25px;
  background-size: cover;
  background-position: center center;
`;

const MovieInfo = styled.div`
  display: flex;
  height: 500px;
  flex-direction: column;
  justify-content: center;
  background-color: #fffffe;
  border-radius: 25px;
  padding: 15px;
  margin-left: 15px;
`;
const MovieTitle = styled.h2`
  font-size: 36px;
  border-bottom: 2px solid gray;
  color: #272343;
`;

const MovieDate = styled.h2`
  font-size: 20px;
  margin-top: 15px;
`;

const MovieRating = styled.h2`
  margin-top: 15px;
  font-size: 20px;
`;
const MovieRuntime = styled.h2`
  margin-top: 15px;
  font-size: 20px;
`;

const GenreList = styled.ul`
  margin-top: 15px;
  display: flex;
  li {
    font-size: 20px;
    margin-right: 10px;
  }
`;

const Description = styled.div`
  width: 500px;
  height: 500px;
  margin-top: 30px;
  h3 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  span {
    font-size: 20px;
    margin-top: 10px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieDetailViewer = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery("movieDetail", () => getMovieDetail(id));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      navigate(`/movie/${id}/detail/moviecomment`);
    } else {
      navigate(`/movie/${id}/detail`);
    }
  }, [id, isOpen, navigate]);
  const handleMovieComment = () => {
    setIsOpen((prev) => !prev);
  };
  const onClick = () => {
    navigate(`/movie`);
  };
  return (
    <MovieWrapper>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <>
            <PosterWrapper
              style={{
                backgroundImage: `url(${makeImagePath(
                  data.poster_path,
                  "w500"
                )})`,
              }}
            />
            <MovieInfo>
              <MovieTitle>{data.title}</MovieTitle>
              <MovieDate>{data.release_date}</MovieDate>
              <MovieRating>{`평점 : ${Number(data.vote_average).toFixed(
                1
              )}💛`}</MovieRating>
              <MovieRuntime>{`상영시간 : ${data.runtime}  min🕒`}</MovieRuntime>
              <GenreList>
                {data.genres.map((i) => (
                  <li key={i.id}>{`◾${i.name}`}</li>
                ))}
              </GenreList>
              <Description>
                <h2>💬</h2>
                <span>{data.overview}</span>
              </Description>
            </MovieInfo>
          </>
        )}
      </Wrapper>
      <ButtonWrapper>
        <Button onClick={onClick}>목록</Button>
        <Button onClick={handleMovieComment}>
          {isOpen ? "후기 접기" : "후기 펼치기"}
        </Button>
      </ButtonWrapper>
    </MovieWrapper>
  );
};

export default MovieDetailViewer;
