import React,{useState} from 'react'
import {Link} from 'react-router-dom'

function Homepage() {
    const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);  // Add the selected file to the FormData

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,  // Send the FormData as the body of the POST request
      });

      const result = await response.json();
      alert(result.MessagePort || result.error);  // Handle success or error response
    } catch (err) {
      console.error('Upload error:', err);
    }
  };
  return (
    <div>
        <h1>Upload..!</h1>
        <Link to='/viewfile'>View</Link>
        <form onSubmit={handleSubmit}>
            <input type='file' name='file' onChange={(e) => setFile(e.target.files[0])}required></input>
            <button type='submit'>Upload</button>
        </form>
    </div>
  )
}

export default Homepage