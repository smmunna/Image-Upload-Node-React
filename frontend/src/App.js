import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    const response = await fetch("http://localhost:5000/image", {
      method: "POST",
      body: formData,
    });
    if (response) setStatus(response.statusText);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  // Image= from MongoDB
  const [data, setData] = useState([]);
  const getImage = () => {
    axios
      .get("http://localhost:5000/show")
      .then((res) => setData(res.data))   //console.log(res.data)
      .catch(() => console.log("Something Wrong"));
  };

  return (
    <div className="App">
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width="100" height="100" />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="submit">Submit</button>
      </form>
      {status && <h4>{status}</h4>}

      {/* Showing the Image info from Database; */}

      <h1>Image Showing from MongoDB react</h1>
      <button onClick={getImage}>Get Image Data</button>
      {data.map((value, key) => {
        return (
          <div>
            <h3>ID: {value._id}</h3>
            {/* How to show image.... */}
          </div>
        );
      })}
    </div>
  );
}

export default App;
