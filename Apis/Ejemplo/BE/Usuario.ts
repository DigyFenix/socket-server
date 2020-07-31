
export default class Usuario {

    id: number;
    nombre: string;
    apellido: string;


    private constructor(obj: any) {
        this.id         = obj['id'];
        this.nombre     = obj['nombre'];
        this.apellido   = obj['apellido'];
    }

    public static getInstance(obj: any): Usuario {
        return new this(obj);
    }
}