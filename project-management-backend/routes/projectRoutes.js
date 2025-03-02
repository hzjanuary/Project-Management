const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// Lấy tất cả dự án
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Tạo dự án mới
router.post("/", async (req, res) => {
  const { name, description, status } = req.body;
  const project = new Project({ name, description, status });
  await project.save();
  res.status(201).json(project);
});

// Cập nhật dự án
router.put("/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(project);
});

// Xóa dự án
router.delete("/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

// Route để lấy danh sách dự án
router.get("/", async (req, res) => {
  try {
      const projects = await Project.find();
      res.json(projects);
  } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
  }
});

// Route để thêm dự án mới
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Tên dự án là bắt buộc!" });

  try {
      const newProject = new Project({ name });
      await newProject.save();
      res.status(201).json(newProject);
  } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo dự án" });
  }
});

// API cập nhật dự án
router.put("/:id", async (req, res) => {
  try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedProject);
  } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật dự án" });
  }
});

module.exports = router;
