import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons/lib/icons";
import { Avatar, Button, Card, Comment, List, Popover } from "antd";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import PostImage from "./PostImage";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

const PostCard = ({ Post }) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState(false);
  const onClickComment = useCallback(() => {
    setComment((pre) => !pre);
  });
  const onClickLiked = useCallback(() => {
    setLiked((pre) => !pre);
  });
  const { user } = useSelector((state) => state.User);
  const id = user?.id; //optional chaning 문법 === user && user.id 유저 아이디가 있으면 받아오는것
  console.log(Post.Comments);
  return (
    <div>
      <Card
        cover={Post.Images[0] && <PostImage Images={Post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onClickLiked}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onClickLiked} />
          ),
          <MessageOutlined key="comment" onClick={onClickComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id === Post.User.id ? (
                  <>
                    <Button type="primary">수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button type="danger">신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{Post.User.nickname[0]}</Avatar>}
          title={Post.User.nickname}
          description={<PostCardContent content={Post.content} />}
        ></Card.Meta>
      </Card>
      {comment && (
        <>
          <CommentForm Post={Post} />
          <List
            header={`${Post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={Post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  avatar={<Avatar> {item.User.nickname[0]}</Avatar>}
                  author={item.User.nickname[0]}
                  content={item.content}
                ></Comment>
              </li>
            )}
          ></List>
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
  Post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default PostCard;
