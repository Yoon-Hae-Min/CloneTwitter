import styled, { createGlobalStyle } from "styled-components";
// 스타일이 길어지면 메인 로직에서 따로 파일을 분리한다 ImagesZoom.js를 만들지 않고 폴더를 만든 이유가 이 때문이다
export const GlobalStyle = createGlobalStyle`
    .slick-slide{
        display: inline-block;
    }
`;

export const Indicator = styled.div`
  text-align: center;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
  }
`;

export const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1{
      margin: 0;
      font-size:17px;
      color: #333;
      line-height 44px;
  }

`; // scss같은 문법을 쓸 수도 있다 이런방법을 주로쓰자 컴포넌트가 많아진다
export const CloseBtn = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;
export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

export const OverLay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;
  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;
