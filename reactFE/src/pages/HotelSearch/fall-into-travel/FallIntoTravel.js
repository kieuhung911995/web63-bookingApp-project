import { Row, Col } from "antd";
import React from "react";

import FallIntoTravelCard from "./FallIntoTravelCard";
import FallIntoTravelDes from "./FallIntoTravelDes";

const FallIntoTravel = () => {
  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <FallIntoTravelDes />
        </Col>
        <Col span={24} style={{ marginTop: "20px" }}>
          <FallIntoTravelCard />
        </Col>
      </Row>
    </>
  );
};

export default FallIntoTravel;
