import { Nav, Sidebar, Sidenav } from "rsuite";
import {
  MdDashboard,
  MdGroup,
  MdSettings,
  MdOutlineStackedBarChart,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Icon } from "@rsuite/icons";

const SellerNavbar = ({ activeKey, setActiveKey }) => {
  const handleSelect = (e) => {
    console.log(e);
    setActiveKey(e);
  };

  return (
    <Sidebar
      style={{ display: "flex", flexDirection: "column" }}
      width={260}
      collapsible
    >
      <Sidenav defaultOpenKeys={["3"]} appearance="inverse">
        <Sidenav.Header>Header</Sidenav.Header>
        <Sidenav.Body>
          <Nav onSelect={handleSelect} activeKey={activeKey}>
            <Nav.Item
              eventKey="listed-product"
              icon={<Icon as={MdDashboard} />}
            >
              Listed Product
            </Nav.Item>
            <Nav.Item eventKey="add-product" icon={<Icon as={MdGroup} />}>
              Add Product
            </Nav.Item>
            <Nav.Menu
              eventKey="3"
              trigger="hover"
              title="Advanced"
              icon={<Icon as={MdOutlineStackedBarChart} />}
              placement="rightStart"
            >
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Brand</Nav.Item>
              <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
};

export default SellerNavbar;
