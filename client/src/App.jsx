import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header className="fixed-top" />
      <Home />
      <Footer />
    </>
  );
}

export default App;
