import * as ml5 from "ml5";
import React, { useState, useEffect } from "react";

function App() {
  const [imageModel, setImageModel] = useState("MobileNet");
  const [img, setImg] = useState(null);
  const [dom, setDom] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  const classifier = ml5.imageClassifier(imageModel, () => {
    console.log(`Model loaded: ${imageModel}`);
  });

  const uploadPicture = (event) => {
    setError(null);
    let picture = event.target.files[0];
    if (validatePictureType(picture.name.split(".").pop())) {
      setImg(URL.createObjectURL(picture));
    }
  };

  const validatePictureType = (type) => {
    type = type.toLowerCase();
    if (type === "png") return true;
    if (type === "jpg") return true;
    if (type === "jpeg") return true;
    setError("Please upload file types with PNG JPG JPEG");
    return false;
  };

  useEffect(() => {
    setDom(document.getElementById("image"));

    if (dom) {
      classifier.predict(dom, 5, (err, results) => {
        setPredictions(results);
      });
    }
  }, [img, dom, classifier]);

  return (
    <div className="App" style={{ marginLeft: 40, height: "100vh" }}>
      <h1>Image Classification with ML5.js</h1>

      <div>
        {img ? (
          <img src={img} id="image" height="400" alt="" />
        ) : (
          <p>-- Upload an Image --</p>
        )}
      </div>

      <div style={{ marginTop: 5 }}>
        <input type="file" name="myImage" onChange={uploadPicture} />
      </div>
      <span style={{ color: "red" }}>{error}</span>
      <div>
        <p>
          <b>Five Predictions with {imageModel} model</b>
        </p>
      </div>
      <div>
        <div style={{ marginBottom: 5 }}>
          <span>Select the Image Classification Model</span>
        </div>
        <div>
          <button onClick={() => setImageModel("MobileNet")}>MobileNet</button>
          <button onClick={() => setImageModel("DoodleNet")}>DoodleNet</button>
        </div>
      </div>
      {predictions &&
        predictions.map((p) => (
          <li key={p.label}>
            <b>Prediction</b>: {p.label} at{" "}
            <b>{(p.confidence * 100).toFixed(2)}%</b> confidence
          </li>
        ))}
    </div>
  );
}
export default App;
