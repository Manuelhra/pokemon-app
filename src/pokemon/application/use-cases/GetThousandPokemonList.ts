import { IPokemonRepository } from '../../domain/repository/IPokemonRepository';

export class GetThousandPokemonList {
  readonly #pokemonRepository: IPokemonRepository;

  constructor(dependencies: { pokemonRepository: IPokemonRepository }) {
    this.#pokemonRepository = dependencies.pokemonRepository;
  }

  public async execute() {
    return this.#pokemonRepository.getThousandPokemonList();
  }
}
