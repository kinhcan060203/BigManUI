import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipList({ chipData }) {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        bgcolor: "transparent",
        boxShadow: "none",
      }}
      component="ul"
    >
      {chipData.map((data, index) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={index}>
            <Chip icon={icon} label={data.service_name} onDelete={undefined} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
