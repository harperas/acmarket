import {
  Container,
  Content,
  Footer,
  Header,
  Nav,
  Sidebar,
  Sidenav,
} from "rsuite";
import {
  MdDashboard,
  MdGroup,
  MdSettings,
  MdOutlineStackedBarChart,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Icon } from "@rsuite/icons";
import { useState } from "react";

const SellerDashboard = () => {
  const [activeKey, setActiveKey] = useState("view");

  const handleSelect = (e) => {
    console.log(e);
    setActiveKey(`content ${e}`);
  };

  return (
    <Container>
      <Sidebar
        style={{ display: "flex", flexDirection: "column" }}
        width={260}
        collapsible
      >
        <Sidenav defaultOpenKeys={["3"]} appearance="inverse">
          <Sidenav.Header>Header</Sidenav.Header>
          <Sidenav.Body>
            <Nav defaultActiveKey="1" onSelect={handleSelect}>
              <Nav.Item eventKey="1" icon={<Icon as={MdDashboard} />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Icon as={MdGroup} />}>
                User Group
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
              <Nav.Menu
                eventKey="4"
                trigger="hover"
                title="Settings"
                icon={<Icon as={MdSettings} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="4-1">Applications</Nav.Item>
                <Nav.Item eventKey="4-2">Websites</Nav.Item>
                <Nav.Item eventKey="4-3">Channels</Nav.Item>
                <Nav.Item eventKey="4-4">Tags</Nav.Item>
                <Nav.Item eventKey="4-5">Versions</Nav.Item>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
      <Container>
        <Header>Header</Header>
        <Content>{activeKey}</Content>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  );
};

export default SellerDashboard;
