import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "notes",
  modelName: "Note",
  timestamps: true,
})
class Note extends Model {
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
  declare image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare message: string;
}

export default Note;
