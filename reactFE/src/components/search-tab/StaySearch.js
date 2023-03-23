import React from "react";
import request from "../../utils/request";
import { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Row, Col, DatePicker, Select, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { BuildingIcon } from "../../assets/icon-components/IconComponent";

const { RangePicker } = DatePicker;

const StaySearch = ({ params, setParams }) => {
  const [countRoom, setCountRoom] = useState(0);
  const [countGuest, setCountGuest] = useState(0);
  const [destination, setDestination] = useState("");
  const [bookDate, setBookDate] = useState([]);
  const navigate = useNavigate();

  // Listing Destination Options in Search Bar
  const [destinationOptions, setDestinationOptions] = useState([]);
  useEffect(() => {
    request
      .get("/api/stay/destination")
      .then((result) => {
        setDestinationOptions(
          result.data.map((element) => {
            return { value: element.name, label: element.name };
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const getRoomNumber = (value) => {
    setCountRoom(value);
    setParams({ ...params, countRoom: value });
  };

  const getGuestNumber = (value) => {
    setCountGuest(value);
    setParams({ ...params, countGuest: value });
  };

  const selectDate = (date, dateString) => {
    setParams({
      ...params,
      checkIn: dateString[0],
      checkOut: dateString[1],
    });
    // setBookDate(...bookDate, dateString);
  };
  const selectDestination = (value) => {
    setParams({ ...params, destination: value });
    // setDestination(value);
  };

  const handleSearch = () => {
    navigate({
      pathname: "/hotel-listing",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="stay-search tab-items">
      <Row gutter={[16, 24]}>
        <Col span={10}>
          <div
            style={{
              position: "relative",
            }}
          >
            <span className="label-text">Enter Destination</span>
            <Select
              onSelect={selectDestination}
              size="large"
              style={{ width: "100%" }}
              showSearch
              placeholder={"Hanoi"}
              options={destinationOptions}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>
        </Col>
        <Col span={8}>
          {" "}
          <div style={{ position: "relative" }}>
            <span className="label-text">Check in - Check out</span>
            <RangePicker
              style={{ width: "100%" }}
              size="large"
              onChange={selectDate}
            />
          </div>
        </Col>
        <Col span={3}>
          <div style={{ position: "relative" }}>
            <span className="label-text">Rooms</span>
            <InputNumber
              value={countRoom}
              min={0}
              defaultValue={countRoom}
              size="large"
              style={{ width: "100%" }}
              onChange={getRoomNumber}
              onStep={getRoomNumber}
            />
          </div>
        </Col>
        <Col span={3}>
          <div style={{ position: "relative" }}>
            <span className="label-text">Guest</span>
            <InputNumber
              value={countGuest}
              min={countRoom}
              defaultValue={countGuest}
              size="large"
              style={{ width: "100%" }}
              onChange={getGuestNumber}
              onStep={getGuestNumber}
            />
          </div>
        </Col>

        <Col span={3} offset={21}>
          <div className="show-result-button-container">
            <Button onClick={handleSearch} className="large-button">
              <BuildingIcon />
              &nbsp; Show Places
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StaySearch;
