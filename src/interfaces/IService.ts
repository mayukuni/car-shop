interface IService<T> {
  create(obj: unknown): Promise<T>,
  read(): Promise<T[]>
}

export default IService;