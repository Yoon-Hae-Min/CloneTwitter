import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// https://regexr.com/ 정규 표현식을 쓰고 테스트를 할 수 있다.

//정규표현식
//https://wikidocs.net/4308

//split에 정규 표현식을 넣으면 정규 표현삭 조건에 따라 배열로 반환이 된다
//map을 이용해서 하나씩 넘겨주고 math로 표현식 조건이 맞으면 Link tag로 감싸서 반환한다.

const PostCardContent = ({ content }) => (
  <div>
    {content.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link key={i} href={`/hashtag/${v.slice(1)}`}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
