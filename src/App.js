import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Nav from "./components/Nav";
import Testing from "./pages/Testing";
import Result from "./pages/Result";

function App() {
  return (
  <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
    )
}

export default App;
