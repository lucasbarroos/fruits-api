import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column("text")
    password: string;

    @Column()
    age: number;

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }
}