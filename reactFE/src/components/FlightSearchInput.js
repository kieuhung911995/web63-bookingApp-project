import request from "../utils/request";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCityFromValue,
  setCityToValue,
  setTripValue,
  setStartDate,
  setEndDate,
  setArrayDate,
} from "../redux/selecterSlice";

import "../styles/FlightSearchInput.css";
import { Col, DatePicker, Select, Spin } from "antd";

import PassengerClassDropDown from "./PassengerClassDropDown";

const { RangePicker } = DatePicker;

// Export Flight Search Input Component
export function FlightSearchInput() {
  const dispatch = useDispatch();
  const cityFromValue = useSelector((state) => state.selecter.cityFromValue);
  const cityToValue = useSelector((state) => state.selecter.cityToValue);
  const tripValue = useSelector((state) => state.selecter.tripValue);
  const arrayDate = useSelector((state) => state.selecter.arrayDate);

  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [countPassenger, setCountPassenger] = useState(0);
  const [open, setOpen] = useState(false);
  const [classTicket, setClassTicket] = useState("Economy");

  const increasePassenger = () => {
    setCountPassenger(countPassenger + 1);
  };
  const decreasePassenger = () => {
    if (countPassenger > 0) {
      setCountPassenger(countPassenger - 1);
    }
  };

  const selectClass = (value) => {
    setClassTicket(value);
  };

  //Xu ly event chon va xoa select
  const handleSelectCityFrom = (value) => {
    dispatch(setCityFromValue(value));
  };

  const handleSelectCityTo = (value) => {
    dispatch(setCityToValue(value));
  };

  const handleSelectTrip = (value) => {
    dispatch(setTripValue(value));
  };

  const handleSelectRangeDate = (value) => {
    dispatch(setStartDate(new Date(value?.[0]).getTime()));
    dispatch(setEndDate(new Date(value?.[1]).getTime()));
    dispatch(setArrayDate(value ? [...value] : []));
  };

  let flightOptions = [];
  useEffect(() => {
    const getDatas = async () => {
      try {
        const response = await request.get("/flight/city");
        setDatas(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, []);
  datas.map((data) => {
    return flightOptions.push({ value: data.city, label: data.city });
  });

  if (isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }
  if (!isLoading) {
    return (
      <>
        <Col span={4}>
          <div
            style={{
              position: "relative",
            }}
          >
            <span className="label-text">From</span>
            <Select
              size="large"
              style={{ width: "100%" }}
              showSearch
              placeholder="Ho Chi Minh City"
              options={flightOptions}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              allowClear={true}
              onChange={(value) => handleSelectCityFrom(value)}
              value={cityFromValue ? cityFromValue : null}
            />
          </div>
        </Col>
        <Col span={4}>
          <div style={{ position: "relative" }}>
            <span className="label-text">To</span>
            <Select
              size="large"
              style={{ width: "100%" }}
              showSearch
              placeholder="Hanoi"
              options={flightOptions}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              allowClear={true}
              onChange={(value) => handleSelectCityTo(value)}
              value={cityToValue ? cityToValue : null}
            />
          </div>
        </Col>
        <Col span={4}>
          <div style={{ position: "relative" }}>
            <span className="label-text">Trip</span>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="One-way"
              options={[
                { value: "Round-trip", label: "Round-trip" },
                { value: "One-way", label: "One-way" },
              ]}
              allowClear={true}
              onChange={(value) => handleSelectTrip(value)}
              value={tripValue ? tripValue : null}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ position: "relative" }}>
            <span className="label-text">Depart - Return</span>
            <RangePicker
              size="large"
              format="DD-MM-YYYY"
              onChange={(value) => handleSelectRangeDate(value)}
              value={arrayDate ? arrayDate : null}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ position: "relative" }}>
            <span className="label-text">Passenger - Class</span>
            <Select
              size="large"
              value={`${countPassenger} Passenger, ${classTicket}`}
              open={open}
              onDropdownVisibleChange={(visible) => setOpen(visible)}
              dropdownRender={() => (
                <PassengerClassDropDown
                  setCountPassenger={setCountPassenger}
                  countPassenger={countPassenger}
                  increasePassenger={increasePassenger}
                  decreasePassenger={decreasePassenger}
                  selectClass={selectClass}
                  setOpen={setOpen}
                />
              )}
              style={{ width: "100%" }}
            />
          </div>
        </Col>
      </>
    );
  }
}
export default FlightSearchInput;
