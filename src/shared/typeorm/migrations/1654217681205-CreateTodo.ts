import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTodo1654217681205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "todos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            isGenerated: true,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "deadline",
            type: "timestamp",
          },
          {
            name: "status",
            type: "varchar",
            default: "'Pending'",
          },
          {
            name: "owner_id",
            type: "uuid",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserRental",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["owner_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("todos");
  }
}
