import { Checkbox, Spin, Pagination } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearch } from "../redux/selecterSlice";
import request from "../utils/request";

import "../styles/FlightListTicket.css";

import TicketDropdown from "../components/TicketDropdown";

const FlightListTicket = () => {
  //lay state tu redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sortItem = useSelector((state) => state.sorter.sortItem);
  const cityFromValue = useSelector((state) => state.selecter.cityFromValue);
  const cityToValue = useSelector((state) => state.selecter.cityToValue);
  const tripValue = useSelector((state) => state.selecter.tripValue);
  const startDate = useSelector((state) => state.selecter.startDate);
  const endDate = useSelector((state) => state.selecter.endDate);
  const isSearch = useSelector((state) => state.selecter.isSearch);
  const priceMin = useSelector((state) => state.filter.priceMin);
  const priceMax = useSelector((state) => state.filter.priceMax);
  const departureTimeMin = useSelector(
    (state) => state.filter.departureTimeMin
  );
  const departureTimeMax = useSelector(
    (state) => state.filter.departureTimeMax
  );
  const rate = useSelector((state) => state.filter.rate);
  const airline = useSelector((state) => state.filter.airline);

  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);

  const params = {
    limit: limit,
    skip: skip,
    sort: sortItem,
    cityFrom: cityFromValue,
    cityTo: cityToValue,
    trip: tripValue,
    startDate: startDate,
    endDate: endDate,
    priceMin: priceMin,
    priceMax: priceMax,
    departureTimeMin: departureTimeMin,
    departureTimeMax: departureTimeMax,
    rate: rate,
    airline: airline.join(","), //thay doi
  };

  const handleChangePage = (page, pageSize) => {
    setLimit(pageSize);
    setSkip((page - 1) * pageSize);
  };
  const onChange = (e) => {
    // console.log(`checked = ${e.target.checked}`);
  };

  //navigate to flight detail
  const handleNavigateDetail = (flightId) => {
    navigate(`/flight/${flightId}`);
  };
  useEffect(() => {
    const getDatas = async () => {
      try {
        dispatch(setIsSearch(false)); //dat len dau de neu call api loi van set lai isSearch
        const response = await request.get("/flight", {
          params: params,
        });
        setTotal(response.data[0].metadata[0]?.total);
        setDatas(response.data[0].data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, [
    limit,
    skip,
    sortItem,
    isSearch,
    priceMin,
    priceMax,
    departureTimeMin,
    departureTimeMax,
    rate,
    airline,
  ]);

  if (isLoading) {
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>;
  }

  if (!isLoading) {
    return (
      <>
        <div className="header-flightList">
          <h4>Showing {total} places</h4>
          <div className="dropdown-flightList">
            <span style={{ marginRight: "5px" }}>Sort by</span>
            <TicketDropdown />
          </div>
        </div>
        <div className="FlightListTicket">
          {datas.map((data, index) => (
            <div key={index} className="ticketComponent">
              <img
                src={data.logo}
                alt="logo"
                className="ticketComponent-logo"
              ></img>
              <div className="ticket-detail">
                <div className="ticket-detail-header">
                  <div className="ticket-detail-header-left">
                    <span className="ticket-detail-header-rating">
                      <>{data.rating}</>
                    </span>
                    <span>{data.commend}</span>
                    <span>{data.review} reviews</span>
                  </div>
                  <div>
                    <div style={{ color: "gray" }}>starting from</div>
                    <div style={{ color: "#FF8682", fontSize: "24px" }}>
                      ${data.price}
                    </div>
                  </div>
                </div>
                <div className="ticket-detail-main">
                  <Checkbox onChange={onChange}></Checkbox>
                  <div>
                    <h3 style={{ margin: "0px 0px 5px" }}>
                      {dayjs(data.local_departure).format("HH:mm:ss")}
                    </h3>
                    <div style={{ color: "gray" }}>{data.flyFrom}</div>
                  </div>
                  <div style={{ margin: "0 40px" }}>{data.type}</div>
                  <div>
                    <h3 style={{ margin: "0px 0px 5px" }}>
                      {dayjs(data.local_arrival).format("HH:mm:ss")}
                    </h3>
                    <div style={{ color: "gray" }}>{data.flyTo}</div>
                  </div>
                </div>
                <div className="ticket-detail-main">
                  <Checkbox onChange={onChange}></Checkbox>
                  <div>
                    <h3 style={{ margin: "0px 0px 5px" }}>
                      {dayjs(data.local_departure).format("DD-MM-YYYY")}
                    </h3>
                    <div style={{ color: "gray" }}>{data.cityFrom}</div>
                  </div>
                  <div style={{ margin: "0 40px" }}>{data.trip}</div>
                  <div>
                    <h3 style={{ margin: "0px 0px 5px" }}>
                      {dayjs(data.local_arrival).format("DD-MM-YYYY")}
                    </h3>
                    <div style={{ color: "gray" }}>{data.cityTo}</div>
                  </div>
                </div>
                <div className="ticket-detail-main-line"></div>
                <div className="ticket-detail-footer">
                  <div className="heart">
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.7863 1.125C10.2504 1.125 9.0004 3.625 9.0004 3.625C9.0004 3.625 7.7504 1.125 5.21446 1.125C3.15352 1.125 1.52149 2.84922 1.5004 4.90664C1.45743 9.17734 4.88829 12.2145 8.64884 14.7668C8.75251 14.8373 8.87501 14.8751 9.0004 14.8751C9.12579 14.8751 9.24829 14.8373 9.35196 14.7668C13.1121 12.2145 16.543 9.17734 16.5004 4.90664C16.4793 2.84922 14.8473 1.125 12.7863 1.125V1.125Z"
                        stroke="#4C4850"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className="deal"
                    onClick={() => handleNavigateDetail(data._id)}
                  >
                    <>View Deals</>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Pagination
            defaultCurrent={1}
            pageSizeOptions={[4, 10, 20, 50, 100]}
            total={total}
            pageSize={limit}
            style={{ marginTop: "30px" }}
            onChange={(page, pageSize) => handleChangePage(page, pageSize)}
          />
        </div>
      </>
    );
  }
};
export default FlightListTicket;
