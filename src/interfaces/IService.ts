interface IService<T> {
  create(obj: unknown): Promise<T>,
}

export default IService;