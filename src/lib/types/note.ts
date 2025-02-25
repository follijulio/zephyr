export class Note {
  id?: string;
  note: string;
  title: string;
  actived: boolean;
  userId: string;

  constructor(
    note: string,
    title: string,
    actived: boolean,
    userId: string,
    id?: string
  ) {
    this.id = id;
    this.note = note;
    this.title = title;
    this.actived = actived;
    this.userId = userId;
  }

  serialize() {
    return {
      id: this.id,
      note: this.note,
      title: this.title,
      actived: this.actived,
      userId: this.userId
    };
  }

  deserialize(data: Note): Note {
    return new Note(data.note, data.title, data.actived, data.userId, data.id);
  }
}
