const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cors = require("cors");
const corsOption={
    origin:"http://localhost:8081"
};
app.use(cors(corsOption));






app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.get('/explorers', async (req, res) => {
  const allExplorers =  await prisma.explorer.findMany({});
  res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});

app.post('/explorers', async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission
   };
  const message = 'Explorer creado.';
  await prisma.explorer.create({data: explorer});
  return res.json({message});
});

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});




app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

////

app.get('/v1/explorersed', async (req, res) => {
  const allExplorers =  await prisma.explorerApi.findMany({});
  res.json(allExplorers);
});


app.get('/v1/explorersed/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorerApi.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});


app.post('/v1/explorersed', async (req, res) => {
  const explorerID = {
    name: req.body.name,
    lang: req.body.lang,
    missionCommanderg: req.body.missionCommanderg,
   };
  const message = 'Explorer creado.';
  await prisma.explorerApi.create({data: explorerID});
  return res.json({message});
});


app.put('/explorersed/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorerApi.update({
		where: {
			id: id
		},
		data: {
      missionCommanderg: req.body.missionCommanderg
		}
	})

	return res.json({message: "Actualizado correctamente"});
});


app.delete('/explorerApi/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});


app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});