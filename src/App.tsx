import { createResource, For } from "solid-js";
import { GraphQLClient, gql } from "graphql-request";
import "tailwindcss/tailwind.css";

const client = new GraphQLClient("https://rickandmortyapi.com/graphql");
const QUERY = gql`
  query {
    characters {
      results {
        name
        species
        gender
        image
      }
    }
  }
`;

const fetchCharacters = async () => {
  const data = await client.request(QUERY);
  return data.characters.results;
};

const App = () => {
  const [characters] = createResource(fetchCharacters);

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Rick and Morty Characters</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <For each={characters()}>
          {(character) => (
            <div class="border rounded shadow p-4">
              <img
                src={character.image}
                alt={character.name}
                class="w-full h-32 object-cover mb-2"
              />
              <h2 class="text-lg font-semibold">{character.name}</h2>
              <p class="text-gray-600">Species: {character.species}</p>
              <p class="text-gray-600">Gender: {character.gender}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
