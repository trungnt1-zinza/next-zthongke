import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

const About = () => {
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [labelContainer, setLabelContainer] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [predictedName, setPredictedName] = useState(null);
  const [namePlayerObjects, setNamePlayerObjects] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // Your init function here
    const modelURL =
      "https://teachablemachine.withgoogle.com/models/hvmDKjuGm/model.json";
    const metadataURL =
      "https://teachablemachine.withgoogle.com/models/hvmDKjuGm/metadata.json";
    const model = await tmImage.load(modelURL, metadataURL);
    setModel(model);
    const maxPredictions = model.getTotalClasses();
    setMaxPredictions(maxPredictions);
    const flip = true;
    const webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    setWebcam(webcam);
    window.requestAnimationFrame(loop);
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    const labelContainer = document.getElementById("label-container");
    setLabelContainer(labelContainer);
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
  };

  const loop = async () => {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    const predictions = await model.predictTopK(webcam.canvas, 1);
    setPredictedName(predictions[0].className);
  };
  const end = async () => {
    const namePlayerObjects = await getNotes();
    setNamePlayerObjects(namePlayerObjects);
    function formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();

      // Ensure leading zero for day and month if they are single digits
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const newDate = formatDate(new Date());
    if (namePlayerObjects.length > 0) {
      for (const namePlayerObject of namePlayerObjects) {
        console.log(namePlayerObject["name"]);
        if (namePlayerObject["name"] === predictedName) {
          namePlayerObject["count"]++;
          console.log("Tham gia x", namePlayerObject);
          namePlayerObject["day"] = newDate;
          await postNotes(namePlayerObject);
          console.log("Tham gia x", namePlayerObject.count);
          break; // Thoát khỏi vòng lặp sau khi tìm thấy tên trùng khớp
        }
      }
    } else {
      const namePlayerObject = {
        name: `${predictedName}`,
        count: 1,
        day: newDate,
        places: 0,
        event: 0,
        bounty: 0,
        jackpot: 0,
      };
      console.log(namePlayerObject);

      await postNotes(namePlayerObject);
    }
  };

  const getNotes = async () => {
    const response = await fetch("https://azure-chief-ceder.glitch.me/test");
    const notesData = await response.json();
    return notesData;
  };

  const postNotes = async (data) => {
    const response = await fetch("https://azure-chief-ceder.glitch.me/test", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };
  const showName = async () => {
    const tbodyText = [];
    const names = await getNotes();
    console.log(names);
    names.forEach((name) => {
      tbodyText.push(`<tr>
        <td>${name.name}</td>
        <td>${name.count}</td>
    </tr>`);
    });
    document.getElementById("tbody").innerHTML = tbodyText.join();
  };

  return (
    <div>
      <div>Teachable Machine Image Model</div>
      <button type="button" onClick={init}>
        Start
      </button>
      <button type="button" onClick={end}>
        End
      </button>
      <button type="button" onClick={getNotes}>
        getNotes
      </button>
      <button type="button" onClick={showName}>
        showName
      </button>

      <h2>Bảng Tham Gia</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tham gia</th>
          </tr>
        </thead>
        <tbody id="tbody">{/* Add your rows here */}</tbody>
      </table>

      <div id="webcam-container"></div>
      <div id="label-container"></div>
    </div>
  );
};

export default About;
