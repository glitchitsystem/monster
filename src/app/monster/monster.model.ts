export class Monster {
  public name: string;
  public description: string;
  public favorite: boolean;
  public role: string;

  constructor(name: string, desc: string, favorite: boolean, role: string) {
    this.name = name;
    this.description = desc;
    this.favorite = favorite;
    this.role = role;
  }
}
