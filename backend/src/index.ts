import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { readFileSync } from "fs";
import { jetonResolver } from "./resolvers/jetonResolver";

const start = async () => {
  await AppDataSource.initialize();

  const app = express();

  // Chargement du schéma GraphQL
  const typeDefs = readFileSync(__dirname + "/schema.graphql", "utf-8");

  const server = new ApolloServer({
    typeDefs,
    resolvers: jetonResolver,
  });

  // await server.start();
  // server.applyMiddleware({ app, path: "/graphql" }); 

  // Middlewares Express
  app.use(cors());
  app.use(express.json());

  app.get("/", (_req: Request, res: Response) => {
    res.send("<h1>Wakfu Backend</h1>");
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

void start();
