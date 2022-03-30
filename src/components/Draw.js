import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Draw = () => {
  const [send, setSend] = useState(false);
  const [result, setResult] = useState();
  const sketch = useRef();

  const handleSubmit = () => {
    sketch.current
      .exportImage("png")
      .then((data) => {
        // saveAs(data, "digit.jpg");
        sendData(data);
      })
      .catch((e) => {
        console.log("Something went wrong!");
      });
  };

  const sketchReset = () => {
    sketch.current.clearCanvas();
  };

  const sendData = (c) => {
    const headers = {
      accept: "application/json",
    };

    const fd = new FormData();
    fd.append("image", c);
    axios
      .post("http://127.0.0.1:8000/api/digits/", fd, { headers: headers })
      .then((res) => {
        console.log(res.data);
        setSend(true);
        getImageResult(res.data.id);
        sketchReset();
        setTimeout(() => {
          setSend(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const getImageResult = (id) => {
    axios.get(`http://127.0.0.1:8000/api/digits/${id}/`).then((res) => {
      setResult(res.data.result);
    });
  };

  return (
    <React.Fragment>
      {send && (
        <Alert variant="info">Succesfully send for classification</Alert>
      )}
      {result && <h3>Result is {result}</h3>}
      <ReactSketchCanvas
        ref={sketch}
        style={styles}
        width="800px"
        height="800px"
        strokeWidth={60}
        strokeColor="white"
        canvasColor="black"
      />
      <div className="mt-3 mx-0">
        <Button onClick={handleSubmit} variant="primary">
          Save
        </Button>
        <Button onClick={sketchReset} variant="primary">
          Reset
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Draw;
