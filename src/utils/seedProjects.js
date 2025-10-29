const Project = require('../models/project');

const seedProjects = async () => {
  try {
    await Project.deleteMany();
    await Project.insertMany([
      {
        id: 1,
        title: 'Responsive Landing Page',
        desc: 'Modern landing page with animations and mobile-first design.',
        demo: '#',
        image: '/images/sword.jpg',
        skills: ['React', 'Tailwind CSS', 'JavaScript'],
      },
      {
        id: 2,
        title: 'Interactive Dashboard',
        desc: 'Dashboard with dynamic charts and controls.',
        demo: '#',
        image: null,
        skills: ['React', 'Node.js', 'MongoDB'],
      },
      {
        id: 3,
        title: 'E-commerce Frontend',
        desc: 'E-commerce UI with product filtering and cart.',
        demo: '#',
        image: null,
        skills: ['React', 'JavaScript', 'CSS'],
      },
    ]);
    console.log('✅ Projects seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  }
};

module.exports = seedProjects;