// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SkinCareList from './pages/SkinCareList';
import FetchSkinCareList from './pages/SkinCareList';
import SkinCareForm from './pages/SkinCareForm';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Categories from './pages/Categories';
import { useState } from "react"; 
import Contact from './pages/Contact';
import VideoRecommendations from './pages/VideoRecommendations';


function App() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category

  return (
    <BrowserRouter>
      <div className="App">
      <Navbar setSelectedCategory={setSelectedCategory} /> 
      <Routes>
        <Route path="/" element={<Home selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} /> 
        <Route path="/add" element={<SkinCareForm />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/categories" element={<Categories setSelectedCategory={setSelectedCategory} />} />
          <Route path="/skincare" element={<FetchSkinCareList selectedCategory={selectedCategory} />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/videos" element={<VideoRecommendations />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;