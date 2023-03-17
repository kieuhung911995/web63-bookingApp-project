import React from "react";
import { Breadcrumb, Row, Col, Button, Typography, Avatar } from "antd";
import {
  ShareAltOutlined,
  EnvironmentFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import {
  BuildingIcon,
  DoorIcon,
  VectorDown,
  VectorUp,
} from "../../../assets/icon-components/IconComponent";

import userAvatar1 from "../../../assets/images/user-avatar-1.png";
import hotelLogoBigSize from "../../../assets/images/hotel-logo-big-size.png";
import barCode from "../../../assets/images/bar-code.png";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const { Text } = Typography;

const BookingComplete = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <div className="booking-complete">
        <Row style={{ flexDirection: "column" }} gutter={[0, 32]}>
          <Col span={24}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item className="montserrat-medium">
                Turkey
              </Breadcrumb.Item>
              <Breadcrumb.Item className="montserrat-medium">
                Istanbul
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="mmontserrat-medium"
                style={{ opacity: "0.5" }}
              >
                Hotel Name
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>

          <Col span={24} className="flex-space-between-align-center">
            {" "}
            <div className="flex-column" style={{ gap: "8px" }}>
              <Text className="montserrat-semibold-24px">
                CVK Park Bosphorus Hotel Istanbul
              </Text>{" "}
              <Text className="montserrat-medium" style={{ opacity: "0.75" }}>
                <EnvironmentFilled />
                &nbsp; Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
              </Text>
            </div>
            <div className="flex-column" style={{ gap: "16px" }}>
              <Text
                className="montserrat-bold-24px-slamon"
                style={{ textAlign: "right" }}
              >
                $265
              </Text>
              <div style={{ display: "flex", gap: "15px" }}>
                <Button className="button-for-icons">
                  <ShareAltOutlined style={{ fontSize: "20px" }} />
                </Button>
                <Button
                  className="button-background-filled"
                  style={{ width: "150px" }}
                >
                  <Text className="montserrat-semibold">Download</Text>
                </Button>
              </div>
            </div>
          </Col>

          <Col span={24} className="flex-column" style={{ gap: "64px" }}>
            {/* Ticket Part */}
            <div style={{ display: "flex" }}>
              {/* Ticket Information */}
              <div style={{ display: "flex" }}>
                {/* Check-In Check-Out */}
                <div
                  className="flex-column"
                  style={{
                    gap: "16px",
                    background: "#EBF6F2",
                    padding: "24px",
                    borderRadius: "16px 0 0 16px",
                    width: "246px",
                  }}
                >
                  <Text className="montserrat-semibold-32px flex-column">
                    Thur, Dec 8
                    <Text
                      className="montserrat-medium-12px"
                      style={{ opacity: "0.6" }}
                    >
                      Check-In
                    </Text>
                  </Text>
                  <div className="flex-column">
                    <VectorUp className="vector-style" />
                    <BuildingIcon />
                    <VectorDown className="vector-style" />
                  </div>
                  <Text className="montserrat-semibold-32px flex-column">
                    Fri, Dec 9
                    <Text
                      className="montserrat-medium-12px"
                      style={{ opacity: "0.6" }}
                    >
                      Check-Out
                    </Text>
                  </Text>
                </div>

                {/* Main Ticket */}
                <div
                  className="flex-column"
                  style={{
                    width: "610px",
                    position: "relative",
                    borderRadius: "0 16px 16px 0",
                    border: "1px solid #EAEAEA",
                  }}
                >
                  {/* Avatar - Name - Room Name */}
                  <Row
                    style={{
                      background: "#8DD3BB",
                      padding: "24px",
                      borderRadius: "0 16px 0 0",
                    }}
                  >
                    <Col
                      span={14}
                      className="flex-align-center"
                      style={{ gap: "16px" }}
                    >
                      <Avatar
                        style={{ border: "1px solid white" }}
                        size={45}
                        src={<img alt="avatar" src={userAvatar1} />}
                      />{" "}
                      <Text className="trade-gothic-lt-extended-bold-20px">
                        James Doe
                      </Text>
                    </Col>
                    <Col span={10} className="flex-align-center">
                      <Text
                        className="trade-gothic-lt-extended-bold"
                        style={{ display: "block", textAlign: "right" }}
                      >
                        Superior room - 1 double bed or 2 twin beds
                      </Text>
                    </Col>
                  </Row>

                  {/* Check In - Check Out Time */}
                  <div
                    className="flex-align-center"
                    style={{
                      padding: "24px",
                      gap: "32px",
                    }}
                  >
                    <div className="flex-align-center" style={{ gap: "8px" }}>
                      <ClockCircleFilled
                        className="small-button-for-icons"
                        style={{ color: "#8DD3BB" }}
                      />
                      <div className="flex-column">
                        <Text
                          className="montserrat-semibold-12px"
                          style={{ opacity: "0.6" }}
                        >
                          Check-In time
                        </Text>
                        <Text className="montserrat-medium-16px">12:00pm</Text>
                      </div>
                    </div>
                    <div className="flex-align-center" style={{ gap: "8px" }}>
                      <ClockCircleFilled
                        className="small-button-for-icons"
                        style={{ color: "#8DD3BB" }}
                      />
                      <div className="flex-column">
                        <Text
                          className="montserrat-semibold-12px"
                          style={{ opacity: "0.6" }}
                        >
                          Check-Out time
                        </Text>
                        <Text className="montserrat-medium-16px">11:30pm</Text>
                      </div>
                    </div>
                    <div className="flex-align-center" style={{ gap: "8px" }}>
                      <DoorIcon />
                      <div className="flex-column">
                        <Text
                          className="montserrat-semibold-12px"
                          style={{ opacity: "0.6" }}
                        >
                          Room no.
                        </Text>
                        <Text className="montserrat-medium-16px">
                          On arival
                        </Text>
                      </div>
                    </div>
                  </div>

                  {/* Code  */}
                  <div
                    style={{
                      marginTop: "auto",
                      alignSelf: "end",
                    }}
                  >
                    <div
                      className="flex-column"
                      style={{
                        position: "absolute",
                        bottom: "34px",
                        left: "30px",
                      }}
                    >
                      {" "}
                      <Text className="montserrat-semibold-32px">EK</Text>
                      <Text
                        className="montserrat-medium-12px"
                        style={{ opacity: "0.6" }}
                      >
                        {" "}
                        ABC12345
                      </Text>
                    </div>

                    <img alt="bar-code" src={barCode} />
                  </div>
                </div>
              </div>

              <div className="logo-border-box" style={{ width: "375px" }}>
                <img alt="hotel-logo" src={hotelLogoBigSize} />
              </div>
            </div>

            {/* Term and Condition */}
            <div className="flex-column" style={{ gap: "32px" }}>
              <Text className="montserrat-semibold-24px">
                Terms and Conditions
              </Text>
              <div>
                <Text className="montserrat-medium-20px">Payments</Text>
                <ul>
                  <li>
                    If you are purchasing your ticket using a debit or credit
                    card via the Website, we will process these payments via the
                    automated secure common payment gateway which will be
                    subject to fraud screening purposes.{" "}
                  </li>
                  <li>
                    If you do not supply the correct card billing address and/or
                    cardholder information, your booking will not be confirmed
                    and the overall cost may increase. We reserve the right to
                    cancel your booking if payment is declined for any reason or
                    if you have supplied incorrect card information. If we
                    become aware of, or is notified of, any fraud or illegal
                    activity associated with the payment for the booking, the
                    booking will be cancelled and you will be liable for all
                    costs and expenses arising from such cancellation, without
                    prejudice to any action that may be taken against us.
                  </li>
                  <li>
                    Golobe may require the card holder to provide additional
                    payment verification upon request by either submitting an
                    online form or visiting the nearest Golobe office, or at the
                    airport at the time of check-in. Golobe reserves the right
                    to deny boarding or to collect a guarantee payment (in cash
                    or from another credit card) if the card originally used for
                    the purchase cannot be presented by the cardholder at
                    check-in or when collecting the tickets, or in the case the
                    original payment has been withheld or disputed by the card
                    issuing bank. Credit card details are held in a secured
                    environment and transferred through an internationally
                    accepted system.
                  </li>
                </ul>
              </div>
              <div className="flex-column">
                <Text className="montserrat-medium-20px">Contact Us</Text>
                <ul>
                  <li>
                    If you have any questions about our Website or our Terms of
                    Use, please contact:
                  </li>
                  <li>Golobe Group Q.C.S.C</li>
                  <li>Golobe Tower</li>
                  <li>P.O. Box: 22550</li>
                  <li>Doha, State of Qatar</li>
                  <li>
                    Further contact details can be found at{" "}
                    <a href="google.com" target="_blank">
                      golobe.com/help
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </>
  );
};

export default BookingComplete;
