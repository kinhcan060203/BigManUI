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
                overflow: "hidden",
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
                        <img
                            srcSet={`${item.vehicle_path !== "unknown" ? item.vehicle_path : "./no-available.png"}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.vehicle_path !== "unknown" ? item.vehicle_path : "./no-available.png"}?w=248&fit=crop&auto=format`}
                            alt={item.camera_name}
                            loading="lazy"
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

const itemData = [
    {
        id: 0,
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        rows: 2,
        cols: 2,
        featured: true,
    },
];
