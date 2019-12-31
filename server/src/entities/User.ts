import { Entity, Column, OneToMany } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";

import BaseEntity from "./BaseEntity";

import { Playlist } from "./Playlist";

@Entity()
@ObjectType()
export class AppUser extends BaseEntity {
  @Field()
  @Column("text", { unique: true })
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @Column("text", { nullable: true })
  firstName!: string;

  @Field()
  @Column("text", { nullable: true })
  lastName!: string;

  @OneToMany(
    () => Playlist,
    playlist => playlist.user
  )
  playlists!: Playlist[];
}
