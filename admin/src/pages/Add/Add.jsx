import React, { useState } from "react";
import axios from "axios";
import upload from "../../assets/download.png";
import "./Add.css";

const Add = ({ onNewProduct }) => {
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
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    
    if (!data.name.trim() || !data.description.trim() || !data.price.toString().trim()) {
      alert("❌ Please fill all fields properly (no spaces only)!");
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
       
        alert("✅ Product Added Successfully!");

        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);

        // Reset form
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);

        // Notify parent
        onNewProduct(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product. Check server or network!");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="upload"
              src={image ? URL.createObjectURL(image) : upload}
              alt="upload"
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={e => setImage(e.target.files[0])}
            hidden
            required
          />
        </div>

        <div className="add product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            required
            placeholder="Type Here"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            required
            rows="6"
            placeholder="Write Content Here"
          ></textarea>
        </div>

        <div className="add-category0-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              <option value="Noodles">Noodles</option>
              <option value="Roll">Roll</option>
              <option value="Chicken">Chicken</option>
              <option value="FrenchFry">FrenchFry</option>
              <option value="Fried Rice">Fried Rice</option>
              <option value="Chatpati">Chatpati</option>
              <option value="Fuchka">Fuchka</option>
              <option value="Cake">Cake</option>
              <option value="Nachos">Nachos</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              required
              placeholder="$20"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">Add</button>

        {/* In-component success message */}
        {success && <p className="success-msg">✅ Product Added Successfully!</p>}
      </form>
    </div>
  );
};

export default Add;


