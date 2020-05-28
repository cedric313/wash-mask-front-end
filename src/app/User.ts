export class User {
    public id: number;
    public email: string;
    public password: string;
    public pseudo: string;
    public authError: boolean;
    public familyMembers: [];
    public isActive: boolean;

    constructor(email?: string,
                password?: string,
                authError?: boolean,
                pseudo?: string,
                id?: number,
                isActive?: boolean) {
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
        this.id = id;
        this.authError = authError;
        this.isActive = isActive
    }

}
