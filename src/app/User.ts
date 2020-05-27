export class User {
    public id: number;
    public email: string;
    public password: string;
    public pseudo: string;
    public authError: boolean;
    public familyMembers: [];

    constructor(email?: string, password?: string,authError?: boolean,pseudo?: string, id?: number) {
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
        this.id = id;
        this.authError = authError;
    }

}
