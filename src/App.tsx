import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [urlData, setURLData] = useState(null);
  const fetchURLData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setURLData(null);
    const value = event.target.value;
    if (!value) {
      return;
    }

    try {
      const urlDataResponse = await axios.post("http://localhost:4000/fetch", {
        url: value,
      });

      const responseData = urlDataResponse.data;

      if (responseData.parsedTags) {
        setURLData({ ...responseData.parsedTags, url: responseData.url });
      }
    } catch (err) {
      setURLData(null);
    }
  };
  return (
    <div className="App">
      <label className="url-preview-container">
        {urlData && (
          <div className="url-preview">
            <img src={urlData["og:image"]} />
            <div>
              <a href={urlData['url']} target="_blank" className="og-title">{urlData["og:title"]}</a>
              <p className="og-description truncate">{urlData["og:description"]}</p>
            </div>
          </div>
        )}
        <input onChange={fetchURLData} placeholder="Enter URL"/>
      </label>
    </div>
  );
}

export default App;
