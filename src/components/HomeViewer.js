import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  margin-top: 150px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SliderItem = styled.img`
  width: 600px;
  height: 400px;
  border-radius: 15px;
`;

const HomeViewer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        <SliderItem src={`./asset/image/mbti1.jpg`} />
        <SliderItem src={`./asset/image/mbti2.jpg`} />
        <SliderItem src={`./asset/image/mbti3.jpg`} />
      </Slider>
    </Wrapper>
  );
};

export default HomeViewer;
