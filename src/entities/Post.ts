import { Field, ObjectType } from "type-graphql";
import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

@ObjectType()
@Entity()
export class Post {
  [OptionalProps]?: "createdAt" | "updatedAt";

  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({
    type: "date",
    onUpdate: () => new Date(),
  })
  updatedAt = new Date();

  @Field()
  @Property()
  title!: string;
}
