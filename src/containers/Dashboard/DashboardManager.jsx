import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Overview from "./Overview";
import Analysis from "./Analysis";
import VehicleSearch from "./VehicleSearch";
function DashboardManager() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {}, []);

    return (
        <>
            <Paper
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Overview" />
                        <Tab label="Analysis" />
                        <Tab label="Vehicle Search" />
                    </Tabs>
                </Box>
                <Box
                    sx={{
                        padding: 0,
                        width: "100%",
                        position: "relative",
                        flex: 1,
                    }}
                >
                    {value === 0 && <Overview />}
                    {value === 1 && <Analysis />}
                    {value === 2 && <VehicleSearch />}
                </Box>
            </Paper>
        </>
    );
}

export default DashboardManager;
