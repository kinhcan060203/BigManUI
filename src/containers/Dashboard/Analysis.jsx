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
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const markers = [
  { id: 1, position: { lat: 40.7128, lng: -74.006 } },
  { id: 2, position: { lat: 40.7138, lng: -74.007 } },
  { id: 3, position: { lat: 40.7148, lng: -74.008 } },
];

function Analysis() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  const [events, setEvents] = useState([]);

  const [tableRows, setTableRows] = useState([]);

  const [closeChart, setCloseChart] = useState(false);
  const [reviewImage, setReviewImage] = useState({});
  const [openDetail, setOpenDetail] = useState({ open: false });

  useEffect(() => {
    apiGetEventOverview({
      event_type: "license_plate",
      filter_data: {},
    })
      .then((res) => {
        setTableRows(
          res.items.map((item, index) => {
            item.full_thumbnail_path = item.full_thumbnail_path.replace(
              "192.168.103.219",
              "localhost"
            );
            item.target_thumbnail_path = item.target_thumbnail_path.replace(
              "192.168.103.219",
              "localhost"
            );
            item.data.plate_thumb_path = item.data.plate_thumb_path.replace(
              "192.168.103.219",
              "localhost"
            );
            item.start_time = item.start_time.slice(0, 19);
            item.start_time = item.start_time.split("T");
            return {
              id: index,
              full_image: item.full_thumbnail_path,
              target_image: item.target_thumbnail_path,
              plate_image: item.data.plate_thumb_path,
              lpr: item.data.target_label,
              start_time: item.start_time,
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
      <PopupManager open={openDetail.open} handleClose={handleClose} />
      <Grid container spacing={2}>
        {/* Map Section */}
        <Grid item xs={12} md={7}>
          <div className="relative w-full h-full">
            <LoadScript googleMapsApiKey="AIzaSyAtZLJb1hldI5kCRbRJxUkIy7xHjhLpUzs">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
              >
                {markers.map((marker) => (
                  <Marker key={marker.id} position={marker.position} />
                ))}
              </GoogleMap>
            </LoadScript>
            <div className="bg-white absolute bg-opacity-30 bottom-0 p-4 w-full">
              {closeChart && <ChartPopManager />}
            </div>
            <div className="absolute ml-2 mt-2 top-0 left-0 w-[320px] h-[420px]  space-y-3">
              {reviewImage.full && (
                <div className="bg-black  p-4 w-full h-[47%]"></div>
              )}
              {/* {reviewImage.target && (
                <div className="bg-black  p-4 w-full h-[47%]"></div>
              )} */}
            </div>

            <AutoGraphIcon
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                margin: "8px",
                fontSize: "34px",
                backgroundColor: closeChart ? "black" : "transparent",
                borderRadius: "2px",
                padding: "2px",
                color: "white",
                border: "1px solid white",
                transition: "all 0.3s",
              }}
              onClick={() => setCloseChart(!closeChart)}
            />
          </div>
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
