# Image Classification with ML5.js 
Integrating ML5.js with React App for image classification
## MobileNet and DoodleNet models
```javascript
const classifier = ml5.imageClassifier(classificationModel, () => {
  console.log(`Model loaded: ${classificationModel}`);
});

React.useEffect(() => {
  setDom(document.getElementById("image"));
  if (dom) {
    classifier.predict(dom, 5, (err, results) => {
      if (err) return;
      setPredictions(results);
    });
  }
}, [img, dom, classifier]);
```
## Predictions
![image](https://user-images.githubusercontent.com/52897657/135706181-51508d62-4bfb-482f-8710-f5496c8f6caf.png)
