import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Arrow from "../components/svgs/Arrow.svg";
import CameraAperture from "../components/svgs/camera.svg";
import TakePictureIcon from "../components/svgs/take-picture.svg"; 

const Camera = () => {
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(mediaStream);
      } catch (err) {
        setError("Camera access was denied. Please enable it in your browser settings.");
      }
    };
    getCameraStream();
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleTakePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);

      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleSubmitImage = async () => {
    if (!capturedImage) return;
    setLoading(true);
    setError("");
    try {
      const base64String = capturedImage.split(",")[1];
      const response = await axios.post(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        { image: base64String }
      );
      navigate("/analysis", { state: { demographics: response.data.data } });
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (error) {
      return <div className="camera-error">{error}</div>;
    }
    if (capturedImage) {
      return (
        <div className="camera-preview-container">
          <img src={capturedImage} alt="Captured" className="camera-feed" />
          <div className="camera-overlay">
            <div className="great-shot-message">GREAT SHOT!</div>
            <div className="camera-footer">
              <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
              <div className="camera-tips">
                <span>◆ NEUTRAL EXPRESSION</span>
                <span>◆ FRONTAL POSE</span>
                <span>◆ ADEQUATE LIGHTING</span>
              </div>
            </div>
            <button onClick={() => navigate(-1)} className="testing-bottom-left">
              <img src={Arrow} alt="back" className="arrow-svg left-arrow" />
              <span>BACK</span>
            </button>
            <button onClick={handleSubmitImage} disabled={loading} className="testing-bottom-right">
              <span>{loading ? "ANALYZING..." : "PROCEED"}</span>
              <img src={Arrow} alt="proceed" className="arrow-svg right-arrow" />
            </button>
          </div>
        </div>
      );
    }
    if (stream) {
      return (
        <div className="camera-live-container">
          <video ref={videoRef} autoPlay playsInline className="camera-feed" />
          <div className="camera-overlay">
            <div className="camera-footer">
              <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
              <div className="camera-tips">
                <span>◇ NEUTRAL EXPRESSION</span>
                <span>◇ FRONTAL POSE</span>
                <span>◇ ADEQUATE LIGHTING</span>
              </div>
            </div>
            <button onClick={() => navigate(-1)} className="testing-bottom-left">
              <img src={Arrow} alt="back" className="arrow-svg left-arrow" />
              <span>BACK</span>
            </button>
            <button onClick={handleTakePicture} className="take-picture-btn">
              <span>TAKE PICTURE</span>
              <img src={TakePictureIcon} alt="Take Picture" />
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="camera-loading-container">
        <div className="rotating-square outer"></div>
        <div className="rotating-square middle"></div>
        <div className="rotating-square inner"></div>
        <div className="dotted-square">
          <img src={CameraAperture} alt="Camera" className="upload-icon" />
        </div>
        <p className="camera-loading-text">SETTING UP CAMERA...</p>
      </div>
    );
  };

  return (
    <main className="camera-container">
      {renderContent()}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </main>
  );
};

export default Camera;