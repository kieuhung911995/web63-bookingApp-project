import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSortItem } from "../redux/sorterSlice";

const TicketDropdown = () => {
  const sortItem = useSelector((state) => state.sorter.sortItem);
  const dispatch = useDispatch();
  const items = [
    {
      label: (
        <a
          href="/#"
          onClick={(e) => {
            handleItemClick(e);
          }}
        >
          Cheapest
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          href="/#"
          onClick={(e) => {
            handleItemClick(e);
          }}
        >
          Recommended
        </a>
      ),
      key: "1",
    },
  ];
  const handleItemClick = (e) => {
    e.preventDefault();
    dispatch(setSortItem(e.target.innerText));
  };

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a href="/#" onClick={(e) => e.preventDefault()}>
        <Space>
          {sortItem}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default TicketDropdown;
