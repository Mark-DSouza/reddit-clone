import { MikroORM } from "@mikro-orm/core";

import mikroORMConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  await orm.getMigrator().up();
  //   const post = orm.em.create(Post, { title: "My Second Post" });
  //   await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.log(posts);
};

main().catch((err) => console.log(err));
