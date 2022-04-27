import { __prod__ } from "./constants";
import { POSTGRES_USER, POSTGRES_PASSWORD } from "./environmentConstants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  type: "postgresql",
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}",
  },
  entities: ["./dist/entities"],
  entitiesTs: ["./src/entities"],
  dbName: "reddit-clone",
  debug: !__prod__,
  allowGlobalContext: true,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
} as Parameters<typeof MikroORM.init>[0];
