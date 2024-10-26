export class Category {
  private id: string;
  private name: string;

  constructor(data: { id: string; name: string }) {
    this.id = data.id;
    this.name = data.name;
  }

  get toSafeObject() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
