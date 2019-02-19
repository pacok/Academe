export class SignUpInfo {
    nombre: string;
    username: string;
    email: string;
    rol: string[];
    password: string;

    constructor(nombre: string, username: string, email: string, password: string) {
        this.nombre = nombre;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = ['usuario'];
    }
}
