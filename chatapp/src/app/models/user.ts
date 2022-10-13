export class User {
    public id: number;
    public username: string;
    public email: string;
    public role: string;

    constructor(id: number,username: string, email: string, role: string){
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}