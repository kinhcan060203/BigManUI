import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";

import StatCard from "../../../components/Dashboard/Overview/StatCard";
import VideocamIcon from "@mui/icons-material/Videocam";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PreviewIcon from "@mui/icons-material/Preview";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
const statistics = [
  {
    icon: <VideocamIcon />,
    value: "3,256",
    label: "Total Cameras",
    bgColor: "#E0E7FF",
  },
  {
    icon: <NewReleasesIcon />,
    value: "394",
    label: "Total Alerts",
    bgColor: "#E3F2FD",
  },
  {
    icon: <PreviewIcon />,
    value: "$2,536",
    label: "Total Reviewd",
    bgColor: "#FFF3E0",
  },
  {
    icon: <AssignmentTurnedInIcon />,
    value: "38",
    label: "Total Resolved",
    bgColor: "#FFEBEE",
  },
];

function StatHeadManager() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {}, []);

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
