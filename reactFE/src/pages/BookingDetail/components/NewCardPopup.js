import React from "react";

import { Typography, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

export default function NewCardPopup({ cancelPopup }) {
  return (
    <>
      {" "}
      <div className="pop-up-box">
        <div className="pop-up-border">
          <CloseOutlined
            onClick={cancelPopup}
            style={{ textAlign: "right", display: "block" }}
          />

          <div className="flex-column" style={{ gap: "48px" }}>
            <Text className="trade-gothic-lt-extended-bold-40px">
              Add a new card
            </Text>

            <form className="flex-column" style={{ gap: "24px" }}>
              {/* Card Number */}
              <div style={{ position: "relative", width: "100%" }}>
                <label className="input-label-position">Card Number</label>
                <input
                  className="input-border"
                  type="text"
                  placeholder="Card Number"
                />
              </div>

              {/* Exp.Date */}
              <div style={{ display: "flex", gap: "24px" }}>
                <div style={{ position: "relative", width: "50%" }}>
                  <label className="input-label-position">Exp.Date</label>{" "}
                  <input
                    className="input-border"
                    type="text"
                    placeholder="Exp.Date"
                  />
                </div>

                {/* CVC */}
                <div style={{ position: "relative", width: "50%" }}>
                  <label className="input-label-position">CVC</label>{" "}
                  <input
                    className="input-border"
                    type="text"
                    placeholder="CVC"
                  />
                </div>
              </div>

              {/* Name on Card */}
              <div style={{ position: "relative" }}>
                <label className="input-label-position">Name on Card</label>{" "}
                <input
                  className="input-border"
                  type="text"
                  placeholder="Name on Card"
                />
              </div>

              {/* Country of Region */}
              <div style={{ position: "relative" }}>
                <label className="input-label-position">
                  Country or Region
                </label>{" "}
                <input
                  className="input-border"
                  type="select"
                  placeholder="Country or Region"
                />
              </div>

              <div className="flex-align-center">
                {" "}
                <input type="checkbox" />
                <Text className="montserrat-medium">
                  Securely save my information for 1-click checkout
                </Text>
              </div>

              <Button
                className="big-button-background-filled"
                style={{ width: "100%" }}
              >
                <Text className="montserrat-semibold">Add Card</Text>
              </Button>
            </form>
            {/* End Form */}

            <Paragraph
              className="montserrat-regular-12px"
              style={{ opacity: "0.75", textAlign: "center" }}
            >
              By confirming your subscription, you allow The Outdoor Inn Crowd
              Limited to charge your card for this payment and future payments
              in accordance with their terms. You can always cancel your
              subscription.
            </Paragraph>
          </div>
        </div>
      </div>
    </>
  );
}
