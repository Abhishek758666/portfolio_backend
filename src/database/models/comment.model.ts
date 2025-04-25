import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "comments",
  modelName: "Comment",
  timestamps: true,
})
class Comment extends Model {
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
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare comment: string;
}

export default Comment;
