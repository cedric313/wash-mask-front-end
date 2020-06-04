export class User {
    public id: number;
    public email: string;
    public password: string;
    public pseudo: string;
    public authError: boolean;
    public familyMembers: [];
    public role: string;
    public isActive: boolean;
    public username: string;

    constructor(email?: string,
                password?: string,
                authError?: boolean,
                pseudo?: string,
                id?: number,
                isActive?: boolean,
                username?: string,
                role?: string
                ) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.pseudo = pseudo;
        this.id = id;
        this.authError = authError;
        this.role = role;
        this.isActive = isActive
    }

}
