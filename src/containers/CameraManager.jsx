import { useState } from "react";
import CameraDrawer from "./Camera/CameraDrawer";
import CameraConnect from "./Camera/CameraConnect";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ConfigSidebar from "../components/ConfigSidebar/configSidebar";
import CameraList from "./Camera/CameraList";
import AddCameraForm from "./Camera/AddCameraForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function CameraManager() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [compIndex, setCompIndex] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="flex flex-col flex-1 position-relative">
        <h1>hello</h1>
        <Routes>
          <Route path="/cameras" element={<CameraList />} />
          <Route path="/cameras/add" element={<AddCameraForm mode="add" />} />
          <Route
            path="/cameras/edit/:id/info"
            element={<AddCameraForm mode="edit" />}
          />
        </Routes>

        {/* <AddCameraForm /> */}
      </div>
    </>
  );
}

export default CameraManager;
