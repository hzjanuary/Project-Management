import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

export const getProjects = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createProject = async (project) => {
    const res = await axios.post(API_URL, project);
    return res.data;
};
