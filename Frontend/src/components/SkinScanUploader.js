import React, { useState, useContext } from "react";
import ImageUploading from "react-images-uploading";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { UserContext } from "../UserContext";

const SkinScanUploader = () => {
  const [images, setImages] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    user,
    setPrediction,
    setConfidence,
    setImageUrl,
  } = useContext(UserContext);

  const maxNumber = 1;
  const db = getFirestore();

  const onChange = (imageList) => {
    setImages(imageList);
    setResult(null);
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = "diaefuyf2";
    const uploadPreset = "unsigned_preset";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select an image first.");
      return;
    }

    try {
      setLoading(true);
      const imageFile = images[0].file;

      const formData = new FormData();
      formData.append("image", imageFile);

      // const response = await fetch("http://20.115.219.221:8080/api/detect/", { removed bc browser did not accept http https mixed responses
        const response = await fetch("https://skinalyze.duckdns.org/api/detect/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (responseData && responseData.prediction) {
        setResult(responseData);

        const cloudinaryUrl = await uploadToCloudinary(imageFile);
        console.log("Cloudinary URL:", cloudinaryUrl);

        if (user) {
          const userResultsRef = doc(db, "users", user.uid);
          await setDoc(
            userResultsRef,
            {
              prediction: responseData.prediction,
              confidence: responseData.confidence,
              imageUrl: cloudinaryUrl,
              timestamp: new Date().toISOString(),
            },
            { merge: true }
          );

          console.log("✅ Result + Image URL saved to Firestore.");
        }

        setPrediction(responseData.prediction);
        setConfidence(responseData.confidence);
        setImageUrl(cloudinaryUrl);

        console.log("✅ Saved to UserContext and localStorage:", {
          prediction: responseData.prediction,
          confidence: responseData.confidence,
          imageUrl: cloudinaryUrl,
        });
      } else {
        throw new Error("Invalid response format from API.");
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      alert("Error detecting skin condition. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        maxWidth: "400px",
        
        paddingBottom: "45px",
      }}
    >
      <h3>Upload Image for Skin Detection</h3>

      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          <div>
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#3D53A0",
                color: "white",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "13px",
                marginBottom: "10px",
              }}
              onClick={onImageUpload}
              disabled={loading}
            >
              {images.length === 0 ? "Choose Image" : "Change Image"}
            </button>

            {images.length > 0 && (
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 15px",
                  backgroundColor: "#A9A9A9",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                onClick={onImageRemoveAll}
                disabled={loading}
              >
                Remove
              </button>
            )}

            {imageList.map((image, index) => (
              <div key={index} style={{ marginTop: "10px" }}>
                <img
                  src={image.data_url}
                  alt="preview"
                  style={{ width: "200px", borderRadius: "10px" }}
                />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      <button
        onClick={handleUpload}
        disabled={loading || images.length === 0}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#A9A9A9",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "13px",
        }}
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>

      {result && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Result:</h3>
          <p>
            <strong>Predicted Class:</strong>{" "}
            {result.prediction || "No class detected"}
          </p>
          <p>
            <strong>Confidence:</strong>{" "}
            {(result.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default SkinScanUploader;
