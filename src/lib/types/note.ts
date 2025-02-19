export class Note {
  id: string;
  note: string;
  title: string;
  actived: boolean;

  constructor(note: string, title: string, actived: boolean, id: string) {
    this.id = id
    this.note = note;
    this.title = title;
    this.actived = actived;
  }
}
