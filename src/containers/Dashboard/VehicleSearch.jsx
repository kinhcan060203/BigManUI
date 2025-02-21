import { useEffect, useState, useRef } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoIcon from "@mui/icons-material/Photo";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { apiVehicleSearch, apiLPR } from "../../connectDB/axios";
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
import FrameList from "../../components/Dashboard/VehicleSearch/FrameList";
import UploadAndDisplayImage from "../../components/Dashboard/VehicleSearch/UploadAndDisplayImage";
import OptionsDrop from "../../components/Dashboard/VehicleSearch/OptionsDrop";

function VehicleSearch() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);

    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState("");
    const [image, setImage] = useState(null);
    const [metadata, setMetadata] = useState({});
    const [searchPreview, setSearchPreview] = useState([]);
    const [plateImage, setPlateImage] = useState(null);
    useEffect(() => {
        const formData = new FormData();
        if (!image || !image.file) {
            setPlateImage(null);
            setImage(null);
            return;
        }
        formData.append("file", image.file);
        console.log(formData);
        apiLPR(formData).then((res) => {
            let plateURI = res.plate_img;
            plateURI = `data:image/png;base64,${plateURI}`;
            setPlateImage(plateURI);
            delete res.plate_img;
            setMetadata(res);
        });
    }, [image]);

    useEffect(() => {}, []);

    const searchAction = () => {
        const formData = new FormData();
        if (!image) {
            return;
        }
        formData.append("file", image.file);

        console.log("searching...");
        console.log("formData", formData);
        apiVehicleSearch(formData).then((res) => {
            setSearchPreview(res.results);
        });
    };
    return (
        <>
            <Box sx={{ height: "100%" }}>
                {/* Header Toolbar */}
                <Grid
                    container
                    alignItems="center"
                    sx={{ marginTop: 2, paddingLeft: 2, paddingRight: 2 }}
                >
                    <Grid
                        item
                        xs={3}
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
                            onClick={searchAction}
                        >
                            Route analysis
                        </Button>
                    </Grid>
                    <Grid item xs={9}>
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
                <Grid container spacing={2} sx={{ mt: 0, padding: 2 }}>
                    {/* Left Section */}
                    <Grid
                        item
                        xs={3}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Target Thumbnail */}
                        <Box>
                            <UploadAndDisplayImage
                                image={image}
                                setImage={setImage}
                            />
                        </Box>

                        {/* License Plate Image Thumb */}
                        {/* <Box
                            component="img"
                            src={plateImage}
                            alt="License Plate Detected"
                            sx={{
                                width: "100%",
                                height: "160px",
                                borderRadius: 1,
                                mb: 1,
                                boxShadow: 3,
                            }}
                        /> */}
                        <div
                            style={{
                                width: "100%",
                                height: "160px",
                                backgroundImage: `url(${plateImage})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                marginBottom: "10px",
                            }}
                        ></div>
                        {/* Event Info */}
                        <Box
                            sx={{
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                padding: 2,
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ mb: 1, fontSize: 20 }}
                            >
                                Event Info
                            </Typography>
                            <Typography
                                variant="body2"
                                className="text-left text-xl"
                            >
                                <strong>License Plate Detected</strong>:{" "}
                                {metadata.license_number}
                                <br />
                                <strong>Color</strong>: {metadata.color}
                            </Typography>
                            {/* <OptionsDrop>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Event Info
                                </Typography>
                                <Typography variant="body2">
                                    Metadata: When, vehicle model, color, camera
                                    name, area name
                                </Typography>
                            </OptionsDrop> */}
                        </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={9} sx={{ height: "600px" }}>
                        {/* Image Search Area */}
                        <Box
                            sx={{
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                mb: 2,
                                overflow: "auto",
                                height: "100%",
                                backgroundColor: "#f5f5f5",
                            }}
                        >
                            <FrameList previewList={searchPreview} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default VehicleSearch;
