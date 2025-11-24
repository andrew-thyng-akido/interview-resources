import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'coffees' })
export class Coffee extends Model<any> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.STRING })
  brand!: string;

  @Column({ type: DataType.JSON })
  flavors!: string[];

  @Column({ type: DataType.FLOAT })
  price!: number;
}
