let intro = document.getElementById('intro');
let quote = document.getElementById('quote');
let author = document.getElementById('author');

function generator() {
    fetch("https://api.breakingbadquotes.xyz/v1/quotes")
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    quote.innerHTML = data[0].quote;
                    author.innerHTML = data[0].author;
                    oneTimeFavorite = 0; // sécurité pour n'afficher qu'une seule fois
                    oneTimeaffFavorite = 0; // sécurité pour n'afficher qu'une seule fois
                })
            } else {
                intro.innerHTML = "L'URL de l'API est inexistante.";
                quote.innerHTML = "T'as encore tout cassé...";
            }
        })
}



//compteur pour incrémentation du localStorage 
// && compteur si l'user n'a cliqué que sur Favori à son entrée sur le site
// partagé en 2 car 2storage
let cpt = localStorage.length / 2;

let oneTimeFavorite = 0;
// fonction d'ajout au localStorage/favori par un bouton 
function favorite() {
    if (oneTimeFavorite == 0) { // sécurité pour n'afficher qu'une seule fois
        //envoie dans le localStorage
        
        localStorage.setItem('quote' + cpt, quote.innerHTML);
        localStorage.setItem('author' + cpt, author.innerHTML);
        //incrémentation
        cpt++;
        oneTimeFavorite++;
    }
}


let oneTimeaffFavorite = 0;
let Contener = document.getElementById("droite");

function affFavorite() { // affiche et supprime les favorites en fonction des ajoutes
    myRemoveChild();
    if (localStorage.length > 0) { // sécurité pour n'afficher qu'une seule fois
        for (i = cpt; i >= 0; i--) {
            // initialisation des variables de capture du localStorage
            let quoteLS = localStorage.getItem('quote' + i);
            let authorLS = localStorage.getItem('author' + i);

            // création d'un paragraphe pour afficher la quote
            let addPQuote = document.createElement('p');
            addPQuote.class = "quote";
            addPQuote.id = "quote" + i;
            addPQuote.textContent = quoteLS;

            // création d'un paragraphe pour afficher l'auteur
            let addPAuthor = document.createElement('p');
            addPAuthor.class = "author";
            addPAuthor.id = "author" + i;
            addPAuthor.textContent = authorLS;

            //affichage des quotes et auteurs
            Contener.appendChild(addPQuote);
            Contener.appendChild(addPAuthor);
            oneTimeaffFavorite++;
        }
    } else{
        //gestion d'erreur aucun favori
        let noFavorite = document.createElement('p');
        noFavorite.class = "quote";
        noFavorite.textContent = "Tu n'as pas de favori";
        document.getElementById("droite").appendChild(noFavorite);
    }
}

// supprime le local storage
function supFavorite() {
    myRemoveChild();
    localStorage.clear();
    cpt = localStorage.length;
}

//supprime le contenu de section (id=droite)
function myRemoveChild() {
    while (Contener.firstChild) {
       Contener.removeChild(Contener.firstChild);
    }
}
