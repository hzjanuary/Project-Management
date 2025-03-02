import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/projects");
            setProjects(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách dự án:", error);
        }
    };

    const addProject = async () => {
        if (!newProject) return alert("Tên dự án không được để trống!");
        try {
            const response = await axios.post("http://localhost:5000/api/projects", { name: newProject });
            setProjects([...projects, response.data]); // Cập nhật danh sách
            setNewProject(""); // Xóa input sau khi thêm
        } catch (error) {
            console.error("Lỗi khi thêm dự án:", error);
        }
    };

    return (
        <div>
            <h2>Danh sách dự án</h2>
            <input
                type="text"
                placeholder="Tên dự án mới"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
            />
            <button onClick={addProject}>Thêm dự án</button>

            <ul>
                {projects.map((project) => (
                    <li key={project._id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
