import { Link, useLocation, useNavigate } from "react-router-dom";
import Arrow from "../components/svgs/Arrow.svg";
import { useState } from "react";

const Analysis = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <main className="analysis-container">
      <div className="analysis-header">
        <h2>A. I. ANALYSIS</h2>
        <p>A. I. HAS ESTIMATED THE FOLLOWING.</p>
        <p>FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </div>

      <div className="analysis-diamond-wrapper">
        <div
          className={`dotted-square outermost ${
            hoveredCard === "weather" ? "visible" : ""
          }`}
        ></div>
        <div
          className={`dotted-square outer ${
            hoveredCard === "skin" || hoveredCard === "cosmetic"
              ? "visible"
              : ""
          }`}
        ></div>
        <div
          className={`dotted-square inner ${
            hoveredCard === "demographics" ? "visible" : ""
          }`}
        ></div>

        <div className="diamond-grid" onMouseLeave={() => setHoveredCard(null)}>
          <Link
            to="/summary"
            state={{ demographics: state.demographics }}
            className="analysis-card demographics"
            onMouseEnter={() => setHoveredCard("demographics")}
          >
            <div className="card-content">DEMOGRAPHICS</div>
          </Link>
          <div
            className="analysis-card disabled"
            onMouseEnter={() => setHoveredCard("skin")}
          >
            <div className="card-content">SKIN TYPE DETAILS</div>
          </div>
          <div
            className="analysis-card disabled"
            onMouseEnter={() => setHoveredCard("cosmetic")}
          >
            <div className="card-content">COSMETIC CONCERNS</div>
          </div>
          <div
            className="analysis-card disabled"
            onMouseEnter={() => setHoveredCard("weather")}
          >
            <div className="card-content">WEATHER</div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate("/result")} className="testing-bottom-left">
        <img src={Arrow} alt="back arrow" className="arrow-svg left-arrow" />
        <span>BACK</span>
      </button>

      <button onClick={() => navigate("/summary")} className="testing-bottom-right">
        <span>GET SUMMARY</span>
        <img src={Arrow} alt="proceed arrow" className="arrow-svg right-arrow" />
      </button>
    </main>
  );
};

export default Analysis;