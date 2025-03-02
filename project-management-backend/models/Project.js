const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started" }
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
