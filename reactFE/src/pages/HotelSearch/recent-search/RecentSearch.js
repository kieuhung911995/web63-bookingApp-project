import { Typography } from "antd";
import React from "react";

import RecentSearchCard from "./RecentSearchCard";

const { Text } = Typography;

const RecentSearch = () => {
  return (
    <>
      <Text className="trade-gothic-lt-extended-bold-32px">
        Your Recent Searchs
      </Text>
      <RecentSearchCard />
    </>
  );
};

export default RecentSearch;
