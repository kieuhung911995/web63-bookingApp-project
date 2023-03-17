import React from "react";
import { Row, Col, Button, Typography, Rate, Breadcrumb, Anchor } from "antd";

import {
  HeartOutlined,
  EnvironmentFilled,
  ShareAltOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Link } = Anchor;

const GeneralInformation = ({ hotelDetail, isLoading }) => {
  console.log(hotelDetail.roomInfo);
  return (
    <>
      {" "}
      {isLoading ? (
        <>
          {" "}
          <h1>
            <LoadingOutlined style={{ fontSize: "40px" }} />
          </h1>
        </>
      ) : (
        <>
          <Row gutter={[0, 32]}>
            {/* Breadcrumb Part */}
            <Col span={24}>
              <Breadcrumb separator=">">
                <Breadcrumb.Item className="montserrat-regular-slamon">
                  {hotelDetail.destination}
                </Breadcrumb.Item>
                <Breadcrumb.Item className="montserrat-regular">
                  {hotelDetail.hotelName}
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>

            {/* General Information Part */}
            <Col className="flex-space-between" span={24}>
              {/* Hotel Name and Address */}
              <Row
                gutter={[0, 16]}
                justify="space-between"
                style={{
                  flexDirection: "column",
                }}
              >
                <Col
                  className="flex-space-between"
                  style={{
                    gap: "16px",
                  }}
                >
                  <Text className="trade-gothic-bold">
                    {hotelDetail.hotelName}
                  </Text>
                  <div>
                    <Rate
                      style={{ fontSize: "16px", color: "#ff8682" }}
                      disabled
                      defaultValue={5}
                    />
                    &nbsp;
                    <Text className="montserrat-regular-12px">
                      {hotelDetail.star} Star Hotel
                    </Text>
                  </div>
                </Col>

                <Col
                  className="flex-column-space-between"
                  style={{
                    gap: "8px",
                  }}
                >
                  <Text
                    className="montserrat-regular-12px"
                    style={{ opacity: "0.75" }}
                  >
                    <EnvironmentFilled />
                    &nbsp; {hotelDetail.address}
                  </Text>
                  <div
                    className="flex-align-center"
                    style={{
                      gap: "4px",
                    }}
                  >
                    {" "}
                    <Button className="small-button">
                      <Text className="montserrat-regular-12px">4.2</Text>
                    </Button>
                    <Text className="montserrat-bold-12px">Very Good</Text>
                    <Text className="montserrat-regular-12px">371 reviews</Text>
                  </div>
                </Col>
              </Row>

              {/* Price and Button */}
              <Row gutter={[0, 16]} style={{ width: "276px" }}>
                <Col span={24}>
                  <Text
                    className="montserrat-bold-slamon"
                    style={{
                      fontSize: "32px",
                      display: "block",
                      textAlign: "right",
                      lineHeight: "40px",
                    }}
                  >
                    {hotelDetail.roomInfo === undefined ? (
                      <h1>
                        <LoadingOutlined style={{ fontSize: "40px" }} />
                      </h1>
                    ) : (
                      <>${hotelDetail.roomInfo[0].basePrice}</>
                    )}

                    <Text className="montserrat-bold-slamon">/night</Text>
                  </Text>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "15px",
                  }}
                  span={24}
                >
                  <Button className="button-for-icons">
                    <HeartOutlined style={{ fontSize: "20px" }} />
                  </Button>
                  <Button className="button-for-icons">
                    <ShareAltOutlined style={{ fontSize: "20px" }} />
                  </Button>
                  <Button
                    className="button-background-filled"
                    style={{ width: "150px" }}
                  >
                    <Anchor affix={false} targetOffset={87}>
                      {" "}
                      <Link
                        href="#available-rooms"
                        title={
                          <>
                            <Text className="montserrat-semibold">
                              {" "}
                              Book now
                            </Text>
                          </>
                        }
                      />
                    </Anchor>
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* Image Part */}
            <Col
              style={{
                borderRadius: "16px",
                display: "flex",
                gap: "4px",
              }}
              span={24}
            >
              {hotelDetail.images === undefined ? (
                <h1>
                  <LoadingOutlined style={{ fontSize: "40px" }} />
                </h1>
              ) : (
                <>
                  <Row>
                    <Col span={12}>
                      <img
                        src={hotelDetail.images[0].imageSrc}
                        alt="istanbul6"
                        style={{
                          display: "block",
                        }}
                      />
                    </Col>
                    <Col
                      span={12}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "4px",
                        position: "relative",
                      }}
                    >
                      {" "}
                      {hotelDetail.images.slice(1, 5).map((element) => {
                        return (
                          <img
                            src={element.imageSrc}
                            alt="hotel-image"
                            style={{
                              height: "178px",
                              width: "280px",
                            }}
                          />
                        );
                      })}
                      <Button
                        className="big-button-background-filled"
                        style={{
                          position: "absolute",
                          right: "16px",
                          bottom: "16px",
                        }}
                      >
                        <Text className="montserrat-semibold">
                          View all photos
                        </Text>
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default GeneralInformation;
