import { MyContext } from "src/types";
import { UserResolver } from "./resolvers/user";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __prod__ } from "./constants";
import mikroORMConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: " https://studio.apollographql.com",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "hkasfhjsajhaslkgjfaslkjglk",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      em: orm.em,
      req,
      res,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false }); // All this does is create a graphql endpoint

  app.listen(4000, () => console.log(`Server is running on localhost:4000`));
  //   const post = orm.em.create(Post, { title: "My Second Post" });
  //   await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main().catch((err) => console.log(err));
