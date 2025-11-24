import { Table, Column, Model, DataType } from 'sequelize-typescript';

// Model (corrected):
// - Strong generics for attributes & creation
// - Non-null constraints and default for flavors
// - timestamps enabled for auditing
interface CoffeeAttributes {
  id: number;
  name: string;
  brand: string;
  flavors: string[];
  price: number;
}

@Table({ tableName: 'coffees', timestamps: true })
export class Coffee extends Model<CoffeeAttributes, Omit<CoffeeAttributes, 'id'>> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  brand!: string;

  @Column({ type: DataType.JSON, allowNull: false, defaultValue: [] })
  flavors!: string[];

  @Column({ type: DataType.FLOAT, allowNull: false })
  price!: number;
}
