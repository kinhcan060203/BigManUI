import { useEffect, useState } from "react";
import React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ChartPopManager from "./ChartPopManager";
import EventList from "./EventList";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { apiGetEventOverview } from "../../connectDB/axios";
import PopupManager from "./PopupManager";
import LiveView from "../../containers/LiveView";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Analysis() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  const [events, setEvents] = useState([]);

  const [tableRows, setTableRows] = useState([]);

  const [closeChart, setCloseChart] = useState(false);
  const [reviewImage, setReviewImage] = useState({});
  const [openDetail, setOpenDetail] = useState({ open: false, row: {} });
  const [areaCameraIndex, setAreaCameraIndex] = useState(0);
  const [areaCameras, setAreaCameras] = useState([]);

  const areaTabs = [
    "All",
    "LH-VNG-LL_CAM",
    "LH-HV-LL_CAM",
    "LH-LTT-HV_CAM",
    "LH-LTT-DK_CAM",
    "LH-NVL-VNG_CAM",
  ];
  useEffect(() => {
    if (areaCameraIndex === 0) {
      setAreaCameras(areaTabs.slice(1));
    } else {
      setAreaCameras([areaTabs[areaCameraIndex]]);
    }
  }, [areaCameraIndex]);
  useEffect(() => {
    apiGetEventOverview({
      event_type: "license_plate",
      filter_data: {},
    })
      .then((res) => {
        setTableRows(
          res.items.map((item, index) => {
            item.full_thumbnail_path = item.full_thumbnail_path?.replace(
              "192.168.101.4",
              "100.112.243.28"
            );
            item.target_thumbnail_path = item.target_thumbnail_path?.replace(
              "192.168.101.4",
              "100.112.243.28"
            );
            item.data.plate_thumb_path = item.data.plate_thumb_path?.replace(
              "192.168.101.4",
              "100.112.243.28"
            );
            let start_time = item.start_time["$date"];
            return {
              id: index,
              full_image: item.full_thumbnail_path,
              target_image: item.target_thumbnail_path,
              plate_image: item.data.plate_thumb_path,
              lpr: item.data.target_label,
              start_time: start_time,
              event_type: item.event_type,
              camera_id: item.camera_id,
              is_reviewed: item.is_reviewed,
              has_clip: item.has_clip,
              metadata: item.data,
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {}, [openDetail]);
  const handleClose = () => {
    setOpenDetail({ open: false });
  };

  return (
    <Box sx={{ p: 2 }}>
      <PopupManager
        open={openDetail.open}
        data={openDetail.row}
        handleClose={handleClose}
      />
      <Tabs value={areaCameraIndex} onChange={(e, v) => setAreaCameraIndex(v)}>
        {areaTabs.map((area, index) => (
          <Tab key={index} label={area} />
        ))}
      </Tabs>
      <Grid container spacing={2}>
        {/* Map Section */}
        <Grid item xs={12} md={7}>
          <LiveView areaCameras={areaCameras} />
        </Grid>

        {/* Right Sidebar Tool */}
        <Grid item xs={12} md={5}>
          <Card>
            {/* <div className="relative">
              <CardMedia
                component="img"
                height="200"
                image="https://via.placeholder.com/400x200"
                alt="Camera View"
              />

              <Typography variant="h6" className="absolute bottom-0 left-0 p-2">
                Cam 1
              </Typography>
              <Typography
                variant="h6"
                className="absolute bottom-0 right-0 p-2"
              >
                Vùng
              </Typography>
            </div> */}

            <CardContent>
              <EventList
                setReviewImage={setReviewImage}
                setOpenDetail={setOpenDetail}
                rows={tableRows}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;
