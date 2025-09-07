import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Arrow from "../components/svgs/Arrow.svg";

const processData = (data, category) => {
  if (!data) return [];
  const mappedData = Object.entries(data)
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: Math.floor(value * 100),
    }));

  if (category === 'age') {
    return mappedData.sort((a, b) => a.name.localeCompare(b.name));
  }

  return mappedData.sort((a, b) => b.value - a.value);
};

const Summary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("race");
  const [displayItem, setDisplayItem] = useState(null);

  const sortedData = useMemo(() => ({
    race: processData(state?.demographics?.race, 'race'),
    age: processData(state?.demographics?.age, 'age'),
    gender: processData(state?.demographics?.gender, 'gender'),
  }), [state]);

  const [userSelections, setUserSelections] = useState({
    race: sortedData.race[0]?.name || "N/A",
    age: sortedData.age[0]?.name || "N/A",
    gender: sortedData.gender[0]?.name || "N/A",
  });

  useEffect(() => {
    if (sortedData[activeTab]?.length > 0) {
      setDisplayItem(sortedData[activeTab][0]);
    }
  }, [activeTab, sortedData]);

  const handleSelectionUpdate = (category, newSelection) => {
    setUserSelections((prev) => ({ ...prev, [category]: newSelection }));
  };

  if (!state?.demographics) {
    return (
      <main className="summary-container">
        <p>No analysis data found. Please upload an image first.</p>
        <button
          onClick={() => navigate("/result")}
          className="testing-bottom-left"
        >
          <img src={Arrow} alt="back arrow" className="arrow-svg left-arrow" />
          <span>GO BACK</span>
        </button>
      </main>
    );
  }

  const currentDisplayData = sortedData[activeTab];

  return (
    <main className="demographics-container">
      <div className="demographics-header">
        <h2>A. I. ANALYSIS</h2>
        <h1>DEMOGRAPHICS</h1>
        <p>PREDICTED RACE & AGE</p>
      </div>

      <div className="demographics-content">
        <aside className="demographics-sidebar">
          <div
            className={`sidebar-item ${activeTab === "race" ? "active" : ""}`}
            onClick={() => setActiveTab("race")}
          >
            <span className="item-value">{userSelections.race}</span>
            <span className="item-label">RACE</span>
          </div>
          <div
            className={`sidebar-item ${activeTab === "age" ? "active" : ""}`}
            onClick={() => setActiveTab("age")}
          >
            <span className="item-value">{userSelections.age}</span>
            <span className="item-label">AGE</span>
          </div>
          <div
            className={`sidebar-item ${activeTab === "gender" ? "active" : ""}`}
            onClick={() => setActiveTab("gender")}
          >
            <span className="item-value">{userSelections.gender}</span>
            <span className="item-label">SEX</span>
          </div>
        </aside>

        <section className="details-view">
          <div className="details-left">
            <h2>{displayItem?.name}</h2>
            <div
              className="circle-chart"
              style={{ "--percentage": `${displayItem?.value}%` }}
            >
              <span className="chart-value">{displayItem?.value || 0}%</span>
            </div>
          </div>
        </section>

        <div className="details-right">
          <header className="list-header">
            <span>{activeTab.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </header>
          <ul className="confidence-list">
            {currentDisplayData.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  handleSelectionUpdate(activeTab, item.name); 
                  setDisplayItem(item); 
                }}
                className={
                  userSelections[activeTab] === item.name ? "selected" : ""
                }
              >
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="demographics-footer">
        <button
          onClick={() => navigate("/analysis", { state: { demographics: state.demographics } })} 
          className="testing-bottom-left"
        >
          <img src={Arrow} alt="back arrow" className="arrow-svg left-arrow" />
          <span>BACK</span>
        </button>
        <p className="footer-note">
          If A.I. estimate is wrong, select the correct one.
        </p>
        <div className="footer-buttons">
          <button className="reset-btn">RESET</button>
          <button className="confirm-btn">CONFIRM</button>
        </div>
      </div>
    </main>
  );
};

export default Summary;
