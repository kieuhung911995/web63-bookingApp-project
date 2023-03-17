import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Row, Col, Typography, Divider, Breadcrumb, Button } from "antd";
import { EnvironmentFilled, LineOutlined } from "@ant-design/icons";

import { BuildingIcon } from "../../assets/icon-components/IconComponent";

import hotelIstanbul6 from "../../assets/images/hotel-istanbul-6.png";
import hotelLogo from "../../assets/images/hotel-logo.png";

import LoginContentBox from "./components/LoginContentBox";
import NewCardPopup from "./components/NewCardPopup";
import VisaCardContentBox from "./components/VisaCardContentBox";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./index.css";

const { Text } = Typography;

const BookingDetail = () => {
  const [radioSelected, setRadioSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popupShow, setPopupShow] = useState(false);

  const cancelPopup = () => {
    setPopupShow(false);
  };

  const showPopup = () => {
    setPopupShow(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogOut = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const changeInputStyle = (event) => {
    console.log(event.target.value);
    setRadioSelected(event.target.id);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <div className="booking-detail">
        <Breadcrumb separator=">" style={{ padding: "24px" }}>
          <Breadcrumb.Item className="montserrat-regular-slamon">
            Turkey
          </Breadcrumb.Item>
          <Breadcrumb.Item className="montserrat-regular-slamon">
            Istanbul
          </Breadcrumb.Item>
          <Breadcrumb.Item className="montserrat-regular">
            Hotel Name
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={40} style={{ marginTop: "32px" }}>
          {/* Left Content */}
          <Col>
            <div
              className="flex-column"
              style={{ width: "650px", gap: "40px" }}
            >
              {/* Booking Information */}
              <div
                className="flex-column content-border-box"
                style={{
                  gap: "32px",
                }}
              >
                <div
                  className="flex-space-between-align-center"
                  style={{ gap: "124px" }}
                >
                  <Text
                    style={{ width: "370px" }}
                    className="trade-gothic-lt-extended-bold-24px"
                  >
                    Superior room - 1 double bed or 2 twin beds
                  </Text>
                  <Text
                    className="montserrat-bold-slamon"
                    style={{ fontSize: "32px" }}
                  >
                    $240<Text className="montserrat-bold-slamon">/night</Text>
                  </Text>
                </div>

                <div
                  className="content-green-border-box flex-align-center "
                  style={{ gap: "24px" }}
                >
                  <img alt="hotel-logo" src={hotelLogo} />
                  <div className="flex-column" style={{ gap: "8px" }}>
                    <Text className="montserrat-semibold-24px">
                      CVK Park Bosphorus Hotel Istanbul
                    </Text>{" "}
                    <Text
                      className="montserrat-medium"
                      style={{ opacity: "0.75" }}
                    >
                      <EnvironmentFilled />
                      &nbsp; Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                    </Text>
                  </div>
                </div>

                <div className="flex-space-between-align-center">
                  <div className="flex-column" style={{ gap: "8px" }}>
                    <Text className="montserrat-semibold-20px">
                      Thurday, Dec 8
                    </Text>
                    <Text
                      className="montserrat-medium"
                      style={{ opacity: "0.6" }}
                    >
                      Check-In
                    </Text>
                  </div>
                  <div className="flex-align-center">
                    <LineOutlined style={{ fontSize: "36px" }} />
                    <BuildingIcon />

                    <LineOutlined style={{ fontSize: "36px" }} />
                  </div>
                  <div className="flex-column" style={{ gap: "8px" }}>
                    <Text className="montserrat-semibold-20px">
                      Friday, Dec 9
                    </Text>
                    <Text
                      className="montserrat-medium"
                      style={{ opacity: "0.6" }}
                    >
                      Check-Out
                    </Text>
                  </div>
                </div>
              </div>

              {/* Pay Option */}
              <div
                className="flex-column content-border-box"
                style={{
                  gap: "16px",
                }}
              >
                <div
                  className={
                    radioSelected !== "payfull"
                      ? "flex-space-between-align-center"
                      : "content-green-background-box flex-space-between-align-center"
                  }
                  style={{ gap: "64px", padding: "16px" }}
                >
                  <label
                    className="flex-column"
                    style={{ gap: "8px" }}
                    htmlFor="payfull"
                  >
                    <span className="trade-gothic-lt-extended-bold-16px">
                      Pay in full
                    </span>
                    <span className="montserrat-regular">
                      Pay the total and you are all set
                    </span>
                  </label>

                  <input
                    onChange={changeInputStyle}
                    type="radio"
                    id="payfull"
                    value={true}
                    name="radioSelected"
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>

                <div
                  className={
                    radioSelected !== "payhalf"
                      ? "flex-space-between-align-center"
                      : "content-green-background-box flex-space-between-align-center"
                  }
                  style={{ gap: "64px", padding: "16px" }}
                >
                  <label
                    className="flex-column"
                    style={{ gap: "8px" }}
                    htmlFor="payhalf"
                  >
                    <span className="trade-gothic-lt-extended-bold-16px">
                      Pay in half
                    </span>
                    <span className="montserrat-regular">
                      Pay $207.43 now, and the rest ($207.43) will be
                      automatically charged to the same payment method on Nov
                      14, 2022. No extra fees.
                    </span>
                  </label>

                  <input
                    onChange={changeInputStyle}
                    type="radio"
                    id="payhalf"
                    value={false}
                    name="radioSelected"
                    style={{ minHeight: "24px", minWidth: "24px" }}
                  />
                </div>
              </div>

              {!isLoggedIn ? (
                <LoginContentBox handleLogin={handleLogin} />
              ) : (
                <VisaCardContentBox
                  handleLogOut={handleLogOut}
                  showPopup={showPopup}
                />
              )}
            </div>
          </Col>

          {/* Right Content */}
          <Col className="flex-column" style={{ gap: "32px" }}>
            <div
              className="content-border-box flex-column"
              style={{ width: "450px", gap: "16px" }}
            >
              {/* Hotel Name, Image, Room Name */}
              <div style={{ display: "flex", gap: "16px" }}>
                <img
                  style={{
                    display: "block",
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                  }}
                  alt="hotel-istanbul-6"
                  src={hotelIstanbul6}
                />
                <div className="flex-column-space-between">
                  <div>
                    <Text className="montserrat-medium">
                      CVK Park Bosphorus Hotel Istanbul
                    </Text>
                    <br />
                    <Text className="montserrat-semibold-20px">
                      Superior room - 1 double bed or 2 twin beds
                    </Text>
                  </div>
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
                </div>
              </div>

              <Divider style={{ margin: "0" }} />

              <Text className="montserrat-medium-16px">
                Your booking is protected by <b>golobe</b>
              </Text>

              <Divider style={{ margin: "0" }} />

              {/* Booking Price */}
              <div className="flex-column" style={{ gap: "16px" }}>
                <Text className="trade-gothic-lt-extended-bold-16px">
                  Price Details
                </Text>
                <div className="flex-space-between">
                  <Text className="montserrat-medium-16px">Base Fare</Text>
                  <Text className="montserrat-semibold-16px">$240</Text>
                </div>
                <div className="flex-space-between">
                  <Text className="montserrat-medium-16px">Discount</Text>
                  <Text className="montserrat-semibold-16px">$0</Text>
                </div>
                <div className="flex-space-between">
                  <Text className="montserrat-medium-16px">Taxes</Text>
                  <Text className="montserrat-semibold-16px">$20</Text>
                </div>
                <div className="flex-space-between">
                  <Text className="montserrat-medium-16px">Service Fee</Text>
                  <Text className="montserrat-semibold-16px">$5</Text>
                </div>
              </div>

              <Divider style={{ margin: "0" }} />

              {/* Total Price */}
              <div className="flex-space-between">
                <Text className="montserrat-medium-16px">Total</Text>
                <Text className="montserrat-semibold-16px">$265</Text>
              </div>
            </div>
            <Link to="/booking-complete">
              <Button
                className="big-button-background-filled"
                style={{ width: "100%" }}
              >
                <Text className="montserrat-medium-16px">Book Now</Text>
              </Button>
            </Link>
          </Col>
        </Row>
      </div>

      {!popupShow ? null : <NewCardPopup cancelPopup={cancelPopup} />}
      <Row>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </>
  );
};

export default BookingDetail;
