import Header from "./components/Header";
import Home from "./pages/Home";
import "./app.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header className="fixed-top" />
      {/* <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> */}
      <Home />
      <Footer/>
    </>
  );
}

export default App;
