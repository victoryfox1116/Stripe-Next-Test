import type { NextPage } from "next";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

interface HomeProps {
  showDrawer: () => void;
}

const Header: NextPage<HomeProps> = ({ showDrawer }) => (
  <div className="position-relative">
    <img src="/back.png" alt="back" className="header-image" />
    <button onClick={showDrawer} className="header-button">
      <ShoppingCartOutlined />
    </button>
  </div>
);

export default Header;
