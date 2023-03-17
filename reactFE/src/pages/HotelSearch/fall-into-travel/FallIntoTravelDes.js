import { Row, Col, Button, Typography } from "antd";
import React from "react";

const { Paragraph, Text } = Typography;

const FallIntoTravelDes = () => {
  return (
    <>
      <Row align="middle">
        <Col span={12} className="flex-column" style={{ gap: "16px" }}>
          <Text className="trade-gothic-lt-extended-bold-32px">
            Fall into travel
          </Text>
          <Paragraph
            className="montserrat-regular-16px"
            style={{ margin: "0" }}
          >
            Going somewhere to celebrate this season? Whether you’re going home
            or somewhere to roam, we’ve got the travel tools to get you to your
            destination.
          </Paragraph>
        </Col>
        <Col span={12}>
          <Button
            size="large"
            className="flex-space-between-align-center medium-button"
            style={{ marginLeft: "auto" }}
          >
            <Text className="montserrat-medium ">See All</Text>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FallIntoTravelDes;
