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

function PopupManager({ open, handleClose }) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("");

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  useEffect(() => {}, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ padding: 2 }}>
          {/* Header Toolbar */}
          <Grid container alignItems="center">
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <Typography variant="h6">Tool</Typography> */}

              <Box
                sx={{
                  gap: 0.5,
                  display: "flex",
                }}
              >
                <ModeEditOutlineIcon
                  sx={{
                    fontSize: "30px",
                    color: "black",
                    border: "1px solid  #ddd",
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                />
                <TouchAppIcon
                  sx={{
                    fontSize: "30px",
                    color: "black",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                />
                <DownloadForOfflineIcon
                  sx={{
                    fontSize: "30px",
                    color: "black",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                />
                <VisibilityIcon
                  sx={{
                    fontSize: "30px",
                    color: "black",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  fontSize: "12px",
                  padding: "8px",
                  marginRight: "10px",
                }}
              >
                Route analysis
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Filter Cam"
                  variant="outlined"
                  size="small"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <Pagination
                  color="primary"
                  count={3}
                  variant="outlined"
                  sx={{
                    float: "right",
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Main Content */}
          <Grid container spacing={2} sx={{ mt: 0 }}>
            {/* Left Section */}
            <Grid
              item
              xs={4}
              sx={{ height: "600px", display: "flex", flexDirection: "column" }}
            >
              {/* Target Thumbnail */}
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  height: "250px",
                  mb: 2,
                  position: "relative",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ position: "absolute", top: 8, left: 8 }}
                >
                  Target Thumb
                </Typography>

                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    gap: 0.3,
                    display: "flex",
                  }}
                >
                  <VideoCameraFrontIcon
                    sx={{
                      fontSize: "30px",
                      color: "black",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "2px",
                    }}
                  />
                  <PhotoIcon
                    sx={{
                      fontSize: "30px",
                      color: "black",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "2px",
                    }}
                  />
                </Box>
              </Box>

              {/* License Plate Image Thumb */}
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body1">
                  License Plate Image Thumb
                </Typography>
              </Box>

              {/* Event Info */}
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: 2,
                  flexGrow: 1,
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Event Info
                </Typography>
                <Typography variant="body2">
                  Metadata: When, vehicle model, color, camera name, area name
                </Typography>
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid item xs={8} sx={{ height: "600px" }}>
              {/* Image Search Area */}
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  mb: 2,
                  overflow: "auto",
                  height: "100%",
                }}
              >
                <Grid container spacing={1} sx={{ p: 1 }}>
                  {[...Array(9).keys()].map((index) => (
                    <Grid item xs={4} key={index}>
                      <Card
                        sx={{
                          cursor: "pointer",
                          border:
                            selectedImage === index ? "2px solid blue" : "none",
                        }}
                        onClick={() => handleImageSelect(index)}
                      >
                        <CardMedia
                          component="img"
                          height="80"
                          image={`https://via.placeholder.com/80x80?text=${
                            index + 1
                          }`}
                          alt={`Image ${index + 1}`}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}

export default PopupManager;
