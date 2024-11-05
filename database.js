import * as mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
} catch (error) {
    throw new Error("MongoDB connection failed: " + error.message);
}

const repositorySchema = new mongoose.Schema({
    repoId: Number,
    name: String,
    owner: String,
    description: String,
    stars: Number,
    forks: String,
    numberOfForks: Number,
    languages: String,
    topics: [String],
}, { timestamps: true });

const Repository = mongoose.model('repositories', repositorySchema);

export const getAllRepositories = async () => {
    const repos = await Repository.find({});
    return repos;
}

export const getRepositoryById = async (repoId) => {
    const repo = await Repository.findOne({ repoId });
    return repo;
}

export const getRepositoryByName = async (name) => {
    const repo = await Repository.findOne({ name });
    return repo;
}

