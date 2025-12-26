import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ProductForm({
  setShowForm,
  fetchProducts,
  editProduct,
  setEditProduct,
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "",
    price: "",
    condition: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title || "",
        author: editProduct.author || "",
        type: editProduct.type || "",
        price: editProduct.price || "",
        condition: editProduct.condition || "",
        imageUrl: editProduct.imageUrl || "",
      });
    }
  }, [editProduct]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      price: Number(formData.price) || 0, // ini preshnam verarth gg NaN
    };

    try {
      if (editProduct) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/users/${editProduct.id}`,
          dataToSend
        );
        toast.success("Product updated!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/listings`, dataToSend);
        toast.success("Product added.");
      }
    } catch (err) {
      console.error("API Error:", err);
      toast.error("failed");
    }
    setShowForm(false);
    setEditProduct(null);

    setFormData({
      title: "",
      author: "",
      type: "",
      price: "",
      condition: "",
      imageUrl: "",
    });

    fetchProducts();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editProduct ? "Update Product" : "Add Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          placeholder="Condition"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          {editProduct ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setEditProduct && setEditProduct(null);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
