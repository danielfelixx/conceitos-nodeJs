const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  if(!isUuid(id)){    
      response.status(400).json({error:'Invalid Id'});
   }  
  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    response.status(400).json({ error: "Id not Found" });
  }
    const repository = {     
      id, 
      title,
      url,
      techs,
      likes :repositories[index].likes
    };
    repositories[index] = repository;

    response.status(200).json(repositories[index]);
  
 


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    response.status(400).json({ error: "Invalid Id" });
  } else {
    repositories.splice(index, 1);
    response.status(204).json();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(repository => repository.id === id);
  if (index < 0) {
    response.status(400).json({ error: "Invalid Id" });
  } else {
    repositories[index].likes++;
    response.status(200).json(repositories[index]);
  }

});

module.exports = app;
