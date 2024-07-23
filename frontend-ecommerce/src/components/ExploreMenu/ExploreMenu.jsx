// eslint-disable-next-line no-unused-vars
import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our categories</h1>
      <p className="explore-menu-text">
        Explore ShopSmart&apos;s diverse categories for all your needs, from fashion and electronics to home essentials and beauty products. Enjoy top-quality items at great prices with fast shipping and excellent customer service.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};


export default ExploreMenu;
