export abstract class BaseETL<T, W> {
  protected abstract getData(): T;
  protected abstract mappingData(data: T): W;
  protected abstract run(mappedData: W): void;

  public async execute(): Promise<void> {
    const data = this.getData();
    const mappedData = this.mappingData(data);

    this.run(mappedData);
  }
}
