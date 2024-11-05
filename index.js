import express from 'express'
import {getAllRepositories, getRepositoryById, getRepositoryByName} from "./database.js";
import {fetchRepositoryByName} from "./dataCollectionApi.js";

const app = express();
const PORT = process.env.port || 3000;

app.get('/', async (req, res) => {
    res.status(200).send(await getAllRepositories());
})

app.get('/:value', async (req, res) => {
    const {type} = req.query;
    const {value} = req.params;


    if (type === 'name') {
        console.log(`Getting repository named "${value}"...`)

        const repo = await getRepositoryByName(value);
        if (!repo) {
            try {
                console.log(`Fetching repository "${value}" from external API...`)
                res.status(200).send(fetchRepositoryByName(value));
                return;
            } catch (e) {
                res.status(500).send(e.message);
                return
            }
        }
        res.status(200).send(repo);
    } else {

        if (isNaN(value)) {
            console.error(`Invalid repoId: "${value}"`)
            res.status(400).send(`Invalid repoId`);
            return;
        }

        console.log(`Getting repository by id ${value}...`)

        const repo = await getRepositoryById(value);
        if (!repo) {
            res.status(404).send('Repo not found');
            return
        }
        res.status(200).send(repo);
    }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));