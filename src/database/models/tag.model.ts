import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "tags",
  modelName: "Tag",
  timestamps: true,
})
class Tag extends Model {
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
  declare title: string;
}

export default Tag;
