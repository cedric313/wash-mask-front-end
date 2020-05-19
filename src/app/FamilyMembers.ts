export class FamilyMembers {

    public id: number;
    public firstName: string;
    public mask;

    constructor(id?: number, firstName?: string, mask?) {
        this.id = id;
        this.firstName = firstName;
        this.mask = mask;
    }
    
}
