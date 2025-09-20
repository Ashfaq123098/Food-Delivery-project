import React, { useState } from "react";
import axios from "axios";
import upload from "../../assets/download.png";
import "./Add.css";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const [success, setSuccess] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!data.name.trim() || !data.description.trim() || !data.price.toString().trim()) {
      alert("❌ Please fill all fields properly!");
      return;
    }

    if (!image) {
      alert("❌ Please upload an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", image);

      const res = await axios.post("http://localhost:4000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);

        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);

        onNewProduct?.(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product. Check server or network!");
    }
  };

  return (
    <div className="add">
      <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="upload-img"
              src={image ? URL.createObjectURL(image) : upload}
              alt="upload"
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </div>

        <div className="add-input">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type Here"
            required
          />
        </div>

        <div className="add-input">
          <label>Product Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Write Content Here"
            rows="5"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-input">
            <label>Category</label>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Street Food">Street Food</option>
              <option value="Desserts">Desserts</option>
              <option value="Cake">Cake</option>
              <option value="Beverage">Beverage</option>
              <option value="Snacks">Snacks</option>
              <option value="Pizza">Pizza</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-input">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="$20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">Add Product</button>
        {success && <p className="success-msg">✅ Product Added Successfully!</p>}
      </form>
    </div>
  );
};

export default Add;
