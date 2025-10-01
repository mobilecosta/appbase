import UseCase from "../../shared/useCase";

/// DDD: Application Service = Caso de Uso = Fluxo de Aplicação
export default class RegisterUser implements UseCase<any> {
  async execute(input: any): Promise<any> {
   return 'Deu certo!'
  }
}