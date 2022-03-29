import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import axios from "axios";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Draw = () => {
  const [send, setSend] = useState(false);
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

  const handleReset = () => {
    sketch.current.clearCanvas();
  };

  const sendData = (c) => {
    console.log(c);

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
      })
      .catch((err) => console.log(err));
  };

  const getImageResult = (id) => {};

  return (
    <React.Fragment>
      <ReactSketchCanvas
        ref={sketch}
        style={styles}
        width="800px"
        height="800px"
        strokeWidth={10}
        strokeColor="black"
      />
      <div className="mt-3 mx-0">
        <Button onClick={handleSubmit} variant="primary">
          Save
        </Button>
        <Button onClick={handleReset} variant="primary">
          Reset
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Draw;