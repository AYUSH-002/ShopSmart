import "./ProductItem.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";

// eslint-disable-next-line react/prop-types
const ProductItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);

  const handleAddToCart = () => {
    if (token) {
      addToCart(id);
    } else {
      alert("Please log in to add items to the cart.");
    }
  };

  return (
    <div className="product-item">
      <div className="product-item-img-container">
        <img className="product-item-image" src={`${url}/images/${image}`} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div className="product-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAddToCart}
              src={assets.add_icon_green}
              alt="Add One More"
            />
          </div>
        )}
      </div>
      <div className="product-item-info">
        <div className="product-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="product-item-desc">{description}</p>
        <p className="product-item-price">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
