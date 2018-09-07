export class BlogModel {
    id: string;
    content: string;
    date: string;
    title: string;
    image: string[];

    constructor(id: string, content: string, date: string, title: string, image: string[]) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.title = title;
        this.image = image;
    }
}
