import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";

function LiveView() {
  let currentSource = "camera1";
  currentSource = `${import.meta.env.VITE_APP_HLS_DOMAIN}:${import.meta.env.VITE_APP_HLS_PORT}/stream/${currentSource}/channel/0/hls/live/index.m3u8`;
  const HLS_MIME_TYPE = "application/vnd.apple.mpegurl";
  videoRef = useRef(null);
  const [loadedMetadata, setLoadedMetadata] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.canPlayType(HLS_MIME_TYPE)) {
      videoRef.current.src = currentSource;
      videoRef.current.load();
      return;
    } else if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    }
  }, [videoRef]);

  return (
    <>
      <video
        ref={videoRef}
        className={`size-full bg-black ${loadedMetadata ? "" : "invisible"}`}
        // preload="auto"
        autoPlay
        controls={false}
        playsInline
        muted={muted}
        onLoadedData={() => {
          setLoadedMetadata(true);
        }}
      ></video>
    </>
  );
}

export default LiveView;
