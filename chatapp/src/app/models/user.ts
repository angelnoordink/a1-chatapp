export class User {
    public id: number;
    public username: string;
    public email: string;
    public super_user_ind: boolean;

    constructor(id: number,username: string, email: string, super_user_ind: boolean){
        this.id = id;
        this.username = username;
        this.email = email;
        this.super_user_ind = super_user_ind;
    }
}