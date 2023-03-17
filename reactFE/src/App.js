import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "./redux/loginSlice";

import FlightSearch from "./pages/FlightSearch";
import FlightList from "./pages/FlightList";
import FlightDetail from "./pages/FlightDetail";
import FlightBook from "./pages/FlightBook";
import FlightResult from "./pages/FlightResult";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HotelSearch from "./pages/HotelSearch/HotelSearch";
import HotelListing from "./pages/HotelListing/HotelListing";
import HotelDetail from "./pages/HotelDetail/HotelDetail";
import BookingDetail from "./pages/BookingDetail/BookingDetail";
import BookingComplete from "./pages/BookingDetail/components/BookingComplete";

const App = () => {
  const [params, setParams] = useState({
    category: "Hotels",
    pageIndex: 1,
    pageSize: 4,
    sortBy: "minPrice",
    minPriceFilter: 100,
    maxPriceFilter: 600,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(setIsLogin(true));
    }
  });
  return (
    <Routes>
      <Route path="/flight/search" element={<FlightSearch />} />
      <Route path="/flight/list" element={<FlightList />} />
      <Route path="/flight/:flightId" element={<FlightDetail />} />
      <Route path="/flight/:flightId/book" element={<FlightBook />} />
      <Route path="/book/:bookId" element={<FlightResult />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home params={params} />} />
      <Route
        path="/hotel-search"
        element={<HotelSearch params={params} setParams={setParams} />}
      />
      <Route
        path="/hotel-listing"
        element={<HotelListing params={params} setParams={setParams} />}
      />
      <Route path="/hotel-detail/:hotelId" element={<HotelDetail />} />
      <Route path="/booking-detail/" element={<BookingDetail />} />
      <Route path="/booking-complete" element={<BookingComplete />} />
    </Routes>
  );
};

export default App;
