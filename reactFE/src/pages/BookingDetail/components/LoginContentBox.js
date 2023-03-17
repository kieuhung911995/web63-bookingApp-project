import React from "react";
import { Link } from "react-router-dom";
import { Typography, Divider, Input, Button } from "antd";
import { MailFilled } from "@ant-design/icons";

import {
  FacebookIcon,
  GoogleIcon,
  AppleIcon,
} from "../../../assets/icon-components/IconComponent";

const { Text } = Typography;

export default function LoginContentBox({ handleLogin }) {
  return (
    <>
      <div
        className="flex-column content-border-box"
        style={{
          gap: "24px",
        }}
      >
        <div className="flex-column" style={{ gap: "16px" }}>
          <Text className="trade-gothic-lt-extended-bold-20px">
            Login or Sign up to book
          </Text>
          <Input size="large" placeholder="Phone Number" />
          <Text className="montserrat-regular">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. <Link to="">Privacy Policy</Link>
          </Text>
          <Button
            onClick={handleLogin}
            className="button-background-filled"
            style={{ with: "100%" }}
          >
            <Text className="montserrat-medium-16px">Continue</Text>
          </Button>
        </div>
        <Divider className="montserrat-medium-16px" style={{ margin: "0" }}>
          Or
        </Divider>
        <div className="flex-column" style={{ gap: "16px" }}>
          <div className="flex-space-between" style={{ gap: "16px" }}>
            <Button
              className="big-button-for-icons"
              style={{ width: "calc(100%/3)" }}
            >
              <FacebookIcon />
            </Button>
            <Button
              className="big-button-for-icons"
              style={{ width: "calc(100%/3)" }}
            >
              <GoogleIcon />
            </Button>
            <Button
              className="big-button-for-icons"
              style={{ width: "calc(100%/3)" }}
            >
              <AppleIcon />
            </Button>
          </div>
          <Button
            className="big-button-green-border flex-align-center"
            style={{ justifyContent: "center" }}
          >
            <MailFilled style={{ fontSize: "24px" }} />
            <Text className="montserrat-medium-16px">Continue with email</Text>
          </Button>
        </div>
      </div>
    </>
  );
}
