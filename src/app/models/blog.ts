export class BlogModel {
    content: string;
    date: string;
    title: string;

    constructor(content: string, date: string, title: string) {
        this.content = content;
        this.date = date;
        this.title = title;
    }
}
