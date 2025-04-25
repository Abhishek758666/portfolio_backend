import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "projects",
  modelName: "Project",
  timestamps: true,
})
class Project extends Model {
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
  declare projectImage: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  declare link: string;
}

export default Project;
