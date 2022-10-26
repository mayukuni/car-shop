interface IService<T> {
  create(obj: unknown): Promise<T>,
  read(): Promise<T[]>,
  readOne(_id: string): Promise<T | null>,
  update(id: string, obj: T): Promise<T | null>
}

export default IService;