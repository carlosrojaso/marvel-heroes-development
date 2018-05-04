export class Hero {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    
    constructor(data: any) {
        this.id = data && data.id || '';
        this.name = data && data.name || '';
        this.description = data && data.description || '';
        this.thumbnail = `${data.thumbnail.path}.${data.thumbnail.extension}`;
    }
}