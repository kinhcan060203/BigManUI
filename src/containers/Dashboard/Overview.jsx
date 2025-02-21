import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { PieChartCustom, StraightAnglePieChartCustom } from "./PieChartCustom";
import { AreaChartCustom } from "./AreaChartCustom";
import StatHeadManager from "./Overview/StatHeadManager";

import {
  SingleSelectCustom,
  MultipleSelectCustom,
} from "../../components/SelectCustom";
const trafficData = [
  { id: 1, type: "Vượt đèn đỏ" },
  { id: 2, type: "Quá tốc độ" },
  { id: 3, type: "Ùn tắc" },
  { id: 4, type: "Tai nạn" },
];
const ageOptions = [
  { value: 10, label: "Ten" },
  { value: 20, label: "Twenty" },
  { value: 30, label: "Thirty" },
];

const names = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const areaDistribution = {
  10: ["Page A", "Page B"],
  20: ["Page C", "Page D"],
  30: ["Page E", "Page F"],
};

const dataAreaOrg = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
let dataSpeed = {};
let dataTraffic = {};
function Overview() {
  const [count, setCount] = useState(0);
  const [dataArea, setDataArea] = useState({});
  const [multiSelectValues, setMultiSelectValues] = useState([]);
  const [area, setArea] = useState([]);

  useEffect(() => {
    dataAreaOrg.forEach((item) => {
      dataSpeed[item.name] = item;
      dataTraffic[item.name] = item;
    });
    setDataArea({
      speed: dataSpeed,
      traffic: dataTraffic,
    });
  }, []);

  const multiSelectChange = (newMultiSelectValues) => {
    setMultiSelectValues(newMultiSelectValues);
  };
  const singleSelectChange = (newSingleSelectValue) => {
    setArea(areaDistribution[newSingleSelectValue]);
  };
  console.log(dataArea.speed);
  const renderGrid = () => {
    const colors = ["green", "yellow", "red"];
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 20px)",
          gap: "4px",
        }}
      >
        {Array.from({ length: 100 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
              border: "1px solid black",
            }}
          />
        ))}
      </Box>
    );
  };
  return (
    <>
      <Box sx={{ p: 4, ml: 6, mr: 6, mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          Traffic Status Dashboard
        </Typography>
        <StatHeadManager />
        <Box className="bg-white p-6 mt-10 rounded-xl shadow-custom">
          <Box className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold" align="left">
              Alert information
            </Typography>
            <SingleSelectCustom data={ageOptions} label="Age" />
          </Box>

          <Grid container spacing={4}>
            {trafficData.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Typography variant="h6" align="center">
                  {item.type}
                </Typography>
                {renderGrid()}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* <Box sx={{ mt: 2 }}>
          <Typography variant="h6" align="left">
            Camera information
          </Typography>
          <Box className="h-[240px] flex align-center justify-center">
            <PieChartCustom />
            <StraightAnglePieChartCustom />
          </Box>
        </Box> */}
        <Box className="bg-white p-6 mt-10 rounded-xl shadow-custom">
          <Box className="p-2">
            <Box className="flex justify-between items-center">
              <Typography variant="h6" className="font-bold" align="left">
                Traffic flow
              </Typography>
              <Box className="flex-1 flex justify-end">
                <SingleSelectCustom
                  data={ageOptions}
                  label="Age"
                  singleSelectChange={singleSelectChange}
                />
                <MultipleSelectCustom
                  data={names}
                  label="Names"
                  multiSelectChange={multiSelectChange}
                />
              </Box>
            </Box>

            <Box className="h-[200px] flex align-center justify-center mt-2">
              <AreaChartCustom
                title="Traffic flow"
                data={dataArea.traffic && Object.values(dataArea.traffic)}
                multiSelectValues={multiSelectValues}
                area={area}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" className="font-bold mb-4" align="left">
              Speed flow
            </Typography>
            <Box className="h-[200px] flex align-center justify-center mt-2">
              <AreaChartCustom
                title="Speed flow"
                data={dataArea.speed && Object.values(dataArea.speed)}
                multiSelectValues={multiSelectValues}
                area={area}
              />
            </Box>
          </Box>
        </Box>

        {/* <Box sx={{ mt: 4, height: 300 }}>
        <Typography variant="h6" gutterBottom>
          Inter-Vùng Table
        </Typography>
        <DataTable rows={rows} columns={columns} />
      </Box> */}
      </Box>
    </>
  );
}

export default Overview;
