import request from "../../../utils/request";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Typography,
  Row,
  Col,
  Checkbox,
  Slider,
  Collapse,
  Button,
  ConfigProvider,
} from "antd";

const { Text } = Typography;

const ResultFilter = ({ queryParams }) => {
  const [amenities, setAmenities] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getAmenities = () => {
      request
        .get("/api/stay/amenity")
        .then((result) => {
          setAmenities(result.data);
        })
        .catch((err) => console.error(err));
    };
    getAmenities();
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSelectValue = async (value) => {
    setSearchParams({ ...queryParams, amenities: value });
  };

  const handleSliderChange = (value) => {
    setSearchParams({
      ...queryParams,
      minPriceFilter: value[0],
      maxPriceFilter: value[1],
    });
  };

  return (
    <div className="result-filter">
      <Text className="montserrat-semibold-20px">Filters</Text>
      <ConfigProvider theme={{ components: { Collapse: { padding: 0 } } }}>
        <Collapse
          expandIconPosition="end"
          style={{ background: "#FAFAFA" }}
          bordered={false}
        >
          <Collapse.Panel
            header={
              <Text className="montserrat-semibold-16px">Price Range</Text>
            }
            key="1"
          >
            <div className="collapse-panel-items">
              <Slider
                range={true}
                min={100}
                max={600}
                onAfterChange={handleSliderChange}
                defaultValue={[100, 600]}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>$100</span>
                <span>$600</span>
              </div>
            </div>
          </Collapse.Panel>

          <Collapse.Panel
            header={
              <>
                <Text className="montserrat-semibold-16px">Rating</Text>
              </>
            }
            key="2"
          >
            <div className="collapse-panel-items">
              <Row gutter={16}>
                {" "}
                {Array.from(Array(5).keys()).map((element, index) => {
                  return (
                    <div key={index}>
                      <Col>
                        <Button
                          style={{
                            width: "40px",
                            height: "32px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {element} +
                        </Button>
                      </Col>
                    </div>
                  );
                })}
              </Row>
            </div>
          </Collapse.Panel>

          <Collapse.Panel
            header={
              <>
                <Text className="montserrat-semibold-16px">Amenities</Text>
              </>
            }
            key="4"
          >
            <div className="collapse-panel-items">
              <Checkbox.Group onChange={handleSelectValue}>
                <Row style={{ flexDirection: "column" }}>
                  {amenities.map((element, index) => {
                    return (
                      <div key={index}>
                        <Col span={24}>
                          <Checkbox value={element.name}>
                            {capitalizeFirstLetter(element.name)}
                          </Checkbox>
                        </Col>
                      </div>
                    );
                  })}
                </Row>
              </Checkbox.Group>
            </div>
          </Collapse.Panel>
        </Collapse>
      </ConfigProvider>
    </div>
  );
};

export default ResultFilter;
