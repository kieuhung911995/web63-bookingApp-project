import { Row, Col, Button, Typography } from "antd";
import React from "react";

import FallIntoTravelDes from "./FallIntoTravelDes";

import sriLankaImage1 from "../../../assets/images/sri-lanka-image1.png";
import sriLankaImage2 from "../../../assets/images/sri-lanka-image2.png";
import sriLankaImage3 from "../../../assets/images/sri-lanka-image3.png";
import sriLankaImage4 from "../../../assets/images/sri-lanka-image4.png";

const sriLankaImage = [
  { imageSource: sriLankaImage1 },
  { imageSource: sriLankaImage2 },
  { imageSource: sriLankaImage3 },
  { imageSource: sriLankaImage4 },
];

const { Text, Paragraph } = Typography;

const FlightIntoTravel = () => {
  return (
    <div className="flight-into-travel">
      <Row justify="center">
        <Col span={24}>
          <FallIntoTravelDes />
        </Col>
        <Col span={24} style={{ marginTop: "20px" }}>
          <Row>
            <Col span={10}>
              <div
                style={{
                  display: "grid",
                  backgroundColor: "#8DD3BB",
                  padding: "24px",
                  borderRadius: "20px",
                  height: "390px",
                }}
              >
                <Row justify="space-between">
                  <Col span={16}>
                    <Text className="trade-gothic-lt-extended-bold-40px">
                      Backpacking Sri Lanka
                    </Text>
                  </Col>
                  <Col className="price-border-box">
                    <Text className="trade-gothic-lt-extended">From</Text>
                    <Text className="montserrat-semibold-20px">$700</Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Paragraph className="montserrat-regular">
                      Traveling is a unique experience as it's the best way to
                      unplug from the pushes and pulls of daily life. It helps
                      us to forget about our problems, frustrations, and fears
                      at home. During our journey, we experience life in
                      different ways. We explore new places, cultures, cuisines,
                      traditions, and ways of living.
                    </Paragraph>
                  </Col>
                </Row>
                <Row style={{ alignSelf: "flex-end" }}>
                  <Col style={{ width: "100%" }}>
                    <Button style={{ width: "100%", height: "48px" }}>
                      <Text className="montserrat-medium">Book Flight</Text>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={14}>
              <div>
                <Row gutter={[0, 40]}>
                  {sriLankaImage.map((element, index) => {
                    return (
                      <Col
                        key={index}
                        span={12}
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <img src={element.imageSource} alt="error" />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FlightIntoTravel;
