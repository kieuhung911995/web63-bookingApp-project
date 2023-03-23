import React from "react";
import request from "../../utils/request";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Divider } from "antd";

import GeneralInformation from "./components/GeneralInformation";
import DetailedInformation from "./components/DetailedInformation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./index.css";

const HotelDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotelDetail, setHotelDetail] = useState({});
  const urlParams = useParams();
  useEffect(() => {
    setIsLoading(true);
    request
      .get(`/api/stay/hotel/${urlParams.hotelId}`)
      .then((result) => {
        setHotelDetail(result.data);
      })
      .catch((err) => console.error(err));
    setIsLoading(false);
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <div className="hotel-detail">
        {isLoading ? (
          <h1>
            <LoadingOutlined style={{ fontSize: "40px" }} />
          </h1>
        ) : (
          <>
            {" "}
            {/* Hotel General Information Section */}
            <Row>
              <Col span={24}>
                {" "}
                <GeneralInformation
                  hotelDetail={hotelDetail}
                  isLoading={isLoading}
                />
              </Col>
            </Row>
            {/* Divider */}
            <Row>
              <Col span={24}>
                <Divider style={{ margin: " 64px 0" }} />
              </Col>
            </Row>
            {/* Hotel Detail Infomartion Section */}
            <DetailedInformation
              hotelDetail={hotelDetail}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
      <Row>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </>
  );
};

export default HotelDetail;
