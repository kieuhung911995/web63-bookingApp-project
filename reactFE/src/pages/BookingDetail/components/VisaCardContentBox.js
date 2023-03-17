import React from "react";
import { Typography, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import visaImage from "../../../assets/images/Visa.png";

const { Text } = Typography;

export default function VisaCardContentBox({ handleLogOut, showPopup }) {
  return (
    <>
      <div
        className="flex-column content-border-box"
        style={{
          gap: "16px",
        }}
      >
        <div className="content-green-background-box flex-space-between-align-center">
          <label
            className="flex-align-center"
            htmlFor="visa-1"
            style={{ gap: "32px" }}
          >
            <img alt="visa" src={visaImage} />
            <div>
              <Text className="trade-gothic-lt-extended-bold-16px">
                **** 4321
              </Text>
              &nbsp;
              <Text className="montserrat-regular">02/27</Text>
            </div>
          </label>
          <input
            type="radio"
            name="visaSelect"
            value="visaNumber"
            id="visa-1"
            style={{ minHeight: "24px", minWidth: "24px" }}
          />
        </div>
        <div className="add-card-border">
          <PlusCircleOutlined
            onClick={showPopup}
            style={{ fontSize: "48px", color: "#8DD3BB" }}
          />
          <Text className="montserrat-medium-12px">Add new Card</Text>
          <Button onClick={handleLogOut}>Log Out</Button>
        </div>
      </div>
    </>
  );
}
