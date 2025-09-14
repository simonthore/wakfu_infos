import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import datasource from "./db";
import { buildSchema } from "type-graphql";
import { JetonResolver } from "./resolver/jetonResolver"; 
import { env } from "./env";
import * as http from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";


const start = async () => {
  // 🔹 1. Initialisation de la connexion à Postgres via TypeORM
  await datasource.initialize();
  console.log("✅ Database connected");

  // 🔹 2. Création de l’app Express
  const app: any = express();
  const httpServer = http.createServer(app);

  // 🔹 3. Construction du schéma GraphQL avec type-graphql
  const schema = await buildSchema({
    resolvers: [JetonResolver], // tu mets tous tes resolvers ici
  });

  // 🔹 4. Création du serveur Apollo
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }), // jolie interface locale
    ],
    context: ({ req, res }) => ({ req, res }), // si plus tard tu veux JWT, user, etc.
  });

  // 🔹 5. Middlewares Express
  const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (typeof origin === "undefined" || allowedOrigins.includes(origin))
          return callback(null, true);
        callback(new Error("Not allowed by CORS"));
      },
    })
  );

  app.get("/", (_req: Request, res: Response) => {
    res.send("<h1>🚀 Wakfu Backend is running</h1>");
  });

  // 🔹 6. Lancement du serveur Apollo
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

  // 🔹 7. Lancement de l’app
  const port = env.SERVER_PORT || 4001;
  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
};

start().catch(console.error);
