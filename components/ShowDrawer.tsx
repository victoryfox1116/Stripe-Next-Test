import type { NextPage } from "next";
import React from "react";
import { Drawer } from "antd";
import Cart from "../components/Cart";
import CartSummary from "../components/CartSummary";

interface ShowDrawerProps {
  onClose: () => void;
  open: boolean;
}

const ShowDrawer: NextPage<ShowDrawerProps> = ({ onClose, open }) => (
  <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
    <Cart>
      <CartSummary />
    </Cart>
  </Drawer>
);

export default ShowDrawer;
