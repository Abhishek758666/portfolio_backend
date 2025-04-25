import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "blogs",
  modelName: "Blog",
  timestamps: true,
})
class Blog extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare excert: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;
}

export default Blog;
