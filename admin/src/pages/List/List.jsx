/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const url = "http://ec2-65-0-125-131.ap-south-1.compute.amazonaws.com:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      console.log(response.data);
      if (response.data.success && Array.isArray(response.data.data)) {
        setList(response.data.data);
      } else {
        toast.error("Error: No data found or data is not in expected format");
      }
    } catch (error) {
      toast.error("Error fetching the list");
      console.error("Error fetching the list:", error);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, {
        id: productId,
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing product");
      }
    } catch (error) {
      toast.error("Error removing product");
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeProduct(item._id)} className="cursor">
                X
              </p>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default List;
