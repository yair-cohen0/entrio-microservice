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
}, {timestamps: true});

const Repository = mongoose.model('repositories', repositorySchema);

export const getAllRepositories = () => {
    return Repository.find({}, {name: 1, repoId: 1, _id: 0});
}

export const getRepositoryById = (repoId) => {
    return Repository.findOne({repoId});
}

export const getRepositoryByName = (name) => {
    return Repository.findOne({name});
}

