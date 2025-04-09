import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoIcon from "@mui/icons-material/Photo";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Pagination,
} from "@mui/material";

function PopupManager({ open, data, handleClose }) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("");

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  useEffect(() => {}, []);
  console.log("data", data);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiDialog-paper": {
            width: "90vh",
          },
        }}
      >
        <img
          src={data?.full_image}
          alt="Full Preview"
          style={{ width: "100%", height: "auto" }}
        />
      </Dialog>
    </>
  );
}

export default PopupManager;
