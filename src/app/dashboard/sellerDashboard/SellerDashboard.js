import { Container, Content, Footer, Header } from "rsuite";
import { useState } from "react";
import SellerNavbar from "./SellerNavbar";

const SellerDashboard = () => {
  const [activeKey, setActiveKey] = useState("listed-product");

  return (
    <Container>
      <SellerNavbar activeKey={activeKey} setActiveKey={setActiveKey} />
      <Container>
        <Header>{activeKey}</Header>
        <Content>
          {activeKey == "listed-product" && (
            <div>
              <h2>Listed Product</h2>
            </div>
          )}

          {activeKey == "add-product" && (
            <div>
              <h2>Add Product</h2>
            </div>
          )}
        </Content>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  );
};

export default SellerDashboard;
