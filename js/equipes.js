const baseUrl = "https://pokebuildapi.fr/api/v1/pokemon";
const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

for (let id of favoris) {
  if (!id || id === "null" || id === "undefined") continue;

  fetch(`${baseUrl}/${id}`)
      .then(res => res.json())
      .then(pokemon => {
        const types = pokemon.apiTypes.map(type => type.name).join(", ");

        let cardElement = document.createElement("div");
        cardElement.className = "card-body cartes m-2";
        cardElement.innerHTML = `
        <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
        <h5 class="card-title fw-bold">Name: ${pokemon.name}</h5>
        <p class="card-text">- Génération: ${pokemon.apiGeneration}</p>
        <p class="card-text">- Type: ${types}</p>
        <a href="../pages/single.html?id=${pokemon.pokedexId}" class="btn btn-primary">Voir plus</a>
        <button class="btn btn-danger mt-2 w-100" data-pokemon-id="${pokemon.pokedexId}" onclick="supprimerDeLequipe(event)">
          <i class="bi bi-star-fill"></i> Retirer
        </button>
      `;

        document.querySelector("main").appendChild(cardElement);
      })
      .catch(err => console.log("Erreur API:", err));
}

function supprimerDeLequipe(e) {
  const id = String(e.currentTarget.dataset.pokemonId);
  let favorisArray = JSON.parse(localStorage.getItem("favoris")) || [];
  favorisArray = favorisArray.filter(fav => fav !== id);
  localStorage.setItem("favoris", JSON.stringify(favorisArray));
  e.currentTarget.closest(".card-body").remove();
}