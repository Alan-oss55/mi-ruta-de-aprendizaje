import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PlaceDetail from "./pages/PlaceDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
