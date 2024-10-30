import { iEntity } from './iEntity';

export class Category extends iEntity {
  private id: string;
  private name: string;

  constructor(data: { id: string; name: string }) {
    super();
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
