import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId : number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  date: string;

  @Column()
  rating: number;

  @Column()
  description: string;

}