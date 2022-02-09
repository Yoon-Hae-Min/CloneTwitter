import { Button, Card, List } from "antd";
import React from "react";
import { StopOutlined } from "@ant-design/icons";
import styled from "styled-components";
import PropTypes from "prop-types";

const FList = styled(List)`
  margin-bottom: 10px;
`;

const FListItem = styled(List.Item)`
  margin-top: 20px;
`;

const ListLoadMore = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const FollowList = ({ header, data }) => {
  return (
    <FList
      grid={{ gutter: 4, xs: 2, md: 3 }}
      dataSource={data}
      header={<div>{header}</div>}
      bordered
      size="small"
      loadMore={
        <ListLoadMore>
          <Button>더 보기</Button>
        </ListLoadMore>
      }
      renderItem={(item) => (
        <FListItem>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickName}></Card.Meta>
          </Card>
        </FListItem>
      )}
    ></FList>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
