import React from "react";
import { Tabs, Row, Col } from "antd";

import StaySearch from "./StaySearch";
import FlightSearch from "./FlightSearch";

import "./index.css";
import { BedIcon, PlaneIcon } from "../../assets/icon-components/IconComponent";

const SearchTab = ({ params, setParams }) => {
  const items = [
    {
      key: "1",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <PlaneIcon />
          &nbsp;
          <div>Flights</div>
        </div>
      ),
      children: <FlightSearch />,
    },
    {
      key: "2",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <BedIcon />
          &nbsp; Stays
        </div>
      ),
      children: <StaySearch params={params} setParams={setParams} />,
    },
  ];
  return (
    <div className="search-tab">
      <Row justify="center">
        <Col span={24} className="search-container">
          <Tabs defaultActiveKey="2" items={items} />
        </Col>
      </Row>
    </div>
  );
};

export default SearchTab;
