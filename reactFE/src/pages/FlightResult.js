import { Col, Row, Spin } from "antd";
import { useState, useEffect } from "react";
import request from "../utils/request";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import "../styles/FlightResult.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

const FlightResult = () => {
  const [datas, setDatas] = useState();
  const [isLoading, setIsLoading] = useState(true);

  dayjs.extend(duration);
  const params = useParams();

  useEffect(() => {
    const getDatas = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await request.get(`/book/${params.bookId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

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
      <div className="FlightResult">
        <Row>
          <Col span={24}>
            <Header />
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", padding: "0 104px" }}>
          <Col span={24}>
            <div className="name-price">
              <h2>{datas.flight.airlineName}</h2>
              <h2 style={{ color: "#FF8682" }}>${datas.flight.price}</h2>
            </div>
            <div className="rate-book">
              <div className="rate-book-rating">
                <span className="rate-book-number">
                  <>{datas.flight.rating}</>
                </span>
                <span>{datas.flight.commend}</span>
                <span>{datas.flight.review} reviews</span>
              </div>
              <div className="rate-book-rating">
                <span className="rate-book-heart">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.1866 12.915L11.2024 12.9239L11.215 12.9107C11.4455 12.6697 11.7225 12.4778 12.0292 12.3468C12.336 12.2158 12.6661 12.1483 12.9996 12.1484C13.5168 12.1484 14.0211 12.3103 14.4417 12.6114C14.8622 12.9126 15.1779 13.3378 15.3445 13.8275C15.511 14.3172 15.5201 14.8468 15.3704 15.3419C15.2206 15.837 14.9197 16.2728 14.5097 16.5881C14.0997 16.9034 13.6012 17.0825 13.0843 17.1001C12.5673 17.1178 12.0578 16.9731 11.6273 16.6865C11.1968 16.3998 10.8668 15.9855 10.6837 15.5018C10.5005 15.0181 10.4735 14.4891 10.6062 13.9892L10.6109 13.9717L10.5951 13.9628L4.81383 10.71L4.798 10.7011L4.78543 10.7142C4.44333 11.0709 4.00234 11.3171 3.51918 11.4211C3.03602 11.5251 2.5328 11.4822 2.07425 11.2978C1.6157 11.1135 1.22279 10.7961 0.946072 10.3866C0.669354 9.97714 0.521484 9.49422 0.521484 9C0.521484 8.50578 0.669354 8.02286 0.946072 7.61336C1.22279 7.20387 1.6157 6.88654 2.07425 6.70218C2.5328 6.51783 3.03603 6.47489 3.51918 6.57889C4.00234 6.68289 4.44333 6.92907 4.78543 7.28575L4.798 7.29887L4.81383 7.28996L10.5951 4.03722L10.6109 4.02832L10.6062 4.01076C10.4516 3.4303 10.5139 2.81338 10.7815 2.27558C11.0491 1.73777 11.5036 1.31598 12.0599 1.08922C12.6161 0.862465 13.236 0.846301 13.8033 1.04376C14.3706 1.24122 14.8465 1.63875 15.1418 2.16188C15.437 2.68501 15.5314 3.29784 15.4073 3.88557C15.2831 4.4733 14.9489 4.9956 14.4673 5.35462C13.9857 5.71364 13.3897 5.88475 12.791 5.83589C12.1923 5.78703 11.6319 5.52155 11.2149 5.0892L11.2023 5.07616L11.1866 5.08504L5.4053 8.33778L5.38947 8.34668L5.39415 8.36423C5.50508 8.78082 5.50508 9.21918 5.39415 9.63577L5.38947 9.65332L5.4053 9.66222L11.1866 12.915Z"
                      fill="black"
                      stroke="#112211"
                      strokeWidth="0.046875"
                    />
                  </svg>
                </span>
                <span className="rate-book-button">
                  <>Download</>
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", padding: "0 104px" }}>
          <Col span={24}>
            <div className="FlightResult-ticket">
              <div className="FlightResult-ticket-time">
                <h1 style={{ margin: "0px" }}>
                  {dayjs(datas.flight.local_departure).format("HH:mm:ss")}
                </h1>
                <div>{datas.flight.cityFrom}</div>
                <svg
                  width="38"
                  height="93"
                  viewBox="0 0 38 93"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.25"
                    d="M37 0.5L19 10.5M1 0.5L19 10.5M19 10.5V26.5"
                    stroke="#112211"
                    strokeWidth="0.5"
                  />
                  <path
                    opacity="0.2"
                    d="M22.4331 35.2926L19.0839 36.2226C19.0586 36.2295 19.0337 36.2378 19.0094 36.2475L22.4331 35.2926ZM22.4331 35.2926C22.7898 35.1919 23.0392 35.302 23.1859 35.4126M22.4331 35.2926L23.1859 35.4126M23.1859 35.4126C23.2845 35.4869 23.3643 35.5833 23.4188 35.694C23.4734 35.8047 23.5012 35.9267 23.5 36.0501V36.937C23.5 37.4165 23.2848 37.882 22.9375 38.1558L20.9664 39.7762L23.1859 35.4126ZM28.7266 41.9995L28.7266 43.2607C28.7231 43.4331 28.6808 43.6024 28.6029 43.7563C28.525 43.9101 28.4134 44.0445 28.2764 44.1493L28.2764 44.1493L28.2757 44.1499L21.1507 50.0116L21.1419 50.0188L21.1422 50.0303L21.2134 52.7383L21.2135 52.7389C21.2242 52.9364 21.228 53.4852 21.228 53.6123C21.2273 54.9055 21.0169 55.9354 20.633 56.6411C20.2496 57.3458 19.6941 57.7261 19 57.7261C18.7813 57.7261 18.4693 57.6824 18.1474 57.4926C17.8257 57.3028 17.4925 56.9662 17.2327 56.3774L17.2327 56.3774C16.9251 55.6816 16.7687 54.7515 16.7687 53.6114C16.7687 53.4856 16.7725 52.9383 16.7833 52.738L16.7833 52.7373L16.8555 50.0298L16.8558 50.0184L16.8469 50.0111L9.72195 44.1349L9.72132 44.1344C9.58495 44.0295 9.47389 43.8952 9.39637 43.7416C9.31887 43.588 9.27686 43.419 9.27344 43.2471V41.9995C9.27348 41.8781 9.30397 41.7586 9.36212 41.6519C9.42027 41.5453 9.50423 41.4549 9.60631 41.3891C9.7084 41.3233 9.82536 41.2841 9.94649 41.2752C10.0676 41.2662 10.1891 41.2878 10.2997 41.3379L16.9677 44.3595L17 44.3741L17.0008 44.3386L17.1016 39.8016L17.1018 39.7902L17.093 39.783L15.0882 38.1283L15.0879 38.1281C14.8904 37.971 14.7502 37.8317 14.6588 37.6535C14.5674 37.4754 14.5234 37.2561 14.5234 36.937L14.5234 36.097L14.5234 36.0963C14.5193 35.967 14.5463 35.8387 14.6023 35.7221C14.6583 35.6056 14.7415 35.5043 14.8449 35.4268C14.9906 35.3187 15.2381 35.2116 15.5935 35.3161L15.5939 35.3162L18.9219 36.2452C18.9219 36.2452 18.9219 36.2452 18.9219 36.2452C18.946 36.252 18.9701 36.2602 18.9939 36.2694L18.9938 36.2697L18.9977 36.2705C19.0031 36.2715 19.0086 36.2715 19.014 36.2705L19.0141 36.2708L19.018 36.2693C19.0416 36.2599 19.0656 36.2519 19.09 36.2453L19.0902 36.2452L22.4394 35.3152L22.4395 35.3152C22.7879 35.2168 23.0298 35.3243 23.1718 35.4314L23.1718 35.4314C23.2675 35.5034 23.3449 35.597 23.3978 35.7044C23.4507 35.8118 23.4777 35.9302 23.4766 36.0499V36.0501V36.937C23.4766 37.41 23.2642 37.8685 22.923 38.1374L22.923 38.1374L22.9226 38.1377L20.9515 39.7581L20.9428 39.7653L20.943 39.7766L21.0105 44.3385L21.011 44.3742L21.0436 44.3595L27.6998 41.3388C27.8104 41.2887 27.9318 41.267 28.053 41.2759C28.1741 41.2847 28.2911 41.3238 28.3932 41.3895C28.4953 41.4552 28.5793 41.5455 28.6376 41.6521C28.6958 41.7586 28.7264 41.8781 28.7266 41.9995Z"
                    fill="#112211"
                    stroke="#112211"
                    strokeWidth="0.046875"
                  />
                  <path
                    opacity="0.25"
                    d="M37 92.5L19 82.5M1 92.5L19 82.5M19 82.5V66.5"
                    stroke="#112211"
                    strokeWidth="0.5"
                  />
                </svg>
                <h1 style={{ margin: "0px" }}>
                  {dayjs(datas.flight.local_arrival).format("HH:mm:ss")}
                </h1>
                <div>{datas.flight.cityTo}</div>
              </div>
              <div className="FlightResult-ticket-info">
                <div className="FlightResult-ticket-info-header">
                  <div className="info-header-user">
                    <div className="info-header-user-avatar"></div>
                    <div className="info-header-user-name">
                      <h2 style={{ margin: "0px" }}>{datas.user.username}</h2>
                      <div>Boarding Pass N’123</div>
                    </div>
                  </div>
                  <h3>{datas.flight.class}</h3>
                </div>
                <div className="FlightResult-ticket-info-main">
                  <div className="info-main-plane">
                    <div className="detail-plane">
                      <svg
                        width="32"
                        height="33"
                        viewBox="0 0 32 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <react
                          y="0.5"
                          width="32"
                          height="32"
                          rx="4"
                          fill="#EBF6F2"
                        />
                        <path
                          d="M24.25 12.2857C24.25 11.6606 24.0017 11.061 23.5596 10.619C23.1176 10.1769 22.518 9.92858 21.8929 9.92858H21.3036V9.35587C21.3036 9.03876 21.0598 8.76658 20.7426 8.75074C20.663 8.7469 20.5833 8.75928 20.5086 8.78713C20.4338 8.81497 20.3655 8.8577 20.3078 8.91273C20.25 8.96776 20.204 9.03394 20.1726 9.10726C20.1412 9.18059 20.125 9.25952 20.125 9.33929V9.92858H11.875V9.35587C11.875 9.03876 11.6312 8.76658 11.3141 8.75074C11.2344 8.7469 11.1548 8.75928 11.08 8.78713C11.0053 8.81497 10.9369 8.8577 10.8792 8.91273C10.8214 8.96776 10.7755 9.03394 10.7441 9.10726C10.7126 9.18059 10.6964 9.25952 10.6964 9.33929V9.92858H10.1071C9.48199 9.92858 8.88244 10.1769 8.44039 10.619C7.99834 11.061 7.75 11.6606 7.75 12.2857V12.7277C7.75 12.7668 7.76552 12.8042 7.79315 12.8319C7.82078 12.8595 7.85825 12.875 7.89732 12.875H24.1027C24.1418 12.875 24.1792 12.8595 24.2069 12.8319C24.2345 12.8042 24.25 12.7668 24.25 12.7277V12.2857ZM7.75 22.8929C7.75 23.518 7.99834 24.1176 8.44039 24.5596C8.88244 25.0017 9.48199 25.25 10.1071 25.25H21.8929C22.518 25.25 23.1176 25.0017 23.5596 24.5596C24.0017 24.1176 24.25 23.518 24.25 22.8929V14.1641C24.25 14.1348 24.2384 14.1067 24.2176 14.0859C24.1969 14.0652 24.1688 14.0536 24.1395 14.0536H7.86049C7.83119 14.0536 7.80308 14.0652 7.78236 14.0859C7.76164 14.1067 7.75 14.1348 7.75 14.1641V22.8929ZM20.4196 15.2321C20.5945 15.2321 20.7654 15.284 20.9107 15.3811C21.0561 15.4782 21.1694 15.6163 21.2363 15.7778C21.3032 15.9393 21.3207 16.1171 21.2866 16.2885C21.2525 16.46 21.1683 16.6175 21.0447 16.7411C20.9211 16.8647 20.7636 16.9489 20.5921 16.983C20.4206 17.0171 20.2429 16.9996 20.0814 16.9327C19.9199 16.8658 19.7818 16.7525 19.6847 16.6072C19.5876 16.4618 19.5357 16.2909 19.5357 16.1161C19.5357 15.8816 19.6288 15.6568 19.7946 15.491C19.9604 15.3253 20.1852 15.2321 20.4196 15.2321ZM20.4196 18.1786C20.5945 18.1786 20.7654 18.2304 20.9107 18.3275C21.0561 18.4247 21.1694 18.5627 21.2363 18.7242C21.3032 18.8858 21.3207 19.0635 21.2866 19.235C21.2525 19.4064 21.1683 19.5639 21.0447 19.6875C20.9211 19.8112 20.7636 19.8953 20.5921 19.9295C20.4206 19.9636 20.2429 19.9461 20.0814 19.8791C19.9199 19.8122 19.7818 19.699 19.6847 19.5536C19.5876 19.4082 19.5357 19.2373 19.5357 19.0625C19.5357 18.8281 19.6288 18.6032 19.7946 18.4375C19.9604 18.2717 20.1852 18.1786 20.4196 18.1786ZM17.4732 15.2321C17.648 15.2321 17.8189 15.284 17.9643 15.3811C18.1097 15.4782 18.223 15.6163 18.2899 15.7778C18.3568 15.9393 18.3743 16.1171 18.3402 16.2885C18.3061 16.46 18.2219 16.6175 18.0982 16.7411C17.9746 16.8647 17.8171 16.9489 17.6457 16.983C17.4742 17.0171 17.2965 16.9996 17.135 16.9327C16.9734 16.8658 16.8354 16.7525 16.7383 16.6072C16.6411 16.4618 16.5893 16.2909 16.5893 16.1161C16.5893 15.8816 16.6824 15.6568 16.8482 15.491C17.014 15.3253 17.2388 15.2321 17.4732 15.2321ZM17.4732 18.1786C17.648 18.1786 17.8189 18.2304 17.9643 18.3275C18.1097 18.4247 18.223 18.5627 18.2899 18.7242C18.3568 18.8858 18.3743 19.0635 18.3402 19.235C18.3061 19.4064 18.2219 19.5639 18.0982 19.6875C17.9746 19.8112 17.8171 19.8953 17.6457 19.9295C17.4742 19.9636 17.2965 19.9461 17.135 19.8791C16.9734 19.8122 16.8354 19.699 16.7383 19.5536C16.6411 19.4082 16.5893 19.2373 16.5893 19.0625C16.5893 18.8281 16.6824 18.6032 16.8482 18.4375C17.014 18.2717 17.2388 18.1786 17.4732 18.1786ZM17.4732 21.125C17.648 21.125 17.8189 21.1768 17.9643 21.274C18.1097 21.3711 18.223 21.5092 18.2899 21.6707C18.3568 21.8322 18.3743 22.0099 18.3402 22.1814C18.3061 22.3528 18.2219 22.5103 18.0982 22.634C17.9746 22.7576 17.8171 22.8418 17.6457 22.8759C17.4742 22.91 17.2965 22.8925 17.135 22.8256C16.9734 22.7587 16.8354 22.6454 16.7383 22.5C16.6411 22.3547 16.5893 22.1838 16.5893 22.0089C16.5893 21.7745 16.6824 21.5497 16.8482 21.3839C17.014 21.2181 17.2388 21.125 17.4732 21.125ZM14.5268 18.1786C14.7016 18.1786 14.8725 18.2304 15.0179 18.3275C15.1632 18.4247 15.2765 18.5627 15.3434 18.7242C15.4103 18.8858 15.4278 19.0635 15.3937 19.235C15.3596 19.4064 15.2754 19.5639 15.1518 19.6875C15.0282 19.8112 14.8707 19.8953 14.6992 19.9295C14.5278 19.9636 14.35 19.9461 14.1885 19.8791C14.027 19.8122 13.889 19.699 13.7918 19.5536C13.6947 19.4082 13.6429 19.2373 13.6429 19.0625C13.6429 18.8281 13.736 18.6032 13.9018 18.4375C14.0675 18.2717 14.2924 18.1786 14.5268 18.1786ZM14.5268 21.125C14.7016 21.125 14.8725 21.1768 15.0179 21.274C15.1632 21.3711 15.2765 21.5092 15.3434 21.6707C15.4103 21.8322 15.4278 22.0099 15.3937 22.1814C15.3596 22.3528 15.2754 22.5103 15.1518 22.634C15.0282 22.7576 14.8707 22.8418 14.6992 22.8759C14.5278 22.91 14.35 22.8925 14.1885 22.8256C14.027 22.7587 13.889 22.6454 13.7918 22.5C13.6947 22.3547 13.6429 22.1838 13.6429 22.0089C13.6429 21.7745 13.736 21.5497 13.9018 21.3839C14.0675 21.2181 14.2924 21.125 14.5268 21.125ZM11.5804 18.1786C11.7552 18.1786 11.9261 18.2304 12.0714 18.3275C12.2168 18.4247 12.3301 18.5627 12.397 18.7242C12.4639 18.8858 12.4814 19.0635 12.4473 19.235C12.4132 19.4064 12.329 19.5639 12.2054 19.6875C12.0818 19.8112 11.9243 19.8953 11.7528 19.9295C11.5813 19.9636 11.4036 19.9461 11.2421 19.8791C11.0806 19.8122 10.9425 19.699 10.8454 19.5536C10.7483 19.4082 10.6964 19.2373 10.6964 19.0625C10.6964 18.8281 10.7896 18.6032 10.9553 18.4375C11.1211 18.2717 11.3459 18.1786 11.5804 18.1786ZM11.5804 21.125C11.7552 21.125 11.9261 21.1768 12.0714 21.274C12.2168 21.3711 12.3301 21.5092 12.397 21.6707C12.4639 21.8322 12.4814 22.0099 12.4473 22.1814C12.4132 22.3528 12.329 22.5103 12.2054 22.634C12.0818 22.7576 11.9243 22.8418 11.7528 22.8759C11.5813 22.91 11.4036 22.8925 11.2421 22.8256C11.0806 22.7587 10.9425 22.6454 10.8454 22.5C10.7483 22.3547 10.6964 22.1838 10.6964 22.0089C10.6964 21.7745 10.7896 21.5497 10.9553 21.3839C11.1211 21.2181 11.3459 21.125 11.5804 21.125Z"
                          fill="#8DD3BB"
                        />
                      </svg>
                      <div>
                        <div style={{ color: "gray" }}>Date</div>
                        <h4 style={{ margin: "0" }}>
                          {dayjs(datas.flight.local_departure).format(
                            "HH:mm:ss"
                          )}
                        </h4>
                      </div>
                    </div>
                    <div className="detail-plane">
                      <svg
                        width="32"
                        height="33"
                        viewBox="0 0 32 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.5"
                          width="32"
                          height="32"
                          rx="4"
                          fill="#EBF6F2"
                        />
                        <path
                          d="M16 8.75C11.4439 8.75 7.75 12.4439 7.75 17C7.75 21.5561 11.4439 25.25 16 25.25C20.5561 25.25 24.25 21.5561 24.25 17C24.25 12.4439 20.5561 8.75 16 8.75ZM19.8077 18.2692H16C15.8317 18.2692 15.6703 18.2024 15.5513 18.0834C15.4322 17.9643 15.3654 17.8029 15.3654 17.6346V11.9231C15.3654 11.7548 15.4322 11.5933 15.5513 11.4743C15.6703 11.3553 15.8317 11.2885 16 11.2885C16.1683 11.2885 16.3297 11.3553 16.4487 11.4743C16.5678 11.5933 16.6346 11.7548 16.6346 11.9231V17H19.8077C19.976 17 20.1374 17.0669 20.2564 17.1859C20.3754 17.3049 20.4423 17.4663 20.4423 17.6346C20.4423 17.8029 20.3754 17.9643 20.2564 18.0834C20.1374 18.2024 19.976 18.2692 19.8077 18.2692Z"
                          fill="#8DD3BB"
                        />
                      </svg>
                      <div>
                        <div style={{ color: "gray" }}>Flight time</div>
                        <h4 style={{ margin: "0" }}>
                          {datas.flight.flightTime}
                        </h4>
                      </div>
                    </div>
                    <div className="detail-plane">
                      <svg
                        width="32"
                        height="33"
                        viewBox="0 0 32 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.5"
                          width="32"
                          height="32"
                          rx="4"
                          fill="#EBF6F2"
                        />
                        <path
                          d="M20.5222 8.75C20.8302 8.75 21.1255 8.87233 21.3433 9.09008C21.561 9.30783 21.6833 9.60317 21.6833 9.91111V25.0056H23.425C23.579 25.0056 23.7266 25.0667 23.8355 25.1756C23.9444 25.2845 24.0056 25.4321 24.0056 25.5861C24.0056 25.7401 23.9444 25.8878 23.8355 25.9966C23.7266 26.1055 23.579 26.1667 23.425 26.1667H8.33056C8.17658 26.1667 8.02892 26.1055 7.92004 25.9966C7.81117 25.8878 7.75 25.7401 7.75 25.5861C7.75 25.4321 7.81117 25.2845 7.92004 25.1756C8.02892 25.0667 8.17658 25.0056 8.33056 25.0056H10.0722V9.91111C10.0722 9.60317 10.1946 9.30783 10.4123 9.09008C10.6301 8.87233 10.9254 8.75 11.2333 8.75H20.5222ZM18.2 19.2C18.5079 19.2 18.8033 19.0777 19.021 18.8599C19.2388 18.6422 19.3611 18.3468 19.3611 18.0389C19.3611 17.7309 19.2388 17.4356 19.021 17.2179C18.8033 17.0001 18.5079 16.8778 18.2 16.8778C17.8921 16.8778 17.5967 17.0001 17.379 17.2179C17.1612 17.4356 17.0389 17.7309 17.0389 18.0389C17.0389 18.3468 17.1612 18.6422 17.379 18.8599C17.5967 19.0777 17.8921 19.2 18.2 19.2Z"
                          fill="#8DD3BB"
                        />
                      </svg>
                      <div>
                        <div style={{ color: "gray" }}>Gate</div>
                        <h4 style={{ margin: "0" }}>{datas.flight.gate}</h4>
                      </div>
                    </div>
                    <div className="detail-plane">
                      <svg
                        width="32"
                        height="33"
                        viewBox="0 0 32 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.5"
                          width="32"
                          height="32"
                          rx="4"
                          fill="#EBF6F2"
                        />
                        <path
                          d="M11.9568 10.9592C11.2418 10.2442 11.2418 9.07999 11.9568 8.36499C12.6718 7.64999 13.836 7.64999 14.551 8.36499C15.266 9.07999 15.266 10.2442 14.551 10.9592C13.8268 11.6833 12.6718 11.6833 11.9568 10.9592ZM10.4993 20.6667V13.3333C10.4993 12.8292 10.0868 12.4167 9.58268 12.4167C9.07852 12.4167 8.66602 12.8292 8.66602 13.3333V20.6667C8.66602 23.1967 10.7193 25.25 13.2493 25.25H17.8327C18.3368 25.25 18.7493 24.8375 18.7493 24.3333C18.7493 23.8292 18.3368 23.4167 17.8327 23.4167H13.2493C11.7277 23.4167 10.4993 22.1883 10.4993 20.6667ZM22.6727 23.7375L19.2168 20.2817C18.8777 19.9425 18.4102 19.75 17.9243 19.75H15.541V16.3767C16.5402 17.1925 17.9793 17.935 19.391 18.2283C20.0052 18.3567 20.5827 17.8983 20.5827 17.275C20.5827 16.7892 20.2252 16.395 19.7393 16.3125C18.4377 16.0925 17.0993 15.3867 16.3018 14.5067L15.0185 13.0858C14.8443 12.8933 14.6243 12.7375 14.386 12.6275C14.1202 12.4992 13.8177 12.4167 13.506 12.4167H13.4785C12.3418 12.4167 11.416 13.3425 11.416 14.4792V19.75C11.416 21.2717 12.6443 22.5 14.166 22.5H18.8135L21.3618 25.0483C21.7193 25.4058 22.3152 25.4058 22.6727 25.0483C23.0393 24.6908 23.0393 24.1042 22.6727 23.7375Z"
                          fill="#8DD3BB"
                        />
                      </svg>
                      <div>
                        <div style={{ color: "gray" }}>Seat no.</div>
                        <h4 style={{ margin: "0" }}>{datas.flight.seatNo}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="info-main-code">
                    <svg
                      width="61"
                      height="59"
                      viewBox="0 0 61 59"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.848 18.412H18.984V21.836H7.848V18.412ZM8.168 28.012H20.808V31.5H4.008V9.1H20.36V12.588H8.168V28.012ZM29.1575 26.22L28.9335 21.292L40.6775 9.1H45.3495L35.5895 19.468L33.2855 21.996L29.1575 26.22ZM25.4455 31.5V9.1H29.6055V31.5H25.4455ZM41.0615 31.5L32.4855 21.292L35.2375 18.252L45.9255 31.5H41.0615Z"
                        fill="#112211"
                      />
                      <path
                        opacity="0.6"
                        d="M0.988 55.5L4.792 47.1H5.98L9.796 55.5H8.536L5.14 47.772H5.62L2.224 55.5H0.988ZM2.608 53.4L2.932 52.44H7.66L8.008 53.4H2.608ZM11.0491 55.5V47.1H14.8171C15.7851 47.1 16.5291 47.296 17.0491 47.688C17.5691 48.072 17.8291 48.6 17.8291 49.272C17.8291 49.728 17.7251 50.112 17.5171 50.424C17.3171 50.736 17.0451 50.976 16.7011 51.144C16.3571 51.312 15.9851 51.396 15.5851 51.396L15.8011 51.036C16.2811 51.036 16.7051 51.12 17.0731 51.288C17.4411 51.456 17.7331 51.704 17.9491 52.032C18.1651 52.352 18.2731 52.752 18.2731 53.232C18.2731 53.952 18.0011 54.512 17.4571 54.912C16.9211 55.304 16.1211 55.5 15.0571 55.5H11.0491ZM12.2491 54.528H15.0091C15.6731 54.528 16.1811 54.416 16.5331 54.192C16.8851 53.968 17.0611 53.616 17.0611 53.136C17.0611 52.648 16.8851 52.292 16.5331 52.068C16.1811 51.844 15.6731 51.732 15.0091 51.732H12.1411V50.76H14.7091C15.3171 50.76 15.7891 50.648 16.1251 50.424C16.4611 50.2 16.6291 49.864 16.6291 49.416C16.6291 48.968 16.4611 48.632 16.1251 48.408C15.7891 48.184 15.3171 48.072 14.7091 48.072H12.2491V54.528ZM23.8871 55.596C23.2471 55.596 22.6551 55.492 22.1111 55.284C21.5751 55.068 21.1071 54.768 20.7071 54.384C20.3151 53.992 20.0071 53.536 19.7831 53.016C19.5591 52.496 19.4471 51.924 19.4471 51.3C19.4471 50.676 19.5591 50.104 19.7831 49.584C20.0071 49.064 20.3191 48.612 20.7191 48.228C21.1191 47.836 21.5871 47.536 22.1231 47.328C22.6671 47.112 23.2591 47.004 23.8991 47.004C24.5471 47.004 25.1431 47.116 25.6871 47.34C26.2391 47.556 26.7071 47.88 27.0911 48.312L26.3111 49.068C25.9911 48.732 25.6311 48.484 25.2311 48.324C24.8311 48.156 24.4031 48.072 23.9471 48.072C23.4751 48.072 23.0351 48.152 22.6271 48.312C22.2271 48.472 21.8791 48.696 21.5831 48.984C21.2871 49.272 21.0551 49.616 20.8871 50.016C20.7271 50.408 20.6471 50.836 20.6471 51.3C20.6471 51.764 20.7271 52.196 20.8871 52.596C21.0551 52.988 21.2871 53.328 21.5831 53.616C21.8791 53.904 22.2271 54.128 22.6271 54.288C23.0351 54.448 23.4751 54.528 23.9471 54.528C24.4031 54.528 24.8311 54.448 25.2311 54.288C25.6311 54.12 25.9911 53.864 26.3111 53.52L27.0911 54.276C26.7071 54.708 26.2391 55.036 25.6871 55.26C25.1431 55.484 24.5431 55.596 23.8871 55.596ZM29.6522 55.5V47.58L30.1682 48.144H27.7562V47.1H30.8402V55.5H29.6522ZM32.5456 55.5V54.684L35.9656 51.384C36.2696 51.096 36.4936 50.844 36.6376 50.628C36.7896 50.404 36.8896 50.2 36.9376 50.016C36.9936 49.824 37.0216 49.64 37.0216 49.464C37.0216 49.032 36.8696 48.692 36.5656 48.444C36.2616 48.196 35.8176 48.072 35.2336 48.072C34.7856 48.072 34.3816 48.148 34.0216 48.3C33.6616 48.444 33.3496 48.672 33.0856 48.984L32.2696 48.276C32.5896 47.868 33.0176 47.556 33.5536 47.34C34.0976 47.116 34.6936 47.004 35.3416 47.004C35.9256 47.004 36.4336 47.1 36.8656 47.292C37.2976 47.476 37.6296 47.744 37.8616 48.096C38.1016 48.448 38.2216 48.864 38.2216 49.344C38.2216 49.616 38.1856 49.884 38.1136 50.148C38.0416 50.412 37.9056 50.692 37.7056 50.988C37.5056 51.284 37.2176 51.616 36.8416 51.984L33.7936 54.924L33.5056 54.456H38.5816V55.5H32.5456ZM42.1362 55.596C41.5442 55.596 40.9682 55.504 40.4082 55.32C39.8562 55.136 39.4042 54.888 39.0522 54.576L39.6042 53.628C39.8842 53.892 40.2482 54.108 40.6962 54.276C41.1442 54.444 41.6242 54.528 42.1362 54.528C42.7602 54.528 43.2442 54.396 43.5882 54.132C43.9402 53.86 44.1162 53.496 44.1162 53.04C44.1162 52.6 43.9482 52.248 43.6122 51.984C43.2842 51.712 42.7602 51.576 42.0402 51.576H41.3682V50.736L43.8642 47.664L44.0322 48.144H39.4362V47.1H44.9802V47.916L42.4962 50.976L41.8722 50.604H42.2682C43.2842 50.604 44.0442 50.832 44.5482 51.288C45.0602 51.744 45.3162 52.324 45.3162 53.028C45.3162 53.5 45.2002 53.932 44.9682 54.324C44.7362 54.716 44.3842 55.028 43.9122 55.26C43.4482 55.484 42.8562 55.596 42.1362 55.596ZM46.3154 53.436V52.596L50.6114 47.1H51.9074L47.6474 52.596L47.0354 52.404H53.7434V53.436H46.3154ZM50.9834 55.5V53.436L51.0194 52.404V50.58H52.1474V55.5H50.9834ZM57.163 55.596C56.571 55.596 55.995 55.504 55.435 55.32C54.883 55.136 54.431 54.888 54.079 54.576L54.631 53.628C54.911 53.892 55.275 54.108 55.723 54.276C56.171 54.444 56.647 54.528 57.151 54.528C57.791 54.528 58.283 54.392 58.627 54.12C58.971 53.848 59.143 53.484 59.143 53.028C59.143 52.716 59.067 52.444 58.915 52.212C58.763 51.98 58.499 51.804 58.123 51.684C57.755 51.556 57.247 51.492 56.599 51.492H54.691L55.135 47.1H59.875V48.144H55.579L56.203 47.556L55.855 51.024L55.231 50.448H56.851C57.691 50.448 58.367 50.556 58.879 50.772C59.391 50.988 59.763 51.288 59.995 51.672C60.227 52.048 60.343 52.484 60.343 52.98C60.343 53.46 60.227 53.9 59.995 54.3C59.763 54.692 59.411 55.008 58.939 55.248C58.475 55.48 57.883 55.596 57.163 55.596Z"
                        fill="#112211"
                      />
                    </svg>
                    <svg
                      width="248"
                      height="81"
                      viewBox="0 0 248 81"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 16V65H18.0052V16H16ZM19.7227 16V65H20.2045V16H19.7227ZM20.8804 16V65H22.4047V16H20.8804ZM23.9535 16V65H24.604V16H23.9535ZM26.3225 16V65H26.8033V16H26.3225ZM27.0101 16V65H29.0026V16H27.0101ZM30.1983 16V65H31.2019V16H30.1983ZM33.1788 16V65H33.4012V16H33.1788ZM34.9314 16V65H35.6014V16H34.9314ZM37.3189 16V65H37.8007V16H37.3189ZM38.0075 16V65H40V16H38.0075Z"
                        fill="#112211"
                      />
                      <path
                        d="M40 16V65H42.0052V16H40ZM43.7227 16V65H44.2045V16H43.7227ZM44.8804 16V65H46.4047V16H44.8804ZM47.9535 16V65H48.604V16H47.9535ZM50.3225 16V65H50.8033V16H50.3225ZM51.0101 16V65H53.0026V16H51.0101ZM54.1983 16V65H55.2019V16H54.1983ZM57.1788 16V65H57.4012V16H57.1788ZM58.9314 16V65H59.6014V16H58.9314ZM61.3189 16V65H61.8007V16H61.3189ZM62.0075 16V65H64V16H62.0075Z"
                        fill="#112211"
                      />
                      <path
                        d="M64 16V65H66.0052V16H64ZM67.7227 16V65H68.2045V16H67.7227ZM68.8804 16V65H70.4047V16H68.8804ZM71.9535 16V65H72.604V16H71.9535ZM74.3225 16V65H74.8033V16H74.3225ZM75.0101 16V65H77.0026V16H75.0101ZM78.1983 16V65H79.2019V16H78.1983ZM81.1788 16V65H81.4012V16H81.1788ZM82.9314 16V65H83.6014V16H82.9314ZM85.3189 16V65H85.8007V16H85.3189ZM86.0075 16V65H88V16H86.0075Z"
                        fill="#112211"
                      />
                      <path
                        d="M88 16V65H90.0052V16H88ZM91.7227 16V65H92.2045V16H91.7227ZM92.8804 16V65H94.4047V16H92.8804ZM95.9535 16V65H96.604V16H95.9535ZM98.3225 16V65H98.8033V16H98.3225ZM99.0101 16V65H101.003V16H99.0101ZM102.198 16V65H103.202V16H102.198ZM105.179 16V65H105.401V16H105.179ZM106.931 16V65H107.601V16H106.931ZM109.319 16V65H109.801V16H109.319ZM110.007 16V65H112V16H110.007Z"
                        fill="#112211"
                      />
                      <path
                        d="M112 16V65H114.005V16H112ZM115.723 16V65H116.204V16H115.723ZM116.88 16V65H118.405V16H116.88ZM119.954 16V65H120.604V16H119.954ZM122.323 16V65H122.803V16H122.323ZM123.01 16V65H125.003V16H123.01ZM126.198 16V65H127.202V16H126.198ZM129.179 16V65H129.401V16H129.179ZM130.931 16V65H131.601V16H130.931ZM133.319 16V65H133.801V16H133.319ZM134.007 16V65H136V16H134.007Z"
                        fill="#112211"
                      />
                      <path
                        d="M136 16V65H138.005V16H136ZM139.723 16V65H140.204V16H139.723ZM140.88 16V65H142.405V16H140.88ZM143.954 16V65H144.604V16H143.954ZM146.323 16V65H146.803V16H146.323ZM147.01 16V65H149.003V16H147.01ZM150.198 16V65H151.202V16H150.198ZM153.179 16V65H153.401V16H153.179ZM154.931 16V65H155.601V16H154.931ZM157.319 16V65H157.801V16H157.319ZM158.007 16V65H160V16H158.007Z"
                        fill="#112211"
                      />
                      <path
                        d="M160 16V65H162.005V16H160ZM163.723 16V65H164.204V16H163.723ZM164.88 16V65H166.405V16H164.88ZM167.954 16V65H168.604V16H167.954ZM170.323 16V65H170.803V16H170.323ZM171.01 16V65H173.003V16H171.01ZM174.198 16V65H175.202V16H174.198ZM177.179 16V65H177.401V16H177.179ZM178.931 16V65H179.601V16H178.931ZM181.319 16V65H181.801V16H181.319ZM182.007 16V65H184V16H182.007Z"
                        fill="#112211"
                      />
                      <path
                        d="M184 16V65H186.005V16H184ZM187.723 16V65H188.204V16H187.723ZM188.88 16V65H190.405V16H188.88ZM191.954 16V65H192.604V16H191.954ZM194.323 16V65H194.803V16H194.323ZM195.01 16V65H197.003V16H195.01ZM198.198 16V65H199.202V16H198.198ZM201.179 16V65H201.401V16H201.179ZM202.931 16V65H203.601V16H202.931ZM205.319 16V65H205.801V16H205.319ZM206.007 16V65H208V16H206.007Z"
                        fill="#112211"
                      />
                      <path
                        d="M208 16V65H210.005V16H208ZM211.723 16V65H212.204V16H211.723ZM212.88 16V65H214.405V16H212.88ZM215.954 16V65H216.604V16H215.954ZM218.323 16V65H218.803V16H218.323ZM219.01 16V65H221.003V16H219.01ZM222.198 16V65H223.202V16H222.198ZM225.179 16V65H225.401V16H225.179ZM226.931 16V65H227.601V16H226.931ZM229.319 16V65H229.801V16H229.319ZM230.007 16V65H232V16H230.007Z"
                        fill="#112211"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", padding: "0 104px" }}>
          <Col span={24}>
            <h1>Terms and Conditions</h1>
            <h2>Payments</h2>
            <p>
              If you are purchasing your ticket using a debit or credit card via
              the Website, we will process these payments via the automated
              secure common payment gateway which will be subject to fraud
              screening purposes.
            </p>
            <p>
              If you do not supply the correct card billing address and/or
              cardholder information, your booking will not be confirmed and the
              overall cost may increase. We reserve the right to cancel your
              booking if payment is declined for any reason or if you have
              supplied incorrect card information. If we become aware of, or is
              notified of, any fraud or illegal activity associated with the
              payment for the booking, the booking will be cancelled and you
              will be liable for all costs and expenses arising from such
              cancellation, without prejudice to any action that may be taken
              against us.
            </p>
            <p>
              Golobe may require the card holder to provide additional payment
              verification upon request by either submitting an online form or
              visiting the nearest Golobe office, or at the airport at the time
              of check-in. Golobe reserves the right to deny boarding or to
              collect a guarantee payment (in cash or from another credit card)
              if the card originally used for the purchase cannot be presented
              by the cardholder at check-in or when collecting the tickets, or
              in the case the original payment has been withheld or disputed by
              the card issuing bank. Credit card details are held in a secured
              environment and transferred through an internationally accepted
              system.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our Website or our Terms of Use,
              please contact:
              <br></br>Golobe Group Q.C.S.C
              <br></br>Golobe Tower
              <br></br>P.O. Box: 22550
              <br></br>Doha, State of Qatar
              <br></br>Further contact details can be found at golobe.com/help
            </p>
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
export default FlightResult;
