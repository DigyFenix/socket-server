import Sala from "./sala";

export default class SalasSocketController {
  private salas: Sala[] = [];

  public crearSala(idSala: string, nombre: string) {
    this.salas.push(new Sala(idSala, nombre));
  }

  public getSalas(): Sala[] {
    return this.salas;
  }

  public eliminarSala(idSala: string) {
    this.salas = this.salas.filter((s) => s.idSala === idSala);
  }

  public getSala(idSala: string): Sala {
    return <Sala>this.salas.find((s) => s.idSala === idSala);
  }

  public eliminarUsuario(clientId: string) {
    for (const sala of this.salas) {
      if (sala.existeUsuario(clientId)) sala.eliminarUsuario(clientId);
    }
  }
}
