import { IPokemonRepository } from '../../domain/repository/IPokemonRepository';

export class GetPokemonDetailUseCase {
  readonly  #pokemonRepository: IPokemonRepository;

  constructor(dependencies: { pokemonRepository: IPokemonRepository }) {
    this.#pokemonRepository = dependencies.pokemonRepository;
  }

  public async execute(pokemonId: string) {
    return this.#pokemonRepository.getPokemon(pokemonId);
  }
}
