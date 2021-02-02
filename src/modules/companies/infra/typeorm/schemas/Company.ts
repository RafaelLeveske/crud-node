import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
class Company {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  recipient_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Company;
