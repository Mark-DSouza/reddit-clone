import { UserResolver } from "./resolvers/user";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import mikroORMConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: { em: orm.em },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app }); // All this does is create a graphql endpoint

  app.listen(4000, () => console.log(`Server is running on localhost:4000`));
  //   const post = orm.em.create(Post, { title: "My Second Post" });
  //   await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main().catch((err) => console.log(err));
