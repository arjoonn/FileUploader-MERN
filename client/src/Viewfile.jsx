import React, { useState } from "react";

function Viewfile() {
  const [filename, setFileName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/file/name/${encodeURIComponent(filename)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error("File not found");
       }

      //displaying file in new tab
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Open in new tab and handle potential popup blocking
      const newWindow = window.open();
      if (newWindow) {
        newWindow.location.href = url;
      } else {
        alert("Please allow popups for this site");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter the ID</label>
        <input
          type="text"
          placeholder="enter the name"
          required
          value={filename}
          onChange={(e) => setFileName(e.target.value)}
        ></input>
        <button type="submit">View</button>
      </form>
    </div>
  );
}

export default Viewfile;
