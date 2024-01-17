import React from 'react';


interface WebcamProps {
    webcam: any; // Replace 'any' with the actual type of 'webcam'
}

function Webcam({ webcam }: WebcamProps) {
    return (
      <div id="webcam-container">
        {webcam ? (
          <video ref={webcam.canvas} autoPlay playsInline />
        ) : (
          <p>Loading webcam...</p>
        )}
      </div>
    );
  }

export default Webcam;
