export class Monster {
  name: string;
  hp: number;
  image: string;
  attack: string;
  damage: number;
  duration: number;

  constructor(
    n: string,
    hp: number,
    img: string,
    a: string,
    da: number,
    du: number
  ) {
    this.name = n;
    this.hp = hp;
    this.image = img;
    this.attack = a;
    this.damage = da;
    this.duration = du;
  }
}
