import { Row, Col, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import istanbulTurkey from "../../../assets/images/istanbul-turkey.png";
import sydneyAustralia from "../../../assets/images/sydney-australia.png";
import bakuAzerbaijan from "../../../assets/images/baku-azerbaijan.png";
import maleMaldives from "../../../assets/images/male-maldives.png";

const recentSearch = [
  {
    destination: "Istanbul, Turkey",
    image: istanbulTurkey,
    place: "325 places",
  },
  {
    destination: "Sydney, Australia",
    image: sydneyAustralia,
    place: "325 places",
  },
  {
    destination: "Baku, Azerbaijan",
    image: bakuAzerbaijan,
    place: "325 places",
  },
  {
    destination: "Male, Maldives",
    image: maleMaldives,
    place: "325 places",
  },
];

const { Text } = Typography;

const RecentSearchCard = () => {
  return (
    <div
      className="recent-search-card"
      style={{ height: "90px", marginTop: "32px" }}
    >
      <Row gutter={80} style={{ height: "100%" }}>
        {recentSearch.map((element, index) => {
          return (
            <Col key={index} span={6}>
              <div style={{ height: "100%" }}>
                <Row align="center">
                  <Col span={12}>
                    <img
                      src={element.image}
                      alt={element.destination}
                      style={{
                        display: "block",
                        width: "90px",
                        height: "90px",
                      }}
                    />
                  </Col>
                  <Col span={12} flex="none" className="flex-align-center">
                    <Link to="/" className="flex-column">
                      <Text className="montserrat-semibold-16px">
                        {element.destination}
                      </Text>
                      <Text
                        className="montserrat-regular-12px"
                        type="secondary"
                      >
                        {element.place}
                      </Text>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default RecentSearchCard;
