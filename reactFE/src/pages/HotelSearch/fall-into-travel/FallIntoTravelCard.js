import { Row, Col, Button, Typography } from "antd";
import React from "react";

import parisBigSize from "../../../assets/images/paris-big-size.png";
import londonBigSize from "../../../assets/images/london-big-size.png";
import melbourneBigSize from "../../../assets/images/melbourne-big-size.png";
import columbiaBigSize from "../../../assets/images/columbia-big-size.png";

const { Text } = Typography;

const travelCardItems = [
  {
    name: "Melbourne",
    description: "An amazing journey",
    price: "$700",
    image: melbourneBigSize,
  },
  {
    name: "Paris",
    description: "A Paris adventure",
    price: "$600",
    image: parisBigSize,
  },
  {
    name: "London",
    description: "London eye adventure",
    price: "$350",
    image: londonBigSize,
  },
  {
    name: "Columbia",
    description: "Amazing streets",
    price: "$700",
    image: columbiaBigSize,
  },
];

const FallIntoTravelCard = () => {
  return (
    <>
      <Row gutter={16}>
        {travelCardItems.map((element, index) => {
          return (
            <Col key={index} span={6}>
              <div
                style={{
                  height: "420px",
                  position: "relative",
                  width: "280px",
                }}
              >
                <Row
                  justify="center"
                  gutter={[0, 16]}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "250px",
                    width: "248px",
                  }}
                >
                  <Col span={24}>
                    <Row>
                      <Col className="flex-column" span={16}>
                        <Text
                          className="montserrat-semibold-24px"
                          style={{ color: "white" }}
                        >
                          {element.name}
                        </Text>
                        <Text
                          className="montserrat-regular"
                          style={{ color: "white" }}
                        >
                          {element.description}
                        </Text>
                      </Col>
                      <Col
                        span={8}
                        style={{
                          display: "flex",
                          flexDirection: "column-reverse",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          className="montserrat-semibold-24px"
                          style={{ color: "white" }}
                        >
                          {element.price}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Button className="large-button" style={{ width: "100%" }}>
                      <Text className="montserrat-medium">Book a Hotel</Text>
                    </Button>
                  </Col>
                </Row>
                <img
                  src={element.image}
                  alt="Error"
                  style={{ width: "100%" }}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default FallIntoTravelCard;
