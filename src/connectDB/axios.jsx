import axios from "axios";

let API = axios.create({
    baseURL: `http://localhost:8001`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiRegister = async (data) => {
    let res = await API.post("/api/register", data);
    return res.data;
};
export const apiLogin = async (data) => {
    let res = await API.post("/api/login", data);
    return res.data;
};
export const apiGetCamera = async (data) => {
    let res = await API.get("/api/cameras", data);
    return res.data;
};
export const apiGetFrame = async (data) => {
    let res = await API.get(`/api/${data.id}/latest.webp`);
    return res.data;
};
export const apiGetCameraId = async (params) => {
    let res = await API.get(`/api/cameras/${params.id}`);
    return res.data;
};
export const apiDeleteCameraId = async (params) => {
    let res = await API.delete(`/api/cameras/${params.id}`);
    return res.data;
};
export const apiAddCamera = async (params) => {
    let res = await API.post("/api/cameras", params.data, {
        params,
    });
    return res.data;
};
export const apiUpdateCamera = async (data) => {
    let res = await API.put(`/api/cameras/${data.camera_id}`, data.data);
    return res.data;
};

export const apiUpdateCameraStatus = async (params) => {
    let res = await API.put(`/cameras/${params.id}/status`, null, {
        params,
    });
    return res.data;
};
export const apiGetEventOverview = async (data) => {
    let res = await API.post(`/events/overview`, data, {
        params: { event_type: data.event_type },
    });
    return res.data;
};
export const apiVehicleSearch = async (formData) => {
    let res = await API.post(`/api/reid_analysis/search_vehicle`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
export const apiLPR = async (formData) => {
    let res = await API.post(`/api/reid_analysis/lpr`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
