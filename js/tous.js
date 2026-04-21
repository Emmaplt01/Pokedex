const baseUrl = "https://pokebuildapi.fr/api/v1/pokemon";
const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
let allPokemon = [];

function fetchPokemon(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allPokemon = data;

            console.log(data);

            for (pokemon of data){
                const isFavori = favoris.includes(String(pokemon.pokedexId));
                const iconClass = isFavori ? "bi-star-fill" : "bi-star";
                const types = pokemon.apiTypes.map(type => type.name).join(", ");

                let cardElement = `
                <div class="card-body cartes">
                    <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
                    <h5 class="card-title fw-bold">Name: ${pokemon.name}</h5>
                    <p class="card-text">-Génération: ${pokemon.apiGeneration}</p>
                    <p class="card-text">-Type: ${types}</p>
                    <a href="../pages/single.html?id=${pokemon.pokedexId}" class="btn btn-primary">Voir plus</a>
                    <button class="btn btn-primary fav-btn" data-pokemon-id="${pokemon.pokedexId}" onclick="favori(event)">
  <i class="bi ${iconClass}"></i>
</button>


                </div>
            `;

                document.querySelector("main").innerHTML += cardElement;
            }


            document.getElementById("Normal").addEventListener("click", filtreTypes);
            document.getElementById("Combat").addEventListener("click", filtreTypes);
            document.getElementById("Vol").addEventListener("click", filtreTypes);
            document.getElementById("Poison").addEventListener("click", filtreTypes);
            document.getElementById("Sol").addEventListener("click", filtreTypes);
            document.getElementById("Roche").addEventListener("click", filtreTypes);
            document.getElementById("Insecte").addEventListener("click", filtreTypes);
            document.getElementById("Spectre").addEventListener("click", filtreTypes);
            document.getElementById("Acier").addEventListener("click", filtreTypes);
            document.getElementById("Feu").addEventListener("click", filtreTypes);
            document.getElementById("Eau").addEventListener("click", filtreTypes);
            document.getElementById("Plante").addEventListener("click", filtreTypes);
            document.getElementById("Électrik").addEventListener("click", filtreTypes);
            document.getElementById("Psy").addEventListener("click", filtreTypes);
            document.getElementById("Glace").addEventListener("click", filtreTypes);
            document.getElementById("Dragon").addEventListener("click", filtreTypes);
            document.getElementById("Ténèbres").addEventListener("click", filtreTypes);
            document.getElementById("Fée").addEventListener("click", filtreTypes);

            document.getElementById("1").addEventListener("click", filtreGene);
            document.getElementById("2").addEventListener("click", filtreGene);
            document.getElementById("3").addEventListener("click", filtreGene);
            document.getElementById("4").addEventListener("click", filtreGene);
            document.getElementById("5").addEventListener("click", filtreGene);
            document.getElementById("6").addEventListener("click", filtreGene);
            document.getElementById("7").addEventListener("click", filtreGene);
            document.getElementById("8").addEventListener("click", filtreGene);



            function filtreTypes(e){
                console.log(e.target.id);
                document.querySelector("main").innerHTML = "";
                for(let pokemon of data){
                    const types = pokemon.apiTypes.map(type => type.name);
                    if(types.includes(e.target.id)){
                        const typeText = types.join(", ");
                        let cardElement = `
                <div class="card-body cartes">
                    <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
                    <h5 class="card-title fw-bold">Name: ${pokemon.name}</h5>
                    <p class="card-text">- Génération: ${pokemon.apiGeneration}</p>
                    <p class="card-text">- Type: ${typeText}</p>
                    <a href="../pages/single.html?id=${pokemon.pokedexId}" class="btn btn-primary">Voir plus</a>
                </div>
            `;
                        document.querySelector("main").innerHTML += cardElement;
                    }
                }
            }

            function filtreGene(e){
                console.log(e.target.id);
                document.querySelector("main").innerHTML = "";
                for(let pokemon of data){
                    const types = pokemon.apiTypes.map(type => type.name);
                    if(pokemon.apiGeneration==e.target.id){
                        const typeText = types.join(", ");
                        let cardElement = `
                <div class="card-body cartes">
                    <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
                    <h5 class="card-title fw-bold">Name: ${pokemon.name}</h5>
                    <p class="card-text">- Génération: ${pokemon.apiGeneration}</p>
                    <p class="card-text">- Type: ${typeText}</p>
                    <a href="../pages/single.html?id=${pokemon.pokedexId}" class="btn btn-primary">Voir plus</a>
                </div>
            `;
                        document.querySelector("main").innerHTML += cardElement;
                    }
                }
            }
        })
        .catch(err => console.log(err));
}

function favori(e) {
    const id = e.currentTarget.dataset.pokemonId;
    let favorisArray = JSON.parse(localStorage.getItem("favoris")) || [];
    const icon = e.currentTarget.querySelector("i");

    if (favorisArray.includes(id)) {
        favorisArray = favorisArray.filter(fav => fav !== id);
        icon.classList.remove("bi-star-fill");
        icon.classList.add("bi-star");
    } else {
        favorisArray.push(id);
        icon.classList.remove("bi-star");
        icon.classList.add("bi-star-fill");
    }

    localStorage.setItem("favoris", JSON.stringify(favorisArray));
}

document.getElementById("bouton_recherche").addEventListener("click", recherche);

function recherche() {
    const query = document.getElementById("recherche").value.toLowerCase();
    document.querySelector("main").innerHTML = "";

    for (let pokemon of allPokemon) {
        if (pokemon.name.toLowerCase().includes(query)) {
            const types = pokemon.apiTypes.map(type => type.name).join(", ");
            const isFavori = favoris.includes(String(pokemon.pokedexId));
            const iconClass = isFavori ? "bi-star-fill" : "bi-star";

            let cardElement = `
  <div class="card m-2 carte-recherche">
    <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
    <div class="card-body">
      <h5 class="card-title fw-bold">Name: ${pokemon.name}</h5>
      <p class="card-text">- Génération: ${pokemon.apiGeneration}</p>
      <p class="card-text">- Type: ${types}</p>
      <a href="../pages/single.html?id=${pokemon.pokedexId}" class="btn btn-primary">Voir plus</a>
      <button class="btn btn-primary fav-btn" data-pokemon-id="${pokemon.pokedexId}" onclick="favori(event)">
        <i class="bi ${iconClass}"></i>
      </button>
    </div>
  </div>
`;

            document.querySelector("main").innerHTML += cardElement;
        }
    }
}
fetchPokemon(baseUrl);