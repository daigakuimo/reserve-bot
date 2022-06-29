import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  guild_id: string

  @Column()
  channel_id: string

  @Column()
  title: string

  @Column("text")
  content: string

  @Column()
  reserve_time: Date

  @Column()
  repeat: string
}