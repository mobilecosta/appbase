export default interface UseCase<Input> {
  execute(input: any): Promise<any>;
}