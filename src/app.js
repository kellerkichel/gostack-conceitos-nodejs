const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ erro: "Respositorie not found." });
  }

  const { likes } = repositories[repositorieIndex];

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositorieIndex] = repositorie;

  response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ erro: "Respositorie not found." });
  }

  repositories.splice(repositorieIndex, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ erro: "Respositorie not found." });
  }

  const { title, url, techs, likes } = repositories[repositorieIndex];

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: likes + 1,
  };

  repositories[repositorieIndex] = repositorie;

  response.json(repositorie);
});

module.exports = app;
