import { Entity, ManyToMany, JoinTable, Column } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import BaseEntity from "./BaseEntity";

import { Playlist } from "./Playlist";

@Entity()
@ObjectType()
export class Song extends BaseEntity {
  @Field()
  @Column()
  title!: string;

  @ManyToMany(() => Playlist)
  @JoinTable()
  playlists!: Playlist[];

  // MORE FIELDS FOR SONG
}
