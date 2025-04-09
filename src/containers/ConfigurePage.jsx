import React, { useMemo, useRef, useState, useEffect } from "react";
import CameraDrawer from "./Camera/CameraDrawer";
import CameraConnect from "./Camera/CameraConnect";
import ConfigSidebar from "../components/ConfigSidebar/configSidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router";
import { Button } from "@mui/material";
import {
  apiGetCameraId,
  apiUpdateCamera,
  apiGetCamera,
} from "../connectDB/axios";
import SearchOptionBar from "../components/SearchOptionBar";
import DataTable from "../components/Table";

const service_info = [
  {
    id: 1,
    item_id: "reidentify",
    item_name: "ReID",
    group: null,
  },
  {
    id: 2,
    item_id: "license_plate",
    item_name: "license plate",
    group: null,
  },
  {
    id: 3,
    item_id: "vehicle_counting",
    item_name: "vehicle counting",
    group: null,
  },
  {
    id: 4,
    item_id: "speed_estimate",
    item_name: "speed estimate",
    group: null,
  },
  {
    id: 5,
    item_id: "crowd_detection",
    item_name: "crowd detection",
    group: null,
  },
];

const columns = [
  { field: "source_group", headerName: "Source Group", width: 160 },
  { field: "source_line", headerName: "Source Line", width: 160 },
  { field: "source_direction", headerName: "Source Direction", width: 160 },
  { field: "target_group", headerName: "Target Group", width: 160 },
  { field: "target_line", headerName: "Target Line", width: 160 },
  { field: "target_direction", headerName: "Target Direction", width: 160 },
];

const org_rows = [
  {
    id: 1,
    source_group: "A",
    source_line: "1",
    source_direction: "in",
    target_group: "B",
    target_line: "2",
    target_direction: "out",
  },
  {
    id: 2,

    source_group: "A",
    source_line: "2",
    source_direction: "in",
    target_group: "B",
    target_line: "2",
    target_direction: "out",
  },
  {
    id: 3,
    source_group: "A",
    source_line: "3",
    source_direction: "in",
    target_group: "C",
    target_line: "2",
    target_direction: "out",
  },
];

function ConfigurePage() {
  const [serviceName, setServiceName] = useState(null);
  const [cameraId, setCameraId] = useState(null);
  const [camera_info, setCameraInfo] = useState([]);

  const callBackService = (row) => {
    if (cameraId && row) {
      setServiceName(row.item_id);
    }
  };
  const callBackCamera = (row) => {
    setCameraId(row ? row.item_id : null);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      await apiGetCamera()
        .then((res) => {
          const { data } = res;
          console.log("camera_info data", data);
          if (data.length > 0) {
            // edit data same as format of service_info
            const cameraInfo = data.map((item) => ({
              id: item.camera_id,
              item_id: item.camera_id,
              item_name: item.camera_name,
              group: item.group_name,
            }));
            setCameraInfo(cameraInfo);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
  }, []);
  const applyCallback = () => {
    if (cameraId) {
      apiGetCameraId({ id: cameraId })
        .then((response) => {
          let services = response.data.services;
          console.log(services);
          let getDrawRows = [];
          for (let i = 0; i < services.length; i++) {
            for (
              let j = 0;
              j < Object.keys(services[i].data.cross_line).length;
              j++
            ) {
              getDrawRows.push({
                id: i,
                camera_name: cameraId,
                draw_type: "cross_line",
                draw_name: services[i].data.cross_line[j],
                groups_connected: response.data.groups_connected,
                service_name: services[i].service_name,
              });
            }
          }

          console.log(getDrawRows);
          setRows(getDrawRows);
        })
        .catch((error) => console.error("Error fetching image:", error));
    }
  };
  useEffect(() => {
    applyCallback();
  }, [cameraId]);
  console.log("camera_info", camera_info);
  console.log("^^^^ cameraId", cameraId);
  return (
    <>
      <div className="w-full flex bg-white p-4">
        <SearchOptionBar
          data={camera_info}
          label="Camera info"
          callBack={callBackCamera}
        />
        <div>
          <SearchOptionBar
            data={service_info}
            callBack={callBackService}
            label="AI Service"
            vary={cameraId}
          />
        </div>
      </div>
      <CameraDrawer
        serviceName={serviceName}
        cameraId={cameraId}
        applyCallback={applyCallback}
      />
    </>
  );
}

export default ConfigurePage;
