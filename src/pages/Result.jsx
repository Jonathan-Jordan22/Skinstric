import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Arrow from "../components/svgs/Arrow.svg";
import CameraIcon from "../components/svgs/camera.svg";
import GalleryIcon from "../components/svgs/gallery.svg";
import GalleryLine from "../components/svgs/gallery line.svg";
import CameraLine from "../components/svgs/camera line.svg";

const Result = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const galleryInputRef = useRef(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scaleFactor = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleFactor;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        const base64String = resizedBase64.split(",")[1];

        submitImage(base64String);
      };
      img.onerror = () => setError("The selected file is not a valid image.");
    };
    reader.onerror = () => setError("Failed to read the file.");
  };

  const requestCameraAndNavigate = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      navigate("/camera");
    } catch (err) {
      console.error("Camera access denied.", err);
      setShowPermissionModal(false);
    }
  };

  const submitImage = async (base64Image) => {
    setLoading(true);
    setError("");

    try {
      if (!base64Image) {
        throw new Error(
          "The selected file could not be converted to a valid image format."
        );
      }

      const formattedBase64 = base64Image.replace(/(\r\n|\n|\r)/gm, "").trim();

      const response = await axios.post(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        { image: formattedBase64 }
      );

      navigate("/analysis", {
        state: { demographics: response.data.data },
      });
    } catch (err) {
      setError(
        err.message || err.response?.data?.message || "An API error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="testing-container">
      <div className="testing-top-left">
        <p>TO START ANALYSIS</p>
      </div>

      {loading ? (
        <div className="status-text">
          <p>Analyzing Image</p>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      ) : (
        <div className="upload-options-wrapper">
          <div
            className="upload-option"
            onClick={() => setShowPermissionModal(true)}
          >
            <div className="rotating-square outer"></div>
            <div className="rotating-square middle"></div>
            <div className="rotating-square inner"></div>
            <div className="dotted-square">
              <img src={CameraIcon} alt="Scan Face" className="upload-icon" />
            </div>
            <img src={CameraLine} alt="" className="line-svg camera-line" />
            <p className="upload-label camera-label">
              ALLOW A.I. TO SCAN YOUR FACE
            </p>

            {showPermissionModal && (
              <div className="permission-modal">
                <div className="modal-pointer"></div>
                <div className="modal-content">
                  <p>ALLOW A.I. TO ACCESS YOUR CAMERA</p>
                  <div className="modal-buttons">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPermissionModal(false);
                      }}
                    >
                      DENY
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        requestCameraAndNavigate();
                      }}
                    >
                      ALLOW
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="upload-option"
            onClick={() => galleryInputRef.current.click()}
          >
            <div className="rotating-square outer"></div>
            <div className="rotating-square middle"></div>
            <div className="rotating-square inner"></div>
            <div className="dotted-square">
              <img
                src={GalleryIcon}
                alt="Access Gallery"
                className="upload-icon"
              />
            </div>
            <img src={GalleryLine} alt="" className="line-svg gallery-line" />
            <p className="upload-label gallery-label">
              ALLOW A.I. ACCESS GALLERY
            </p>
            <input
              type="file"
              accept="image/*"
              ref={galleryInputRef}
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="error-message" style={{ bottom: "-60px" }}>
          {error}
        </p>
      )}

      <button
        onClick={() => navigate("/testing")}
        className="testing-bottom-left"
      >
        <img src={Arrow} alt="back arrow" className="arrow-svg left-arrow" />
        <span>BACK</span>
      </button>
    </main>
  );
};

export default Result;
