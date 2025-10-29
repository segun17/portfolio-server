const Project = require('../models/project');
const jwt = require('jsonwebtoken');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.addProject = async (req, res) => {
  const { title, desc, demo, image, skills } = req.body;
  try {
    // Verify JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    jwt.verify(token, process.env.JWT_SECRET);

    const newProject = new Project({
      id: (await Project.countDocuments()) + 1,
      title,
      desc,
      demo,
      image,
      skills,
    });
    await newProject.save();
    res.status(201).json({ message: 'Project added', project: newProject });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, desc, demo, image, skills } = req.body;
  try {
    // Verify JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    jwt.verify(token, process.env.JWT_SECRET);

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.title = title;
    project.desc = desc;
    project.demo = demo;
    project.image = image || project.image;
    project.skills = skills;
    await project.save();

    res.json({ message: 'Project updated', project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    // Verify JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    jwt.verify(token, process.env.JWT_SECRET);

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};