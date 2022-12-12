import React, { useState } from "react";
import { NextPage } from "next";
import "antd/dist/reset.css";
import Cart from "../components/Cart";
import CartSummary from "../components/CartSummary";
import Products from "../components/Products";
import Header from "../components/Header";
import ShowDrawer from "../components/ShowDrawer";

const IndexPage: NextPage = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Header showDrawer={showDrawer} />
      <div className="page-container">
        <Cart>
          {/* <CartSummary /> */}
          <Products />
        </Cart>
      </div>
      <ShowDrawer onClose={onClose} open={open} />
    </div>
  );
};

export default IndexPage;
