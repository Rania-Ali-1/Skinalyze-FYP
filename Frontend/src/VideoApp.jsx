// src/VideoApp.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import necessary components
import VideoRoom from './components/VideoRoom'; // Import VideoRoom component


function VideoApp() {
  // Token and room name should be passed dynamically for real-world apps
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMzNjU0OTYsImlzcyI6IkFQSU5YVHVhb3FtMncyayIsIm5iZiI6MTc0NTU4OTQ5Niwic3ViIjoiRG9jdG9yIiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwicm9vbSI6IkRvY3RvciIsInJvb21Kb2luIjp0cnVlfX0.-rJhAfgLz1L6gtWb4EbtOFhWivt9mfZSrblWwmzwmZQ"; // Replace with your generated token
  const roomName = "Doctor"; // Room name is "Doctor" as per your request
  const identity = "Doctor"; // Identity of the current user (Doctor)

  return (
    <div>
      <h1>LiveKit Video Consultation</h1>
      <VideoRoom token={token} roomName={roomName} identity={identity} />
    </div>
  );
}

export default VideoApp;
