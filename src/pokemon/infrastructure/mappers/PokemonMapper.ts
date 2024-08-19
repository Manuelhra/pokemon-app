import { Pokemon } from '../../domain/Pokemon';
import type { PokemonDetailResponse } from '../interfaces/PokemonListResponse';

export class PokemonMapper {
  public static mapApiPokemonToDomain(data: PokemonDetailResponse): Pokemon {
    const avatar: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const types = data.types.map((type) => type.type.name);
    const sprites = PokemonMapper.getSprites(data);

    return Pokemon.create(`${data.id}`, data.name, sprites, avatar, types);
  }

  private static getSprites(data: PokemonDetailResponse): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      {sprites.push(data.sprites.other?.home.front_default);}
    if (data.sprites.other?.['official-artwork'].front_default)
      {sprites.push(data.sprites.other?.['official-artwork'].front_default);}
    if (data.sprites.other?.['official-artwork'].front_shiny)
      {sprites.push(data.sprites.other?.['official-artwork'].front_shiny);}
    if (data.sprites.other?.showdown.front_default)
      {sprites.push(data.sprites.other?.showdown.front_default);}
    if (data.sprites.other?.showdown.back_default)
      {sprites.push(data.sprites.other?.showdown.back_default);}

    return sprites;
  }
}
