import React, { useRef, useState } from 'react';
import './IDCapture.css';
const IDCapture: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const photoRef = useRef<HTMLCanvasElement | null>(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);

    // Access the device's camera
    const startCamera = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch((err) => {
                console.error('Error accessing the camera: ', err);
            });
    };

    // Capture photo from the video stream
    const capturePhoto = () => {
        const width = 1280;
        const height = 720;

        if (!photoRef.current || !videoRef.current) return;

        photoRef.current.width = width;
        photoRef.current.height = height;

        const ctx = photoRef.current.getContext('2d');
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, width, height);
            setHasPhoto(true);
        }
    };

    // Clear the captured photo
    const clearPhoto = () => {
        if (!photoRef.current) return;

        const ctx = photoRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);
            setHasPhoto(false);
        }
    };

    return (
        <div className="camera">
            <div className="camera-view">
                <video ref={videoRef} />
                <button onClick={startCamera}>Start Camera</button>
                <button onClick={capturePhoto}>Capture Photo</button>
            </div>
            <div className={`photo ${hasPhoto ? 'has-photo' : ''}`}>
                <canvas ref={photoRef}></canvas>
                {hasPhoto && <button onClick={clearPhoto}>Clear Photo</button>}
            </div>
        </div>
    );
};

export default IDCapture;