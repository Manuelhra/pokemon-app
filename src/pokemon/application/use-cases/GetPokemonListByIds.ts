import { Pokemon } from '../../domain/Pokemon';
import { IPokemonRepository } from '../../domain/repository/IPokemonRepository';

export class GetPokemonListByIds {
  readonly #pokemonRepository: IPokemonRepository;

  constructor(dependencies: { pokemonRepository: IPokemonRepository }) {
    this.#pokemonRepository = dependencies.pokemonRepository;
  }

  public async execute(pokemonIds: string[]): Promise<Pokemon[]> {
    return this.#pokemonRepository.getPokemonListByIds(pokemonIds);
  }
}
