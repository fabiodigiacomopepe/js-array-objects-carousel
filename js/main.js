/*  Consegna:
Dato un array di oggetti letterali con:
- url dell’immagine
- titolo
- descrizione
Creare un carosello come nella foto allegata.

Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l’immagine grande in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell’utente sulle frecce verso sopra e sotto, l’immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

Milestone 2:
Aggiungere il **ciclo infinito** del carosello.
Ovvero se l’immagine attiva è la prima e l’utente clicca la freccia verso sopra, l’immagine che deve attivarsi sarà l’ultima e viceversa per l’ultima miniatura se l’utente clicca la freccia verso sotto.

BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/


const images = [
    {
        image: 'img/01.webp',
        title: "Marvel's Spiderman Miles Morale",
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
    }
];

images.forEach((card) => {
    document.querySelector('.items-container').innerHTML +=
    `<div class="item">
        <img src="${card.image}" alt="${card.image}">
        <div class="title-container">
            <div class="title">
                ${card.title}
            </div>
            <div class="subtitle">
                ${card.text}
            </div>
        </div>   
    </div>`;

    document.querySelector('.slider-laterale').innerHTML +=
    `<div class="card">
        <div class="layer"></div>
        <img class="img-card" src="${card.image}" alt="${card.image}">
    </div>`;
});


let primoItem = document.querySelector('.item');
primoItem.classList.add("active");

let primoLayer = document.querySelector('.layer');
primoLayer.classList.add("hidden");

// Collego costante ITEMS a elenco ITEM
const items = document.querySelectorAll('.item');

// Collego costante LAYERS a elenco LAYER
const layers = document.querySelectorAll('.layer');

// Setto item ATTIVO al momento
let itemAttivo = 0;

// Seleziono pulsante NEXT
const next = document.querySelector(".next");

// Seleziono pulsante PREVIOUS
const previous = document.querySelector(".previous");

// Collego funzione ad EVENTO su NEXT
next.addEventListener("click", miaFunzione);

function miaFunzione() {
    items[itemAttivo].classList.remove("active");   // Rimuovo classe ACTIVE all'ITEM attualmente attivo

    layers[itemAttivo].classList.remove("hidden");  // Rimuovo classe HIDDEN al LAYER attualmente attivo

    if (itemAttivo === (items.length - 1)) {        // SE mi trovo nell'ULTIMA foto
        itemAttivo = -1;                            // Setto valore ITEM ATTIVO a -1 (così incrementato diventa 0)
    }
    itemAttivo = itemAttivo + 1;                    // Incremento valore dell' ITEM ATTIVO
    items[itemAttivo].classList.add("active");      // Assegno classe ACTIVE all'elemento (attualmente) successivo

    layers[itemAttivo].classList.add("hidden");     // Assegno classe HIDDEN all'elemento (attualmente) successivo
}

// Collego funzione ad EVENTO su PREVIOUS
previous.addEventListener("click", miaFunzione1);

function miaFunzione1() {
    items[itemAttivo].classList.remove("active");   // Rimuovo classe ACTIVE all'ITEM attualmente attivo

    layers[itemAttivo].classList.remove("hidden");  // Rimuovo classe HIDDEN al LAYER attualmente attivo

    if (itemAttivo === 0) {                         // SE mi trovo nella PRIMA foto
        itemAttivo = items.length;                  // Setto valore a ITEMS.LENGTH (5) (così decrementato diventa 4, cioè ultima foto)
    }
    itemAttivo = itemAttivo - 1;                    // Decremento valore dell' ITEM ATTIVO
    items[itemAttivo].classList.add("active");      // Assegno classe ACTIVE all'elemento (attualmente) successivo

    layers[itemAttivo].classList.add("hidden");     // Assegno classe HIDDEN all'elemento (attualmente) successivo
}