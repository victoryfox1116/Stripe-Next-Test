import React, { useState } from "react";
import products from "../data/products";
import { formatCurrencyString } from "use-shopping-cart";
import { useShoppingCart } from "use-shopping-cart";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;

const Products = () => {
  const { addItem, removeItem, cartDetails } = useShoppingCart();
  const [filterText, setFilterText] = useState("");

  const onSearch = (value: string) => setFilterText(value);

  return (
    <div>
      <div className="text-center topic-style">
        <label>Browse teh Catalogue</label>
      </div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: "100%" }}
      />
      <section className="products">
        {products
          .filter((product) => product.name.includes(filterText))
          .map((product) => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p className="price">
                {formatCurrencyString({
                  value: product.price,
                  currency: product.currency,
                })}
              </p>
              <button
                className="cart-style-background"
                onClick={() => {
                  console.log(product);
                  addItem(product);
                }}
                disabled={
                  cartDetails
                    ? Object.keys(cartDetails).includes(product.id)
                      ? true
                      : false
                    : false
                }
              >
                Add to cart
              </button>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Products;
