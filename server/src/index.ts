import "reflect-metadata";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

import resolvers from "./resolvers";

const PORT: String | Number = process.env.PORT || 4000;

const startServer = async () => {
  const schema: GraphQLSchema = await buildSchema({ resolvers });

  const server: ApolloServer = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
