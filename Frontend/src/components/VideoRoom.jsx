// src/components/VideoRoom.jsx
import React, { useEffect, useState } from 'react';
import { Room, VideoPlayer } from '@livekit/components-react'; // Import LiveKit components
import { connect } from 'livekit-client';

const VideoRoom = ({ token, roomName, identity }) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const joinRoom = async () => {
      try {
        // Connect to LiveKit room with identity (Doctor or Patient)
        const room = await connect(token, {
          room: roomName,
          identity: identity, // Set the identity to Doctor or Patient
          audio: true,
          video: true,
          server: 'wss://skinalyze-1k1k5km6.livekit.cloud',
        });

        setRoom(room); // Save room reference to state

        // Handle any necessary events
        room.on('participantConnected', (participant) => {
          console.log('New participant connected:', participant);
        });

      } catch (error) {
        console.error('Error joining the room:', error);
        alert('Failed to join the room. Please try again.');
      }
    };

    joinRoom();

    return () => {
      if (room) room.disconnect(); // Clean up when component is unmounted
    };
  }, [token, roomName, identity, room]);

  return (
    <div>
      <h2>Room: {roomName}</h2>
      {room && (
        <Room room={room}>
          <div>
            <strong>Local Video ({identity})</strong>
            <VideoPlayer
              videoTrack={room.localParticipant?.videoTracks[0]?.track}
              objectFit="cover"
            />
          </div>
          <div>
            <strong>Remote Video</strong>
            {room.remoteParticipants.map((participant) => (
              <VideoPlayer
                key={participant.sid}
                videoTrack={participant.videoTracks[0]?.track}
                objectFit="cover"
              />
            ))}
          </div>
        </Room>
      )}
    </div>
  );
};

export default VideoRoom;
