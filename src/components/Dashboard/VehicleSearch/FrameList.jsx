import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function FrameList({ previewList }) {
  const [frameHoverIndex, setFrameHoverIndex] = React.useState(false);
  return (
    <ImageList
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        height: "90vh",
      }}
      cols={5}
    >
      {previewList &&
        previewList.map((item, index) => (
          <ImageListItem
            key={index}
            onMouseOver={() => setFrameHoverIndex(index)}
            onMouseOut={() => setFrameHoverIndex(-1)}
          >
            {/* <img
              //   srcSet={`${item.vehicle_path !== "unknown" ? item.vehicle_path : "./no-available.png"}?w=248&fit=crop&auto=format&dpr=2 2x`}
              //   src={`${item.vehicle_path !== "unknown" ? item.vehicle_path : "./no-available.png"}?w=248&fit=crop&auto=format`}
              srcSet={`${item.vehicle_path !== "unknown" && item.vehicle_path}`}
              src={`${item.vehicle_path !== "unknown" && item.vehicle_path}`}
              alt={item.camera_name}
              loading="lazy"
              className="w-120 h-120 object-cover"
            /> */}
            <div
              className="w-[240px] h-[200px] bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                backgroundImage: `url(${item.vehicle_path !== "unknown" ? item.vehicle_path : "./no-available.png"})`,
              }}
              alt={item.camera_name}
            />

            <ImageListItemBar
              title={item.camera_name}
              subtitle={item.identity}
              sx={{
                "&.MuiImageListItemBar-root": {
                  opacity: frameHoverIndex == index ? 1 : 0.5,
                  backgroundColor:
                    frameHoverIndex == index
                      ? "rgba(0, 0, 0, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                },
                "& .MuiImageListItemBar-title": {
                  fontSize: "16px",
                },
                "& .MuiImageListItemBar-subtitle": {
                  fontSize: "12px",
                },
              }}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.identity}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
}
