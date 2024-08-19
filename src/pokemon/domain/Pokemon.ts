import { IPokemon } from './IPokemon';

export class Pokemon {
  readonly #id: string;
  readonly #name: string;
  readonly #types: string[];
  readonly #avatar: string;
  readonly #sprites: string[];

  constructor(id: string, name: string, types: string[], avatar: string, sprites: string[]) {
    this.#id = id;
    this.#name = name;
    this.#types = types;
    this.#avatar = avatar;
    this.#sprites = sprites;
  }

  public static create(id: string, name: string, types: string[], avatar: string, sprites: string[]): Pokemon {
    return new Pokemon(id, name, types, avatar, sprites);
  }

  get toPrimitives(): IPokemon {
    return {
      id: this.#id,
      name: this.#name,
      types: this.#types,
      avatar: this.#avatar,
      sprites: this.#sprites,
    };
  }

  public static fromPrimitives(primitives: IPokemon): Pokemon {
    return new Pokemon(primitives.id, primitives.name, primitives.types, primitives.avatar, primitives.sprites);
  }
}
