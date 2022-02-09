import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import {
  GlobalStyle,
  OverLay,
  Header,
  CloseBtn,
  SlickWrapper,
  ImgWrapper,
  Indicator,
} from "./style";

//import from "ImagesZoom" 을 하게되면 자동으로 index파일이 import된다
const ImagesZoom = ({ Images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <OverLay>
      <GlobalStyle />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}> X </CloseBtn>
      </Header>
      <SlickWrapper>
        <Slick //슬릭을 이용하여 페이지 슬라이드 img를 만들 수 있음
          afterChange={(current) => setCurrentSlide(current)}
          infinite={true}
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {Images.map((v, index) => (
            <ImgWrapper key={index}>
              <img src={v.src} alt={v.src} />
            </ImgWrapper>
          ))}
        </Slick>
        <Indicator>
          <div>
            {currentSlide + 1} / {Images.length}
          </div>
        </Indicator>
      </SlickWrapper>
    </OverLay>
  );
};

ImagesZoom.propTypes = {
  Images: PropTypes.arrayOf(PropTypes.object),
  onCLose: PropTypes.func,
};

export default ImagesZoom;
