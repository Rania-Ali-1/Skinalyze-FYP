import React, { useState, useEffect, useRef } from 'react';
import { connect, createLocalVideoTrack } from 'twilio-video';
import './VideoChat.css';

export default function VideoChat() {
  const [identity, setIdentity] = useState('');
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const remoteVideoElements = useRef({}); // Track remote elements per participant

  const roomName = 'demo_room';

  const joinRoom = async () => {
    if (!identity.trim()) {
      setError('Please enter an identity');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://skinalyze-token-api-b2cmfqbwfcfjebhe.eastus2-01.azurewebsites.net/token?identity=${identity}&room=${roomName}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch token: ${res.status} ${res.statusText}`);
      }

      const { token } = await res.json();
      const connectedRoom = await connect(token, { video: true, audio: true });
      setRoom(connectedRoom);
      window._twilioRoom = connectedRoom;

      // Clean up previous local track if any
      if (localRef.current) {
        localRef.current.innerHTML = '';
      }

      const localVideoTrack = await createLocalVideoTrack();
      const localElement = localVideoTrack.attach();
      localElement.classList.add('video-element');
      localRef.current.appendChild(localElement);

      const handleTrackSubscribed = (participant, track) => {
        if (track.kind === 'video' && remoteRef.current) {
          // Remove old video if already exists for this participant
          if (remoteVideoElements.current[participant.sid]) {
            remoteVideoElements.current[participant.sid].remove();
          }

          const element = track.attach();
          element.classList.add('video-element');
          remoteRef.current.appendChild(element);
          remoteVideoElements.current[participant.sid] = element;
        }
      };

      const handleParticipant = (participant) => {
        console.log(`Participant "${participant.identity}" connected`);

        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed && publication.track) {
            handleTrackSubscribed(participant, publication.track);
          }

          publication.on('subscribed', (track) => {
            handleTrackSubscribed(participant, track);
          });
        });

        participant.on('trackSubscribed', (track) => {
          handleTrackSubscribed(participant, track);
        });
      };

      connectedRoom.participants.forEach(handleParticipant);
      connectedRoom.on('participantConnected', handleParticipant);

      connectedRoom.on('participantDisconnected', (participant) => {
        console.log(`Participant "${participant.identity}" disconnected`);
        const el = remoteVideoElements.current[participant.sid];
        if (el) {
          el.remove();
          delete remoteVideoElements.current[participant.sid];
        }
      });

      setLoading(false);
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (room) {
        room.localParticipant.tracks.forEach((pub) => {
          const track = pub.track;
          if (track) {
            track.stop();
            const attachedElements = track.detach();
            attachedElements.forEach((el) => el.remove());
          }
        });

        room.disconnect();
        console.log('Room disconnected');
      }

      // Clear all remote elements on unmount
      Object.values(remoteVideoElements.current).forEach((el) => el.remove());
      remoteVideoElements.current = {};
    };
  }, [room]);

  return (
    <div className="video-chat-container">
      <h2 className="heading">Welcome to Video Chat</h2>

      <div className="input-container">
        <input
          type="text"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder="Enter your identity"
          className="identity-input"
        />
        <button onClick={joinRoom} className="join-button">
          Join Room
        </button>
      </div>

      {loading && <div className="loading-message">Connecting to room...</div>}
      {error && <div className="error-message">{`Error: ${error}`}</div>}

      <div className="video-container">
        <div ref={localRef} className="video-box">
          <p className="video-label">Your Video</p>
        </div>
        <div ref={remoteRef} className="video-box">
          <p className="video-label">Remote Participant Video</p>
        </div>
      </div>
    </div>
  );
}
