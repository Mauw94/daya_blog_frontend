export class BlogModel {
    content: string;
    date: string;
    title: string;
    image: string;

    constructor(content: string, date: string, title: string, image: string) {
        this.content = content;
        this.date = date;
        this.title = title;
        this.image = image;
    }
}
