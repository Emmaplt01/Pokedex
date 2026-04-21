// Détecte si on est à la racine ou dans /pages/ pour construire le bon chemin
const isInPages = window.location.pathname.includes("/pages/");
const base = isInPages ? "../" : "./";

fetch(base + "components/header.html")
    .then(res => res.text())
    .then(data => {
        document.querySelector("header").innerHTML = data;
    });

fetch(base + "components/footer.html")
    .then(res => res.text())
    .then(data => {
        document.querySelector("footer").innerHTML = data;
    });