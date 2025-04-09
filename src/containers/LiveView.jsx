import { useEffect, useRef } from "react";
import Hls from "hls.js";

function LiveView({ areaCameras }) {
  // Danh sách tên areaCameras và ID

  const cameraIds = ["01", "02", "03", "04"];

  // Khởi tạo ref cho tất cả video
  const videoRefs = useRef({});

  // Hàm khởi tạo HLS
  const initHls = (video, src) => {
    if (!video) return null;

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls();

      hls.on(Hls.Events.FRAG_CHANGED, () => {
        if (hls) {
          hls.nextLevel = hls.currentLevel;
        }
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.play();
    } else {
      console.error("HLS is not supported in this browser.");
    }

    return hls;
  };
  useEffect(() => {
    const hlsInstances = [];

    areaCameras.forEach((cam) => {
      cameraIds.forEach((id) => {
        const key = `${cam}-${id}`;
        const src = `${import.meta.env.VITE_APP_HLS_DOMAIN}:${import.meta.env.VITE_APP_HLS_PORT}/stream/ai/${key}/hls/live/index.m3u8`;
        const video = videoRefs.current[key];

        if (video) {
          const hls = initHls(video, src);
          if (hls) hlsInstances.push(hls);
        }
      });
    });

    return () => {
      hlsInstances.forEach((hls) => hls.destroy());
    };
  }, [areaCameras]);
  return (
    <div className="p-4 flex flex-row flex-wrap overflow-hidden w-full h-full justify-center items-start">
      {areaCameras.map((cam) =>
        cameraIds.map((id) => {
          const key = `${cam}-${id}`;
          return (
            <div key={key}>
              <video
                ref={(el) => (videoRefs.current[key] = el)}
                className="w-[250px] h-[150px] bg-black mr-4 mb-4"
                controls
                playsInline
                autoPlay
                muted
              ></video>
              <p className="text-white text-sm">{key}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default LiveView;
