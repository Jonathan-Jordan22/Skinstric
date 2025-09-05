import Arrow from "../components/svgs/Arrow.svg";
import DottedLine from "../components/svgs/Dotted Lines.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [hoverSide, setHoverSide] = useState(null);

  return (
    <main className="home-container">
      <div className="large-screen-view">
        <div
          className={`hover side-link left ${
            hoverSide === "right" ? "hidden" : ""
          }`}
          onMouseEnter={() => setHoverSide("left")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <img src={Arrow} alt="" className="arrow-svg left-arrow" />
          <span>DISCOVER A.I.</span>
        </div>

        <img
          src={DottedLine}
          alt=""
          className={`dotted-line left-line ${
            hoverSide === "right" ? "hidden" : ""
          }`}
        />

        <div className="hero-text-wrapper">
          <div
            className={`hero-text ${hoverSide === "left" ? "move-right" : ""} ${
              hoverSide === "right" ? "move-left" : ""
            }`}
          >
            <h1>Sophisticated</h1>
            <h1 className="skincare">skincare</h1>
          </div>
        </div>

        <Link to='/testing'
          className={`hover side-link right ${
            hoverSide === "left" ? "hidden" : ""
          }`}
          onMouseEnter={() => setHoverSide("right")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <span>TAKE TEST</span>
          <img src={Arrow} alt="" className="arrow-svg right-arrow" />
        </Link>

        <img
          src={DottedLine}
          alt=""
          className={`dotted-line right-line ${
            hoverSide === "left" ? "hidden" : ""
          }`}
        />

        <div className="bottom-text">
          <p>
            SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED
            ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
          </p>
        </div>
      </div>

       <div className="small-screen-view">
        <div className="large-dotted-square">
          <div className="small-dotted-square">
            <div className="card-content">
              <h1>Sophisticated</h1>
              <h1 className="skincare">skincare</h1>
              <p>
                SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED
                ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
              </p>
              <Link to='/testing' className="card-link">
                <span>ENTER EXPERIENCE</span>
                <img src={Arrow} alt="" className="arrow-svg right-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
