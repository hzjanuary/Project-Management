import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams(); // Lấy ID dự án từ URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/projects/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <h2>Loading project details...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!project) return <h2>Project not found</h2>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <p>
        <strong>Status:</strong> {project.status}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(project.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong>{" "}
        {new Date(project.endDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProjectDetail;
