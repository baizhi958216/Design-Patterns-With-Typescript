export class Actor {
  #type: string = "";
  #sex: string = "";
  #face: string = "";
  #costume: string = "";
  #hairstyle: string = "";

  public setType(type: string): void {
    this.#type = type;
  }
  public setSex(sex: string): void {
    this.#sex = sex;
  }
  public setFace(face: string): void {
    this.#face = face;
  }
  public setCostume(costume: string): void {
    this.#costume = costume;
  }
  public setHairstyle(hairstyle: string): void {
    this.#hairstyle = hairstyle;
  }
  public getType(): string {
    return this.#type;
  }
  public getSex(): string {
    return this.#sex;
  }

  public getFace(): string {
    return this.#face;
  }

  public getCostume(): string {
    return this.#costume;
  }

  public getHairstyle(): string {
    return this.#hairstyle;
  }
}
