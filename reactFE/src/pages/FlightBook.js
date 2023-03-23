import { Col, Row, Spin, Modal, Checkbox, Select } from "antd";
import { useState, useEffect } from "react";
import request from "../utils/request";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import "../styles/FlightBook.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

const FlightBook = () => {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await request.post(
        "/book",
        { flightId: params.flightId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setIsModalOpen(false);
      navigate(`/book/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };
  const onChange = (e) => {
    // console.log(`checked = ${e.target.checked}`);
  };

  const handleNavigate = (value) => {
    if (value === "login") {
      navigate("/login");
    }
    if (value === "signup") {
      navigate("/register");
    }
  };
  const isLogin = useSelector((state) => state.login.isLogin);

  dayjs.extend(duration);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDatas = async () => {
      try {
        const response = await request.get(`/flight/${params.flightId}`);
        setDatas(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, [params]);

  if (isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }
  if (!isLoading) {
    return (
      <div className="FlightBook">
        <Row>
          <Col span={24}>
            <Header />
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", padding: "0 104px" }}>
          <Col span={15}>
            <div className="FlightBook-ticket">
              <div className="FlightBook-ticket-header">
                <h1>{datas[0]?.airlineName}</h1>
                <h1 style={{ color: "#FF8682" }}>${datas[0]?.price}</h1>
              </div>
              <div className="airlineTicket-departureTime">
                <h2>{dayjs(datas[0]?.local_departure).format("DD/MM/YYYY")}</h2>
                <span>
                  Duration total:{" "}
                  {dayjs
                    .duration(datas[0]?.duration.total * 1000)
                    .format("HH:mm:ss")}
                </span>
              </div>
              <div className="airlineTicket-header">
                <img
                  src={datas[0]?.logo}
                  alt="img"
                  style={{ width: "150px", objectFit: "cover" }}
                ></img>
                <div className="airlineTicket-header-icons">
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.74733 19.75H7.49952C7.37414 19.75 7.25077 19.7185 7.14069 19.6585C7.03062 19.5984 6.93735 19.5118 6.86941 19.4064C6.80147 19.301 6.76104 19.1803 6.7518 19.0552C6.74257 18.9302 6.76483 18.8048 6.81655 18.6906L9.83811 12.0227L5.30108 11.9219L3.64639 13.9267C3.33092 14.3233 3.07921 14.5 2.43702 14.5H1.59702C1.46402 14.5043 1.33195 14.4764 1.212 14.4188C1.09205 14.3612 0.987757 14.2755 0.907956 14.1691C0.796393 14.0186 0.686706 13.7636 0.793581 13.3998L1.72264 10.0717C1.72967 10.0469 1.73811 10.022 1.74749 9.99766C1.74795 9.99534 1.74795 9.99295 1.74749 9.99063C1.73781 9.96627 1.72951 9.94139 1.72264 9.91609L0.792643 6.56687C0.691862 6.21016 0.802018 5.96078 0.912643 5.81406C0.986929 5.71549 1.08331 5.63573 1.19403 5.58118C1.30475 5.52664 1.42672 5.49883 1.55014 5.5H2.43702C2.91655 5.5 3.38202 5.71516 3.65577 6.0625L5.27624 8.03359L9.83811 7.96609L6.81749 1.30984C6.7657 1.19568 6.74335 1.07036 6.75249 0.945327C6.76163 0.820298 6.80196 0.699555 6.8698 0.594135C6.93764 0.488715 7.03082 0.401982 7.14083 0.341864C7.25083 0.281747 7.37416 0.250163 7.49952 0.25H8.76092C8.9369 0.253536 9.10983 0.29667 9.26685 0.376197C9.42388 0.455724 9.56097 0.569602 9.66796 0.709375L15.5297 7.83438L18.2376 7.76312C18.4359 7.75234 18.9853 7.74859 19.1123 7.74859C21.7026 7.75 23.2495 8.59094 23.2495 10C23.2495 10.4434 23.0723 11.2656 21.8869 11.7887C21.187 12.0981 20.2533 12.2547 19.1114 12.2547C18.9858 12.2547 18.4378 12.2509 18.2367 12.2402L15.5292 12.168L9.65296 19.293C9.54588 19.4321 9.40891 19.5454 9.25216 19.6246C9.0954 19.7037 8.92288 19.7465 8.74733 19.75Z"
                      fill="#112211"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5818 14.5589C14.595 13.6819 13.3207 13.1974 12.0005 13.1974C10.6803 13.1974 9.40605 13.6819 8.4193 14.5589M18.4435 11.6972C16.6959 10.0631 14.3927 9.15399 12.0001 9.15399C9.60748 9.15399 7.30425 10.0631 5.55664 11.6972"
                      stroke="#112211"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.9864 8.53632C18.513 6.32979 15.3142 5.11035 11.9996 5.11035C8.68494 5.11035 5.48615 6.32979 3.0127 8.53632"
                      stroke="#112211"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19.5C11.7033 19.5 11.4133 19.412 11.1666 19.2472C10.92 19.0824 10.7277 18.8481 10.6142 18.574C10.5006 18.2999 10.4709 17.9983 10.5288 17.7074C10.5867 17.4164 10.7296 17.1491 10.9393 16.9393C11.1491 16.7296 11.4164 16.5867 11.7074 16.5288C11.9983 16.4709 12.2999 16.5006 12.574 16.6142C12.8481 16.7277 13.0824 16.92 13.2472 17.1666C13.412 17.4133 13.5 17.7033 13.5 18C13.5 18.3978 13.342 18.7794 13.0607 19.0607C12.7794 19.342 12.3978 19.5 12 19.5Z"
                      fill="#112211"
                    />
                  </svg>
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.125 1.82031V1.375C10.125 1.07663 10.0065 0.790483 9.7955 0.579505C9.58452 0.368526 9.29837 0.25 9 0.25C8.70164 0.25 8.41549 0.368526 8.20451 0.579505C7.99353 0.790483 7.875 1.07663 7.875 1.375V1.82031C6.45433 1.99866 5.09716 2.51513 3.91735 3.32641L3.42188 2.82812C3.21053 2.61678 2.92389 2.49805 2.625 2.49805C2.32612 2.49805 2.03947 2.61678 1.82813 2.82812C1.61678 3.03947 1.49805 3.32611 1.49805 3.625C1.49805 3.92389 1.61678 4.21053 1.82813 4.42188L2.23125 4.825C0.791348 6.46272 -0.00195218 8.5693 3.6077e-06 10.75C3.6077e-06 15.7127 4.03735 19.75 9 19.75C13.9627 19.75 18 15.7127 18 10.75C18 6.16844 14.5584 2.37531 10.125 1.82031ZM9 13C8.46935 12.9998 7.95583 12.8121 7.55016 12.4701C7.14449 12.128 6.87279 11.6535 6.78305 11.1305C6.69331 10.6075 6.79131 10.0696 7.05974 9.61184C7.32817 9.15409 7.74975 8.80594 8.25 8.62891V5.125C8.25 4.92609 8.32902 4.73532 8.46967 4.59467C8.61033 4.45402 8.80109 4.375 9 4.375C9.19892 4.375 9.38968 4.45402 9.53033 4.59467C9.67099 4.73532 9.75 4.92609 9.75 5.125V8.62891C10.2503 8.80594 10.6718 9.15409 10.9403 9.61184C11.2087 10.0696 11.3067 10.6075 11.217 11.1305C11.1272 11.6535 10.8555 12.128 10.4498 12.4701C10.0442 12.8121 9.53066 12.9998 9 13Z"
                      fill="#112211"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_69_5695)">
                      <path
                        d="M17.2499 6H17.2541H17.2499ZM22.4788 4.5H18.2104L18.6285 2.82844L20.4248 2.21672C20.8068 2.08688 21.0342 1.68094 20.924 1.29282C20.896 1.19518 20.8484 1.10426 20.7842 1.02556C20.72 0.946861 20.6404 0.882029 20.5504 0.834996C20.4603 0.787963 20.3617 0.759709 20.2604 0.751948C20.1591 0.744187 20.0573 0.757081 19.9612 0.789847L17.7581 1.53985C17.6394 1.5803 17.5328 1.64985 17.448 1.74214C17.3631 1.83443 17.3028 1.9465 17.2724 2.06813L16.6645 4.5H10.521C10.1174 4.5 9.77103 4.81032 9.75087 5.21391C9.74598 5.31532 9.76174 5.41666 9.79717 5.5118C9.83261 5.60694 9.887 5.69389 9.95704 5.76739C10.0271 5.84089 10.1113 5.8994 10.2046 5.93939C10.2979 5.97937 10.3984 5.99999 10.4999 6H10.6288L10.6757 6.40594C10.6868 6.50074 10.7323 6.58817 10.8036 6.65161C10.8749 6.71505 10.967 6.75007 11.0624 6.75C12.8906 6.75 14.5152 7.26094 15.7556 8.2275C16.4454 8.75906 17.0047 9.44128 17.3906 10.222C17.6066 10.6612 17.766 11.126 17.8649 11.6053C17.8846 11.6987 17.94 11.7808 18.0191 11.8341C18.6568 12.2667 19.1272 12.9046 19.3522 13.6416C19.5771 14.3786 19.5431 15.1705 19.2557 15.8855C19.2223 15.9682 19.2198 16.0602 19.2487 16.1447C19.4147 16.6206 19.4997 17.121 19.4999 17.625C19.4999 18.6722 19.1437 19.6702 18.4968 20.4352C18.1301 20.8718 17.6687 21.2191 17.1477 21.4509C17.0576 21.4907 16.9867 21.5642 16.9504 21.6558C16.7557 22.1629 16.4808 22.6355 16.1362 23.0555C16.1218 23.0725 16.1126 23.0933 16.1097 23.1154C16.1067 23.1374 16.1101 23.1599 16.1195 23.1801C16.1288 23.2003 16.1437 23.2175 16.1625 23.2295C16.1812 23.2416 16.203 23.248 16.2252 23.2481H18.532C19.0967 23.2458 19.6402 23.0322 20.0553 22.6492C20.4704 22.2663 20.7271 21.7418 20.7749 21.1791L22.3781 6H22.4999C22.6015 6.00012 22.7021 5.97959 22.7955 5.93966C22.889 5.89974 22.9733 5.84124 23.0434 5.76773C23.1136 5.69422 23.168 5.60722 23.2035 5.51202C23.239 5.41682 23.2548 5.31539 23.2499 5.21391C23.2302 4.81032 22.8824 4.5 22.4788 4.5Z"
                        fill="#112211"
                      />
                      <path
                        d="M5.09484 15C5.24277 14.9993 5.38936 15.0279 5.52614 15.0843C5.66292 15.1406 5.78718 15.2235 5.89172 15.3281L6.61875 16.0552C6.63616 16.0726 6.65684 16.0864 6.67961 16.0959C6.70237 16.1053 6.72677 16.1101 6.75141 16.1101C6.77605 16.1101 6.80045 16.1053 6.82321 16.0959C6.84597 16.0864 6.86665 16.0726 6.88406 16.0552L7.60969 15.3281C7.71423 15.2235 7.83849 15.1406 7.97527 15.0843C8.11205 15.0279 8.25864 14.9993 8.40656 15H17.6213C17.6705 15.0005 17.7194 14.9913 17.765 14.9729C17.8107 14.9545 17.8523 14.9273 17.8875 14.8928C17.9227 14.8583 17.9507 14.8173 17.97 14.772C17.9893 14.7267 17.9995 14.678 18 14.6287V14.625C17.9995 14.1929 17.85 13.7742 17.5768 13.4395C17.3035 13.1048 16.9232 12.8745 16.5 12.7875C16.4616 11.3958 15.8906 10.2309 14.8355 9.4125C13.8595 8.65125 12.5555 8.25 11.0625 8.25H7.6875C4.48969 8.25 2.32359 10.0673 2.25 12.7875C1.82677 12.8745 1.44649 13.1048 1.17325 13.4395C0.90001 13.7742 0.750528 14.1929 0.75 14.625C0.75 14.7245 0.789509 14.8198 0.859835 14.8902C0.930161 14.9605 1.02554 15 1.125 15H5.09484ZM8.71594 16.5C8.66668 16.5 8.61789 16.5096 8.57237 16.5284C8.52685 16.5473 8.48548 16.5749 8.45063 16.6097L7.41281 17.648C7.23701 17.8237 6.99859 17.9225 6.75 17.9225C6.50141 17.9225 6.263 17.8237 6.08719 17.648L5.04938 16.6097C5.01452 16.5749 4.97315 16.5473 4.92763 16.5284C4.88211 16.5096 4.83332 16.5 4.78406 16.5H1.53094C1.35476 16.4992 1.18398 16.5608 1.04879 16.6737C0.913601 16.7867 0.82271 16.9438 0.792188 17.1173C0.764027 17.2851 0.749916 17.4549 0.75 17.625C0.75 19.0589 1.74047 20.227 2.96531 20.25C3.07922 20.9587 3.35484 21.5991 3.76969 22.1002C4.38328 22.8413 5.27531 23.25 6.28125 23.25H12.4688C13.4747 23.25 14.3667 22.8413 14.9803 22.0992C15.3952 21.5981 15.6708 20.9578 15.7847 20.2491C17.0095 20.227 18 19.0589 18 17.6241C18.0001 17.454 17.986 17.2842 17.9578 17.1164C17.9271 16.9431 17.8361 16.7861 17.7009 16.6734C17.5658 16.5606 17.3951 16.4992 17.2191 16.5H8.71594Z"
                        fill="#112211"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_69_5695">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.59 5.41C6.81 4.63 6.81 3.36 7.59 2.58C8.37 1.8 9.64 1.8 10.42 2.58C11.2 3.36 11.2 4.63 10.42 5.41C9.63 6.2 8.37 6.2 7.59 5.41ZM6 16V8C6 7.45 5.55 7 5 7C4.45 7 4 7.45 4 8V16C4 18.76 6.24 21 9 21H14C14.55 21 15 20.55 15 20C15 19.45 14.55 19 14 19H9C7.34 19 6 17.66 6 16ZM19.28 19.35L15.51 15.58C15.14 15.21 14.63 15 14.1 15H11.5V11.32C12.59 12.21 14.16 13.02 15.7 13.34C16.37 13.48 17 12.98 17 12.3C17 11.77 16.61 11.34 16.08 11.25C14.66 11.01 13.2 10.24 12.33 9.27999L10.93 7.73C10.74 7.52 10.5 7.35 10.24 7.23C9.95 7.09 9.62 7 9.28 7H9.25C8.01 7 7 8.01 7 9.25V15C7 16.66 8.34 18 10 18H15.07L17.85 20.78C18.24 21.17 18.89 21.17 19.28 20.78C19.68 20.39 19.68 19.75 19.28 19.35Z"
                      fill="#112211"
                    />
                  </svg>
                </div>
              </div>
              <div className="airlineTicket-main">
                <div className="airlineTicket-main-item">
                  <h2>{dayjs(datas[0]?.local_departure).format("HH:mm:ss")}</h2>
                  <h3>{datas[0]?.cityFrom}</h3>
                </div>
                <div className="airlineTicket-main-item">
                  <svg
                    width="39"
                    height="6"
                    viewBox="0 0 39 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.66667 3C5.66667 1.52724 4.47276 0.333335 3 0.333335C1.52724 0.333335 0.333336 1.52724 0.333336 3C0.333336 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3ZM39 2.5L3 2.5L3 3.5L39 3.5L39 2.5Z"
                      fill="black"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.74733 19.75H7.49952C7.37414 19.75 7.25077 19.7185 7.14069 19.6585C7.03062 19.5984 6.93735 19.5118 6.86941 19.4064C6.80147 19.301 6.76104 19.1803 6.7518 19.0552C6.74257 18.9302 6.76483 18.8048 6.81655 18.6906L9.83811 12.0227L5.30108 11.9219L3.64639 13.9267C3.33092 14.3233 3.07921 14.5 2.43702 14.5H1.59702C1.46402 14.5043 1.33195 14.4764 1.212 14.4188C1.09205 14.3612 0.987757 14.2755 0.907956 14.1691C0.796393 14.0186 0.686706 13.7636 0.793581 13.3998L1.72264 10.0717C1.72967 10.0469 1.73811 10.022 1.74749 9.99766C1.74795 9.99534 1.74795 9.99295 1.74749 9.99063C1.73781 9.96627 1.72951 9.94139 1.72264 9.91609L0.792643 6.56687C0.691862 6.21016 0.802018 5.96078 0.912643 5.81406C0.986929 5.71549 1.08331 5.63573 1.19403 5.58118C1.30475 5.52664 1.42672 5.49883 1.55014 5.5H2.43702C2.91655 5.5 3.38202 5.71516 3.65577 6.0625L5.27624 8.03359L9.83811 7.96609L6.81749 1.30984C6.7657 1.19568 6.74335 1.07036 6.75249 0.945327C6.76163 0.820298 6.80196 0.699555 6.8698 0.594135C6.93764 0.488715 7.03082 0.401982 7.14083 0.341864C7.25083 0.281747 7.37416 0.250163 7.49952 0.25H8.76092C8.9369 0.253536 9.10983 0.29667 9.26685 0.376197C9.42388 0.455724 9.56097 0.569602 9.66796 0.709375L15.5297 7.83438L18.2376 7.76312C18.4359 7.75234 18.9853 7.74859 19.1123 7.74859C21.7026 7.75 23.2495 8.59094 23.2495 10C23.2495 10.4434 23.0723 11.2656 21.8869 11.7887C21.187 12.0981 20.2533 12.2547 19.1114 12.2547C18.9858 12.2547 18.4378 12.2509 18.2367 12.2402L15.5292 12.168L9.65296 19.293C9.54588 19.4321 9.40891 19.5454 9.25216 19.6246C9.0954 19.7037 8.92288 19.7465 8.74733 19.75Z"
                      fill="#112211"
                    />
                  </svg>
                  <svg
                    width="39"
                    height="6"
                    viewBox="0 0 39 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.6667 3C38.6667 1.52724 37.4728 0.333333 36 0.333333C34.5272 0.333333 33.3333 1.52724 33.3333 3C33.3333 4.47276 34.5272 5.66667 36 5.66667C37.4728 5.66667 38.6667 4.47276 38.6667 3ZM36 2.5L-2.18557e-08 2.5L2.18557e-08 3.5L36 3.5L36 2.5Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="airlineTicket-main-item">
                  <h2>{dayjs(datas[0]?.local_arrival).format("HH:mm:ss")}</h2>
                  <h3>{datas[0]?.cityTo}</h3>
                </div>
              </div>
            </div>
            {!isLogin ? (
              <div className="FlightBook-loginSignup">
                <h2>Login or Sign up to book</h2>
                <div className="FlightBook-loginSignup-items">
                  <div
                    className="FlightBook-loginSignup-button"
                    onClick={() => handleNavigate("login")}
                  >
                    <h3>Login</h3>
                  </div>
                  <div
                    className="FlightBook-loginSignup-button"
                    onClick={() => handleNavigate("signup")}
                  >
                    <h3>Signup</h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="FlightBook-card">
                <div className="FlightBook-card-header">
                  <svg
                    width="32"
                    height="22"
                    viewBox="0 0 32 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.28 0.951904C0.573216 0.951904 0 1.52496 0 2.2319V19.7679C0 20.4748 0.573504 21.0479 1.28 21.0479H30.72C31.4268 21.0479 32 20.4748 32 19.7679V2.2319C32 1.52499 31.4265 0.951904 30.72 0.951904H1.28ZM19.112 6.9409C19.8908 6.9409 20.515 7.11293 20.913 7.2729L20.641 8.9839L20.461 8.8929C20.0902 8.73293 19.614 8.57898 18.957 8.58989C18.1706 8.58989 17.807 8.94071 17.807 9.26893C17.8024 9.63875 18.2318 9.88266 18.934 10.2479C20.0929 10.8114 20.6286 11.4947 20.621 12.3929C20.6054 14.0318 19.2347 15.0909 17.123 15.0909C16.2221 15.081 15.3542 14.8903 14.885 14.6699L15.167 12.9019L15.426 13.0279C16.0858 13.3227 16.513 13.4419 17.317 13.4419C17.8944 13.4419 18.5141 13.2002 18.519 12.6709C18.5228 12.3253 18.26 12.0789 17.478 11.6919C16.716 11.3142 15.7058 10.6814 15.717 9.54691C15.7289 8.01216 17.127 6.9409 19.112 6.9409ZM2.82998 7.1919H6.07299C6.5097 7.20842 6.86227 7.34902 6.984 7.82291L7.68301 11.4309C7.6831 11.4312 7.68288 11.4325 7.68301 11.4329L7.89299 12.5139L9.86199 7.1919H11.992L8.82598 14.9819L6.69798 14.9839L5.004 8.69789C6.01194 9.23187 6.87005 9.8497 7.36701 10.6999C7.23888 10.4309 7.07005 10.1272 6.85402 9.8279C6.60243 9.47936 6.0591 9.02935 5.832 8.83789C5.04064 8.17078 3.96592 7.632 2.80499 7.34691L2.82998 7.1919ZM12.839 7.2009H14.922L13.619 14.9789H11.536L12.839 7.2009ZM24.604 7.2009H26.182L27.834 14.9789H25.94C25.94 14.9789 25.7521 14.0853 25.691 13.8129C25.3933 13.8129 23.3113 13.8099 23.077 13.8099C22.9977 14.0205 22.647 14.9789 22.647 14.9789H20.504L23.535 7.84691C23.7496 7.3401 24.1154 7.2009 24.604 7.2009ZM24.759 9.2929C24.6565 9.58221 24.4781 10.0494 24.49 10.0289C24.49 10.0289 23.8488 11.739 23.681 12.1829L25.366 12.1819C25.2095 11.4402 25.0528 10.6986 24.896 9.95696L24.759 9.29296V9.2929Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="FlightBook-cardAdd" onClick={showModal}>
                  <svg
                    width="64"
                    height="65"
                    viewBox="0 0 64 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M56 32.5C56 19.25 45.25 8.5 32 8.5C18.75 8.5 8 19.25 8 32.5C8 45.75 18.75 56.5 32 56.5C45.25 56.5 56 45.75 56 32.5Z"
                      stroke="#8DD3BB"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M32 22.5V42.5M42 32.5H22"
                      stroke="#8DD3BB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>Add a new card</div>
                </div>
              </div>
            )}
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              style={{ top: "0px" }}
            >
              <h1>Add a new Card</h1>
              <Col span={24}>
                <input className="cardInput"></input>
                <span className="cardTitle">Card Number</span>
              </Col>
              <Row span={24} style={{ columnGap: "50px", marginTop: "30px" }}>
                <Col span={10}>
                  <input className="cardInput"></input>
                  <span className="cardTitle">Exp. Date</span>
                </Col>
                <Col span={10}>
                  <input className="cardInput"></input>
                  <span className="cardTitle">CVC</span>
                </Col>
              </Row>
              <Col span={24} style={{ marginTop: "30px" }}>
                <input className="cardInput"></input>
                <span className="cardTitle">Name on Card</span>
              </Col>
              <Col span={24} style={{ marginTop: "30px" }}>
                <Select
                  defaultValue="United States"
                  bordered={false}
                  size="large"
                  className="cardInput"
                  style={{ width: "100%", padding: "8px 17px" }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "United States",
                      label: "United States",
                    },
                    {
                      value: "Vietnam",
                      label: "Vietnam",
                    },
                    {
                      value: "Japan",
                      label: "Japan",
                    },
                  ]}
                />
                <span className="cardTitle">Country or Region</span>
              </Col>
              <Col span={24} style={{ marginTop: "20px" }}>
                <Checkbox onChange={onChange}>
                  Securely save my information for 1-click checkout
                </Checkbox>
              </Col>
              <Col span={24} style={{ marginTop: "30px" }}>
                <div className="modal-buttonAddCard" onClick={handleOk}>
                  <h3>Add Card</h3>
                </div>
              </Col>
              <Col span={24} style={{ marginTop: "10px" }}>
                <div className="modal-footer">
                  By confirming your subscription, you allow The Outdoor Inn
                  Crowd Limited to charge your card for this payment and future
                  payments in accordance with their terms. You can always cancel
                  your subscription.
                </div>
              </Col>
            </Modal>
          </Col>
          <Col span={1}></Col>
          <Col span={8}>
            <div className="airlineTicket-side">
              <div className="airlineTicket-side-header">
                <img
                  src={datas[0]?.airlineImage}
                  alt="img"
                  className="airlineTicket-side-header-img"
                ></img>
                <div>
                  <div>{datas[0]?.class}</div>
                  <h2 style={{ margin: "0" }}>{datas[0]?.airlineName}</h2>
                  <div className="airlineTicket-side-header-rate">
                    <div className="airlineTicket-side-header-rateBox">
                      <>{datas[0]?.rating}</>
                    </div>
                    <div>
                      <b>{datas[0]?.commend}</b>
                    </div>
                    <div>{datas[0]?.review} reviews</div>
                  </div>
                </div>
              </div>
              <div className="airlineTicket-side-line"></div>
              <div style={{ margin: "30px 0" }}>
                Your booking is protected by <b>golobe</b>
              </div>
              <div className="airlineTicket-side-line"></div>
              <h3>
                Price Details
                <div className="airlineTicket-side-detail">
                  <span>Base Fare</span>
                  <span>${datas[0]?.price}</span>
                </div>
                <div className="airlineTicket-side-detail">
                  <span>Discount</span>
                  <span>${datas[0]?.discount}</span>
                </div>
                <div className="airlineTicket-side-detail">
                  <span>Taxes</span>
                  <span>${datas[0]?.taxes}</span>
                </div>
                <div className="airlineTicket-side-detail">
                  <span>Service Fee</span>
                  <span>${datas[0]?.service}</span>
                </div>
                <div className="airlineTicket-side-detail">
                  <span>Total</span>
                  <span>
                    $
                    {datas[0]?.price +
                      datas[0]?.discount +
                      datas[0]?.taxes +
                      datas[0]?.service}
                  </span>
                </div>
              </h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Footer />
          </Col>
        </Row>
      </div>
    );
  }
};
export default FlightBook;
