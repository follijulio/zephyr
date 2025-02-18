export class Note {
  id?: string;
  note: string;
  title: string;
  actived: boolean;

  constructor(note: string, title: string, actived: boolean) {
    this.note = note;
    this.title = title;
    this.actived = actived;
  }
}
