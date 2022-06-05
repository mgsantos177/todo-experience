interface ICreateTodoDTO {
  id?: string;
  description: string;
  deadline: Date;
  owner_id: string;
  status?: string;
}

export { ICreateTodoDTO };
