//this is the localhost path for the video call not the token api
import React, { useState, useEffect, useRef } from 'react';
import { connect, createLocalVideoTrack } from 'twilio-video';
import './VideoCall.css';

const VideoCall = ({
  myUserId,
  calling,
  cancelCall,
  isCallAccepted,
  roomName,
  identity,
  LeaveCall,
  shareScreen,
}) => {
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState(null);

  const localVideoRef = useRef();
  const userVideoRef = useRef();

  useEffect(() => {
    async function joinRoom() {
      const res = await fetch(`http://localhost:5000/token?identity=${identity}&room=${roomName}`);
      const { token } = await res.json();
      
      const room = await connect(token, { video: true, audio: true });
      setRoom(room);

      // Attach local video track to the localVideoRef
      const localTrack = await createLocalVideoTrack();
      localVideoRef.current.appendChild(localTrack.attach());

      // Attach remote participant video tracks to the userVideoRef
      room.on('participantConnected', (participant) => {
        console.log('A participant connected:', participant.identity);

        participant.on('trackSubscribed', (track) => {
          if (track.kind === 'video' && userVideoRef.current) {
            userVideoRef.current.appendChild(track.attach());
          }
        });
      });
    }

    joinRoom();

    return () => {
      room?.disconnect();
    };
  }, [roomName, identity]);

  const ToggleVideo = () => {
    room.localParticipant.videoTracks.forEach((publication) => {
      publication.track.enable(!isVideoMuted);
    });
    setIsVideoMuted(!isVideoMuted);
  };

  const ToggleAudio = () => {
    room.localParticipant.audioTracks.forEach((publication) => {
      publication.track.enable(!isAudioMuted);
    });
    setIsAudioMuted(!isAudioMuted);
  };

  return (
    <div className="video-call-wrapper">
      <div className="video-section">
        <div ref={localVideoRef} className="video-player-container">
          <p>Your Video</p>
        </div>
        {isCallAccepted && (
          <div ref={userVideoRef} className="user-video-player-container">
            <p>Remote Participant's Video</p>
          </div>
        )}
      </div>

      {!isCallAccepted ? (
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="user-input"
          />
          <button onClick={handleConnectToDoctor} disabled={!myUserId} className="connect-btn">
            Connect to Doctor
          </button>
          {calling && (
            <button onClick={cancelCall} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      ) : (
        <div className="control-buttons">
          <button onClick={LeaveCall} className="leave-call-btn">
            Leave call
          </button>
          <button onClick={ToggleAudio} className="audio-btn">
            {!isAudioMuted ? 'Mute Audio' : 'Unmute Audio'}
          </button>
          <button onClick={ToggleVideo} className="video-btn">
            {!isVideoMuted ? 'Turn Off Video' : 'Turn On Video'}
          </button>
          <button onClick={shareScreen} className="screen-btn">
            Share Screen
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
