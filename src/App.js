import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Nav from "./components/Nav";
import Testing from "./pages/Testing";

function App() {
  return (
  <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </Router>
    )
}

export default App;
