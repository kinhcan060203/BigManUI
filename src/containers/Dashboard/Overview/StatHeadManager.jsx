import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";

import StatCard from "../../../components/Dashboard/Overview/StatCard";
import VideocamIcon from "@mui/icons-material/Videocam";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PreviewIcon from "@mui/icons-material/Preview";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { apiGetCamera } from "../../../connectDB/axios";
const statistics_org = [
  {
    icon: <VideocamIcon />,
    value: "0",
    label: "Total Cameras",
    bgColor: "#E0E7FF",
  },
  {
    icon: <NewReleasesIcon />,
    value: "0",
    label: "Total Alerts",
    bgColor: "#E3F2FD",
  },
  {
    icon: <PreviewIcon />,
    value: "0",
    label: "Total Reviewd",
    bgColor: "#FFF3E0",
  },
  {
    icon: <AssignmentTurnedInIcon />,
    value: "0",
    label: "Total Resolved",
    bgColor: "#FFEBEE",
  },
];

function StatHeadManager() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [statistics, setStatistics] = useState(statistics_org);
  const [cameraInfo, setCameraInfo] = useState(0);
  const fetchCamera = async () => {
    await apiGetCamera()
      .then((res) => {
        console.log("res", res);
        const { data } = res;
        const _statistics = statistics.map((stat) => {
          if (stat.label === "Total Cameras") {
            return { ...stat, value: data.length };
          }
          return stat;
        });
        setStatistics(_statistics);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {}, []);
  useEffect(() => {
    fetchCamera();
  }, []);

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default StatHeadManager;
