const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  id: Number,
  title: String,
  desc: String,
  demo: String,
  image: String,
  skills: [String],
});

// ✅ Prevent OverwriteModelError by checking if model already exists
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

module.exports = Project;
