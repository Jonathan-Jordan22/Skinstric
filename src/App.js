import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Nav from "./components/Nav";
import Testing from "./pages/Testing";
import Result from "./pages/Result";
import Analysis from "./pages/Analysis";
import Summary from "./pages/Summary";

function App() {
  return (
  <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
    )
}

export default App;
