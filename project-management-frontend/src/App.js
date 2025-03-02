import React, { useState } from "react";
import "./App.css";

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const day = `${d.getDate()}`.padStart(2, "0");
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    customer: "",
    deadline: "",
    description: "", // Thêm mô tả dự án
  });
  const [editingProject, setEditingProject] = useState(null);

  // ✅ Thêm dự án mới
  const addProject = () => {
    if (
      !newProject.name ||
      !newProject.customer ||
      !newProject.deadline ||
      !newProject.description
    ) {
      alert("Vui lòng nhập đầy đủ thông tin dự án!");
      return;
    }

    const createdAt = new Date();
    const deadline = new Date(newProject.deadline);

    if (deadline < createdAt) {
      alert("Hạn hoàn thành phải sau ngày tạo!");
      return;
    }

    const newEntry = {
      id: projects.length + 1,
      name: newProject.name,
      customer: newProject.customer,
      createdAt: formatDate(createdAt),
      deadline: formatDate(deadline),
      description: newProject.description,
    };

    setProjects([...projects, newEntry]);
    setNewProject({ name: "", customer: "", deadline: "", description: "" });
  };

  // ✅ Xóa dự án
  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // ✅ Bắt đầu chỉnh sửa dự án
  const editProject = (project) => {
    setEditingProject(project.id);

    const parts = project.deadline.split("/");
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const month = parts[1].padStart(2, "0");
      const year = parts[2];
      const formattedDeadline = `${year}-${month}-${day}`;

      setNewProject({
        name: project.name,
        customer: project.customer,
        deadline: formattedDeadline,
        description: project.description,
      });
    }
  };

  // ✅ Cập nhật dự án
  const updateProject = () => {
    if (
      !newProject.name ||
      !newProject.customer ||
      !newProject.deadline ||
      !newProject.description
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const deadline = new Date(newProject.deadline);

    setProjects(
      projects.map((project) =>
        project.id === editingProject
          ? {
              ...project,
              name: newProject.name,
              customer: newProject.customer,
              deadline: formatDate(deadline),
              description: newProject.description,
            }
          : project
      )
    );

    setEditingProject(null);
    setNewProject({ name: "", customer: "", deadline: "", description: "" });
  };

  return (
    <div className="App">
      <h1>Quản lý dự án</h1>

      {/* Form thêm & chỉnh sửa */}
      <div className="form-container">
        <label>Tên dự án:</label>
        <input
          type="text"
          placeholder="Nhập tên dự án"
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
        />

        <label>Tên khách hàng:</label>
        <input
          type="text"
          placeholder="Nhập tên khách hàng"
          value={newProject.customer}
          onChange={(e) =>
            setNewProject({ ...newProject, customer: e.target.value })
          }
        />

        <label>Mô tả dự án:</label>
        <textarea
          placeholder="Nhập mô tả dự án"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        ></textarea>

        <label>Nhập ngày hoàn thành:</label>
        <input
          type="date"
          value={newProject.deadline}
          onChange={(e) =>
            setNewProject({ ...newProject, deadline: e.target.value })
          }
        />

        {editingProject ? (
          <button onClick={updateProject}>Cập nhật</button>
        ) : (
          <button onClick={addProject}>Thêm dự án</button>
        )}
      </div>

      {/* Danh sách dự án */}
      <table className="project-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên dự án</th>
            <th>Tên khách hàng</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Hạn hoàn thành</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>{project.name}</td>
              <td>{project.customer}</td>
              <td>{project.description}</td>
              <td>{project.createdAt}</td>
              <td>{project.deadline}</td>
              <td>
                <button onClick={() => editProject(project)}>
                  ✏️ Chỉnh sửa
                </button>
                <button onClick={() => deleteProject(project.id)}>
                  🗑️ Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
