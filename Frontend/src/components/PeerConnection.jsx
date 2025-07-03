import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const PeerConnection = () => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      if (localStreamRef.current) {
        call.answer(localStreamRef.current);
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
        callRef.current = call;
      }
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Failed to get local stream:", err);
      });

    return () => {
      peer.destroy();
    };
  }, []);

  const startCall = () => {
    if (remotePeerId && localStreamRef.current) {
      const call = peerRef.current.call(remotePeerId, localStreamRef.current);
      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
      callRef.current = call;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Video Consultation</h2>
        <p className="text-gray-600">
          My Peer ID: <span className="font-mono">{peerId || "Loading..."}</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mb-8">
        <label htmlFor="remotePeerId" className="text-gray-700 font-medium">
          Enter Remote Peer ID:
        </label>
        <input
          id="remotePeerId"
          type="text"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          placeholder="Remote Peer ID"
          className="border border-gray-300 p-3 rounded-md w-80 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={startCall}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-all"
        >
          Start Call
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">My Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-80 h-48 bg-black rounded-md shadow-md object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Remote Video</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-80 h-48 bg-black rounded-md shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PeerConnection;
