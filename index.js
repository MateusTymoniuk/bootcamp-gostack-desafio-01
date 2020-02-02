const express = require('express');

const server = express();
server.use(express.json())

let requestsCount = 0;

server.use((req, res, next) => {

  requestsCount += 1;

  console.log(requestsCount);

  return next();
});

function verifyProject(req, res, next) {

  const { id } = req.params;

  if (!projects[id]) {
    return res.status(404).send(`Project ${id} does not exist.`);
  }

  return next();
}

const projects = [];

server.get('/projects', (req, res) => {

  res.json(projects);
});

server.post('/projects', (req, res) => {

  const { id, title } = req.body;

  const newProject = { id, title, tasks: []};

  projects.push(newProject);

  res.json(newProject);
});

server.put('/projects/:id', verifyProject, (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  res.json(projects[id]);
});

server.delete('/projects/:id', verifyProject, (req, res) => {
  
  const { id } = req.params;

  projects.splice(id, 1);

  res.send();
});

server.post('/projects/:id/tasks', verifyProject, (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  res.json(projects[id]);
});

server.listen(3000, ()=> {
  console.log('Server running on port 3000');
})