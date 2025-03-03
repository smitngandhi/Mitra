import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:5000/api/v1/get-username", {
  //         method: "GET",
  //         credentials: "include", // Ensure cookies are sent
  //       });

  //       const data = await response.json();
  //       if (response.ok) {
  //         setUsername(data.username); // ✅ Set username if authenticated
  //       } else {
  //         setUsername(null);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching username:", error);
  //       setUsername(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsername();


  //   const interval = setInterval(fetchUsername , 5000)

  //   return() => clearInterval(interval)
  // }, []);


  return (
    <nav className="flex justify-between items-center p-3 shadow-md">
      <h1 className="text-xl font-bold">MITRA</h1>
      <div className="flex items-center space-x-5 ml-auto">
        <a href="#" className="text-gray-600 hover:text-black">Services ▼</a>
        <a href="#" className="text-gray-600 hover:text-black">About Us</a>
        <a href="#" className="text-gray-600 hover:text-black">Contact Us</a>
      </div>
      <div className="flex items-center space-x-5 ml-6">
        {loading ? (
          <p>Loading...</p>
        ) : username ? (
          <div className="flex items-center space-x-4">
            <p className="text-indigo-600 font-semibold">Hello, {username}</p>
          </div>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 border rounded-md">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
