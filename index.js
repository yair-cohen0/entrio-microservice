import express from 'express'
import {getAllRepositories, getRepositoryById, getRepositoryByName} from "./database.js";

const app = express();
const PORT = process.env.port || 3000;

app.get('/', async (req, res) => {
    res.status(200).send(await getAllRepositories());
})

app.get('/:value', async (req, res) => {
    const {type} = req.query;
    const {value} = req.params;
    if (type === 'name') {
        res.status(200).send(await getRepositoryByName(value));
    } else {
        if (isNaN(value)) {
            res.status(400).send('Invalid repoId');
            return;
        }
        res.status(200).send(await getRepositoryById(value));
    }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));