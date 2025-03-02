import React, { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Danh sách Dự án</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>{project.name} - {project.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
