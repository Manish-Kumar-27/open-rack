import React, { useState } from "react";
import "./HomePage.css";
import { FiMenu, FiX, FiBookOpen, FiBookmark, FiUser,FiSearch } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im"; // 🌀 Spinner icon
import ContinueReading from "../../components/continueReading/continueReading";

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    rating: 4.5,
    progress:80,
    summary: "A guide to building good habits and breaking bad ones.",
    cover: "https://covers.openlibrary.org/b/id/10417315-L.jpg",
    progress: 75,
  },{
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    rating: 4.5,
    summary: "A guide to building good habits and breaking bad ones.",
    cover: "https://covers.openlibrary.org/b/id/10417315-L.jpg",
    progress: 75,
  },{
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    rating: 4.5,
    summary: "A guide to building good habits and breaking bad ones.",
    cover: "https://covers.openlibrary.org/b/id/10417315-L.jpg",
    progress: 75,
  },
];
const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchClick = () => {
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
    // TODO: add actual search logic here
  }, 1500); // Simulated delay
};
  return (
    <div className="pageWrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="leftNav">
          <button className="menuButton" onClick={toggleSidebar}>
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className="searchContainer">
  <FiSearch className="searchIcon" />
  <input
    className="searchInputWithButton"
    type="text"
    placeholder="Search books..."
    value={searchTerm}
    onChange={handleSearchChange}
  />
{isLoading ? (
    <ImSpinner2 className="searchSpinner" />
  ) : (
    <button className="searchInlineButton" onClick={handleSearchClick}>
      Search
    </button>
  )}
</div>

        </div>
        <div className="brand">OpenRack</div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && <div className="backdrop" onClick={closeSidebar} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebarOpen" : ""}`}>
        <ul className="sidebarList">
          <li>
            <FiBookOpen /> Library
          </li>
          <li>
            <FiBookmark /> Bookmarks
          </li>
          <li>
            <FiUser /> Profile
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="mainContent">
        <h1>Welcome to OpenRack</h1>
        <p>
          This is your personalized e-book experience. Use the sidebar to
          explore.
        </p>
        <ContinueReading books={books} />
      </main>
    </div>
  );
};

export default HomePage;
