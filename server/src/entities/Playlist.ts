import { Entity, ManyToMany, JoinTable, ManyToOne, Column } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import BaseEntity from "./BaseEntity";

import { AppUser as User } from "./User";
import { Song } from "./Song";

@Entity()
@ObjectType()
export class Playlist extends BaseEntity {
  @Field()
  @Column()
  name!: string;

  @ManyToOne(
    () => User,
    user => user.playlists
  )
  user!: User;

  @ManyToMany(() => Song)
  @JoinTable()
  songs!: Song[];
}
