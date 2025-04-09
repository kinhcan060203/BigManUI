import { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { PieChartCustom, StraightAnglePieChartCustom } from "./PieChartCustom";
import { AreaChartCustom } from "./AreaChartCustom";
import StatHeadManager from "./Overview/StatHeadManager";
import { apiGetSummaryTraffic, apiGetCamera } from "../../connectDB/axios";
import {
  SingleSelectCustom,
  MultipleSelectCustom,
} from "../../components/SelectCustom";

import SearchOptionBar from "../../components/SearchOptionBar";

const trafficData = [
  { id: 1, type: "Red light" },
  { id: 2, type: "OverSpeed" },
  { id: 3, type: "Traffic jam" },
  { id: 4, type: "Accident" },
];
const intervalOptions = [
  { value: (3600 * 0.5) / 6, label: "5 Minute" },
  { value: (3600 * 0.5) / 3, label: "10 Minute" },
  { value: 3600 * 0.5, label: "0.5 Hour" },
  { value: 3600 * 1, label: "1 Hour" },
  { value: 3600 * 3, label: "3 Hour" },
  { value: 3600 * 6, label: "6 Hour" },
  { value: 3600 * 24, label: "1 Day" },
  { value: 3600 * 24 * 5, label: "5 Day" },
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
  const [cameraInfo, setCameraInfo] = useState([]);
  const [cameraNames, setCameraNames] = useState([]);
  const [trafficCameraSelect, setTrafficCameraSelect] = useState(null);
  const [trafficIntervalSelect, setTrafficIntervalSelect] = useState(
    (3600 * 0.5) / 6
  );

  const field = ["car", "motorbike", "bus", "truck", "bicycle"];

  const fetchCamera = async () => {
    await apiGetCamera()
      .then((res) => {
        const { data } = res;
        console.log("camera_info data", data);
        if (data.length > 0) {
          const _cameraInfo = data.map((item) => ({
            id: item.camera_id,
            item_id: item.camera_id,
            item_name: item.camera_name,
            group: item.group_name,
          }));
          setCameraInfo(_cameraInfo);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchSummaryTraffic = async ({
    camera_ids = ["all"],
    interval = 3600 * 0.5,
  }) => {
    let total_transformedData = {};

    for (let i = 0; i < camera_ids.length; i++) {
      const camera_id = camera_ids[i];
      try {
        const res = await apiGetSummaryTraffic({
          camera_id: camera_id,
          interval: interval,
        });

        const transformedData = Object.fromEntries(
          Object.entries(res.summary).map(([date, items]) => {
            const classCount = items.reduce((acc, item) => {
              const className = item.class_name;
              acc[className] = (acc[className] || 0) + 1;
              return acc;
            }, {});
            return [date, classCount];
          })
        );

        // Bổ sung date format + ensure đủ field
        Object.keys(transformedData).forEach((date) => {
          field.forEach((key) => {
            if (!(key in transformedData[date])) {
              transformedData[date][key] = 0;
            }
          });

          // Add formatted date
          const d = formatDateTime(date);
          transformedData[date]["date"] = d;

          // Gộp vào total_transformedData
          if (!(date in total_transformedData)) {
            total_transformedData[date] = { ...transformedData[date] };
          } else {
            field.forEach((key) => {
              total_transformedData[date][key] =
                (total_transformedData[date][key] || 0) +
                (transformedData[date][key] || 0);
            });
          }
        });
      } catch (err) {
        console.error("❌ fetchSummaryTraffic error:", err);
      }
    }

    setDataArea((prev) => ({
      ...prev,
      traffic: total_transformedData,
    }));
  };

  function formatDateTime(dateTimeStr) {
    console.log("dateTimeStr", dateTimeStr);
    const [date, time] = dateTimeStr.split(" ");
    const [day, month, year] = date.split("-");
    const [hour, minute] = time.split(":");

    return dateTimeStr;
  }
  useEffect(() => {
    setTrafficCameraSelect("all");
    fetchSummaryTraffic({
      camera_ids: ["all"],
      interval: trafficIntervalSelect,
    });
    fetchCamera();
  }, []);

  const handleTrafficCameraSelect = (data) => {
    setTrafficCameraSelect(data?.item_id);
    if (!data?.item_id) {
      fetchSummaryTraffic({
        camera_ids: ["all"],
        interval: trafficIntervalSelect,
      });
    } else {
      fetchSummaryTraffic({
        camera_ids: [data?.item_id],
        interval: trafficIntervalSelect,
      });
    }
  };
  const singleSelectChange = (value) => {
    setTrafficIntervalSelect(value);
    fetchSummaryTraffic({
      camera_ids: [trafficCameraSelect],
      interval: value,
    });
  };
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
            <SingleSelectCustom data={intervalOptions} label="Interval" />
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
              <Box className="flex-1 flex justify-end items-center">
                <SingleSelectCustom
                  data={intervalOptions}
                  label="Interval"
                  singleSelectChange={singleSelectChange}
                />
                <SearchOptionBar
                  data={cameraInfo}
                  label="Camera info"
                  callBack={handleTrafficCameraSelect}
                  width={250}
                />
              </Box>
            </Box>

            <Box className="h-[300px] flex align-center justify-center mt-2">
              <AreaChartCustom
                title="Traffic flow"
                data={dataArea.traffic && Object.values(dataArea.traffic)}
                multiSelectValues={multiSelectValues}
                area={area}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h6" className="font-bold mb-4" align="left">
              Speed flow
            </Typography>
            <Box className="h-[300px] flex align-center justify-center mt-2">
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
