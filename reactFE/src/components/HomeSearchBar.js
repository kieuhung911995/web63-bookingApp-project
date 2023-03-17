import { Tabs } from "antd";
import { Button, Row, Col, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsSearch } from "../redux/selecterSlice";

import "../styles/HomeSearchBar.css";

import FlightSearchInput from "./FlightSearchInput";
import StaySearch from "./search-tab/StaySearch";

const HomeSearchBar = ({ params }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    dispatch(setIsSearch(true));
    navigate("/flight/list");
  };
  const onChange = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="label">
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
          <h4>Flight</h4>
        </div>
      ),
      children: (
        <Form style={{ marginTop: "30px" }}>
          <Row gutter={[16, 24]}>
            <FlightSearchInput />
            <Col span={4} offset={17}>
              <div>
                <Button className="hidden-button" type="link">
                  <PlusOutlined />
                  Add Promo Code
                </Button>
              </div>
            </Col>
            <Col span={3}>
              <div className="show-result-button-container">
                <Button className="large-button" onClick={handleNavigate}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.46858 13.9999H8.49983C8.65427 14.0008 8.80542 13.9552 8.9336 13.8691C9.06178 13.7829 9.16108 13.6602 9.21858 13.5168L9.19666 13.5085L9.19674 13.5083C9.14098 13.6472 9.04474 13.7661 8.92052 13.8496C8.79624 13.9331 8.64971 13.9774 8.49996 13.9765H8.49983H8.4691M8.46858 13.9999L8.46963 13.9765C8.46945 13.9765 8.46928 13.9765 8.4691 13.9765M8.46858 13.9999V13.9765H8.4691M8.46858 13.9999L8.4691 13.9765M8.4691 13.9765C8.17379 13.963 7.92874 13.7657 7.83168 13.4845L7.83151 13.484C7.82949 13.4786 7.82777 13.4734 7.82603 13.4676L7.82617 13.4675L7.82513 13.4651L5.99283 9.17318C5.96895 9.09376 5.9662 9.00949 5.98487 8.92868C6.00363 8.84747 6.04336 8.7726 6.1001 8.71155L8.4691 13.9765ZM13.7645 0.236791C13.8636 0.33626 13.9317 0.462305 13.9607 0.599682C13.9896 0.737059 13.9781 0.879884 13.9276 1.01088L13.9276 1.01102L9.19683 13.5081L6.10012 8.71152L12.5164 1.82901C12.5165 1.82891 12.5166 1.82882 12.5167 1.82872C12.5393 1.80608 12.5572 1.77924 12.5694 1.74972C12.5817 1.72007 12.588 1.68829 12.588 1.65619C12.588 1.62409 12.5817 1.59231 12.5694 1.56266C12.5571 1.533 12.5391 1.50606 12.5164 1.48337C12.4937 1.46067 12.4668 1.44267 12.4371 1.43038C12.4075 1.4181 12.3757 1.41178 12.3436 1.41178C12.3115 1.41178 12.2797 1.4181 12.25 1.43038C12.2205 1.44261 12.1937 1.46051 12.1711 1.48307C12.171 1.48317 12.1709 1.48327 12.1708 1.48337L5.28512 7.89933C5.22406 7.95608 5.14918 7.99582 5.06797 8.01458C4.98716 8.03325 4.90288 8.03051 4.82347 8.00663L0.534033 6.17495L0.534076 6.17485L0.531912 6.17416L0.519453 6.17021C0.519391 6.17019 0.519329 6.17017 0.519268 6.17015C0.377472 6.12266 0.25378 6.03258 0.165074 5.91219C0.0763296 5.79175 0.0269276 5.64685 0.0236156 5.49728C0.0203037 5.34771 0.0632432 5.20077 0.14657 5.07652C0.228717 4.95403 0.346169 4.85948 0.483266 4.80537V4.80625L0.491562 4.80311L12.9925 0.0715461L12.9925 0.0715329C13.1235 0.0217435 13.266 0.0108564 13.4029 0.0401821C13.5399 0.0695044 13.6654 0.13778 13.7645 0.236791ZM13.7645 0.236791C13.7645 0.236803 13.7645 0.236814 13.7645 0.236826L13.7811 0.220251L13.7645 0.236791Z"
                      fill="black"
                      stroke="#112211"
                      strokeWidth="0.046875"
                    />
                  </svg>
                  <span>Show Flights</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      key: "2",
      label: (
        <div className="label">
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.25 7.81406C18.7772 7.60651 18.2664 7.49955 17.75 7.5H4.25C3.73368 7.4995 3.22288 7.60629 2.75 7.81359C2.08166 8.10587 1.51294 8.58652 1.11336 9.1968C0.713775 9.80708 0.500639 10.5205 0.5 11.25V16.5C0.5 16.6989 0.579018 16.8897 0.71967 17.0303C0.860322 17.171 1.05109 17.25 1.25 17.25C1.44891 17.25 1.63968 17.171 1.78033 17.0303C1.92098 16.8897 2 16.6989 2 16.5V16.125C2.00122 16.0259 2.04112 15.9312 2.11118 15.8612C2.18124 15.7911 2.27592 15.7512 2.375 15.75H19.625C19.7241 15.7512 19.8188 15.7911 19.8888 15.8612C19.9589 15.9312 19.9988 16.0259 20 16.125V16.5C20 16.6989 20.079 16.8897 20.2197 17.0303C20.3603 17.171 20.5511 17.25 20.75 17.25C20.9489 17.25 21.1397 17.171 21.2803 17.0303C21.421 16.8897 21.5 16.6989 21.5 16.5V11.25C21.4993 10.5206 21.2861 9.80726 20.8865 9.19707C20.4869 8.58688 19.9183 8.1063 19.25 7.81406ZM16.625 0.75H5.375C4.67881 0.75 4.01113 1.02656 3.51884 1.51884C3.02656 2.01113 2.75 2.67881 2.75 3.375V6.75C2.75002 6.77906 2.75679 6.80771 2.76979 6.8337C2.78278 6.85969 2.80163 6.8823 2.82486 6.89976C2.84809 6.91721 2.87505 6.92903 2.90363 6.93428C2.93221 6.93953 2.96162 6.93806 2.98953 6.93C3.39896 6.81025 3.82341 6.74964 4.25 6.75H4.44828C4.49456 6.75029 4.53932 6.73346 4.57393 6.70274C4.60855 6.67202 4.63058 6.62958 4.63578 6.58359C4.67669 6.21712 4.85115 5.87856 5.12586 5.63256C5.40056 5.38656 5.75625 5.25037 6.125 5.25H8.75C9.11899 5.25003 9.47503 5.38606 9.75002 5.63209C10.025 5.87812 10.1997 6.21688 10.2406 6.58359C10.2458 6.62958 10.2679 6.67202 10.3025 6.70274C10.3371 6.73346 10.3818 6.75029 10.4281 6.75H11.5747C11.621 6.75029 11.6657 6.73346 11.7003 6.70274C11.735 6.67202 11.757 6.62958 11.7622 6.58359C11.8031 6.21736 11.9773 5.87899 12.2517 5.63303C12.5261 5.38706 12.8815 5.25072 13.25 5.25H15.875C16.244 5.25003 16.6 5.38606 16.875 5.63209C17.15 5.87812 17.3247 6.21688 17.3656 6.58359C17.3708 6.62958 17.3929 6.67202 17.4275 6.70274C17.4621 6.73346 17.5068 6.75029 17.5531 6.75H17.75C18.1766 6.74979 18.6011 6.81057 19.0105 6.93047C19.0384 6.93854 19.0679 6.94 19.0965 6.93473C19.1251 6.92945 19.1521 6.91759 19.1753 6.90009C19.1986 6.88258 19.2174 6.8599 19.2304 6.83385C19.2433 6.8078 19.2501 6.7791 19.25 6.75V3.375C19.25 2.67881 18.9734 2.01113 18.4812 1.51884C17.9889 1.02656 17.3212 0.75 16.625 0.75Z"
              fill="#112211"
            />
          </svg>
          <h4>Stay</h4>
        </div>
      ),
      children: <StaySearch params={params} />,
    },
  ];
  return (
    <div className="HomeSearchBar">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabBarStyle={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 16px rgba(17, 34, 17, 0.05)",
          borderRadius: "12px",
          paddingLeft: "24px",
        }}
        tabBarGutter="50px"
      />
    </div>
  );
};
export default HomeSearchBar;
