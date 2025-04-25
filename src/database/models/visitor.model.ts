import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "visitors",
  modelName: "Visitor",
  timestamps: true,
})
class Visitor extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare ipAddress: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userAgent: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare visitedAt: string;
}

export default Visitor;
