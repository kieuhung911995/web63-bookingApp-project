import { useState, useEffect } from "react";
import request from "../utils/request";
import { Spin } from "antd";

import { Slider, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setPriceMin,
  setPriceMax,
  setDepartureTimeMin,
  setDepartureTimeMax,
  setRate,
  setAirline,
} from "../redux/filterSlice";

import "../styles/FlightFilter.css";

const FlightFilter = () => {
  const dispatch = useDispatch();

  const airline = useSelector((state) => state.filter.airline);

  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const response = await request.get("/flight/airline");
        setDatas(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, []);

  const marksPrice = {
    40: "$40",
    200: "$200",
  };
  const marksDeparture = {
    0: "0h",
    23: "23h",
  };

  //filter slider
  const handleFilterPrice = (value) => {
    dispatch(setPriceMin(value[0]));
    dispatch(setPriceMax(value[1]));
  };
  const handleFilterDeparture = (value) => {
    dispatch(setDepartureTimeMin(value[0]));
    dispatch(setDepartureTimeMax(value[1]));
  };
  //filter rating
  const handleRating = (e) => {
    if (e.target.innerText === "0+") {
      dispatch(setRate(0));
    }
    if (e.target.innerText === "1+") {
      dispatch(setRate(1));
    }
    if (e.target.innerText === "2+") {
      dispatch(setRate(2));
    }
    if (e.target.innerText === "3+") {
      dispatch(setRate(3));
    }
    if (e.target.innerText === "4+") {
      dispatch(setRate(4));
    }
  };

  const onChange = (e) => {
    if (e.target.checked) {
      dispatch(setAirline([...airline, e.target.value]));
    }
    if (!e.target.checked) {
      const airlineArray = [...airline];
      const indexRemove = airlineArray.findIndex(
        (value) => value === e.target.value
      );
      airlineArray.splice(indexRemove, 1);
      dispatch(setAirline([...airlineArray]));
    }
  };
  return (
    <div className="FlightFilter">
      <h1>Filters</h1>
      <div>
        <h4>Price</h4>
        <Slider
          range
          marks={marksPrice}
          defaultValue={[40, 200]}
          min={40}
          max={200}
          onAfterChange={(value) => handleFilterPrice(value)}
        />
        <div className="line"></div>
      </div>
      <div>
        <h4>Departure Time</h4>
        <Slider
          range
          marks={marksDeparture}
          defaultValue={[0, 23]}
          min={0}
          max={23}
          onAfterChange={(value) => handleFilterDeparture(value)}
        />
        <div className="line"></div>
      </div>
      <div>
        <h4>Rating</h4>
        <div className="rating-block">
          <div className="rating-block-item" onClick={(e) => handleRating(e)}>
            <>0+</>
          </div>
          <div className="rating-block-item" onClick={(e) => handleRating(e)}>
            <>1+</>
          </div>
          <div className="rating-block-item" onClick={(e) => handleRating(e)}>
            <>2+</>
          </div>
          <div className="rating-block-item" onClick={(e) => handleRating(e)}>
            <>3+</>
          </div>
          <div className="rating-block-item" onClick={(e) => handleRating(e)}>
            <>4+</>
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div>
        <h4>Airlines</h4>
        {isLoading ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : (
          <div className="checkbox-container">
            {datas.map((data, index) => {
              return (
                <div className="checkbox-item" key={index}>
                  <Checkbox onChange={onChange} value={data.airline}>
                    {data.airline}
                  </Checkbox>
                </div>
              );
            })}
          </div>
        )}
        <div className="line"></div>
      </div>
    </div>
  );
};
export default FlightFilter;
