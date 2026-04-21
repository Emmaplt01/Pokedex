const urlParams = new URLSearchParams(window.location.search)

const id= urlParams.get("id")
console.log("ID récupéré depuis l’URL :", id);


baseUrlSingle = "https://pokebuildapi.fr/api/v1/pokemon"


fetch(baseUrlSingle + "/" + id)
  .then(res => res.json())
  .then(pokemon => {
    console.log(pokemon);
    const types = pokemon.apiTypes
      .map(t => `${t.name} <img src="${t.image}"  style="width:25px;vertical-align:middle;">`)
      .join(" ");

    let cardElement = `
      <div class="card mb-3 cartes" style="width:80rem">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${pokemon.image}" class="img-fluid rounded-start" alt="${pokemon.name}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold" style="font-size: 4rem">${pokemon.name}</h5>
        <p class="card-text fs-4"><span class="fw-bold">- Type:</span> ${types}</p>
        <p class="card-text fs-4 text-success"><span class="fw-bold">- PV: </span>${pokemon.stats.HP}</p>
        <p class="card-text fs-4 text-danger"><span class="fw-bold">- Attaque: </span>${pokemon.stats.attack}</p>
        <p class="card-text fs-4"><span class="fw-bold">- Defense: </span>${pokemon.stats.defense}</p>
        <p class="card-text fs-4"><span class="fw-bold">- Attaque spéciale: </span>${pokemon.stats.special_attack}</p>
        <p class="card-text fs-4"><span class="fw-bold">- Defense spécial: </span>${pokemon.stats.special_defense}</p>
        <p class="card-text fs-4"><span class="fw-bold">- Vitesse: </span>${pokemon.stats.speed}</p>
        <p class="card-text fs-4"><span class="fw-bold">- Évolution : </span>${pokemon.apiEvolutions[0]?.name || "Aucune"}</p>
        <p class="card-text text-end" style="font-style: italic;"><small class="text-body-secondary">Génération: ${pokemon.apiGeneration}</small></p>
      </div>
    </div>
  </div>
</div>
    `;
    document.querySelector("main").innerHTML = cardElement;
  })

.catch(err => console.log(err))

