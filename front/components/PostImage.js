import React, { useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons/lib/icons";
import ImagesZoom from "./ImagesZoom";

const PostImage = ({ Images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = () => {
    setShowImagesZoom(true);
  };
  const onClose = () => {
    setShowImagesZoom(false);
  };
  if (Images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={Images[0].src}
          alt={Images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </>
    );
  }
  //role="presentation" 는 스크린리더가 이건 클릭할수는 있지만 굳이 클릭할 필요는 없다라고 인식
  if (Images.length === 2) {
    return (
      <>
        <img
          src={Images[0].src}
          style={{ width: "50%", display: "inline-block" }}
          alt={Images[0].src}
          onClick={onZoom}
        />
        <img
          src={Images[0].src}
          style={{ width: "50%", display: "inline-block" }}
          alt={Images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <img
        src={Images[0].src}
        style={{
          width: "50%",
          display: "inline-block",
        }}
        alt={Images[0].src}
        onClick={onZoom}
      />
      <div
        onClick={onZoom}
        style={{
          width: "50%",
          display: "inline-block",
          textAlign: "center",
          verticalAlign: "center",
        }}
      >
        <PlusOutlined />
        {`${Images.length - 1}개의 사진 더보기`}
      </div>
      {showImagesZoom && <ImagesZoom Images={Images} onClose={onClose} />}
    </>
  );
};

PostImage.propTypes = {
  Images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImage;
