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

// Creo array di oggetti contenente per ogni oggetto: percorso foto (image), titolo (title) e sottotitolo (text)
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

// Creo ciclo forEach che andrà a popolare attraverso inner HTML (template literal) l'html
images.forEach((card) => {
    /* PER RIQUADRO PRINCIPALE */
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

    /* PER RIQUADRO LATERALE */
    document.querySelector('.slider-laterale').innerHTML +=
    `<div class="card">
        <div class="layer"></div>
        <img class="img-card" src="${card.image}" alt="${card.image}">
    </div>`;
});

// Setto ATTIVO di base il primo elemento (riquadro principale)
let primoItem = document.querySelector('.item');
primoItem.classList.add("active");

// Setto ATTIVO di base il primo elemento (riquadro laterale)
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

// Dichiaro variabile globale REVERSE
let reverse;

// Collego funziona al click dei pulsanti NEXT e PREVIOUS
next.addEventListener("click", function() {changePhoto((items.length -1), -1, +1, false)});
previous.addEventListener("click", function() {changePhoto(0, items.length, -1, true)});

function changePhoto(A, B, C, D) {
    reverse = D;                                    // Reverse diventa FALSE/TRUE
    items[itemAttivo].classList.remove("active");   // Rimuovo classe ACTIVE all'ITEM attualmente attivo
    layers[itemAttivo].classList.remove("hidden");  // Rimuovo classe HIDDEN al LAYER attualmente attivo
    if (itemAttivo === A) {                         // SE mi trovo nell'ULTIMA/PRIMA foto
        itemAttivo = B;                             // Setto valore ITEM ATTIVO a -1 (così incrementato diventa 0)/a ITEMS.LENGTH (5) (così decrementato diventa 4, cioè ultima foto)
    }
    itemAttivo = itemAttivo + C;                    // Incremento/Decremento valore dell' ITEM ATTIVO
    items[itemAttivo].classList.add("active");      // Assegno classe ACTIVE all'elemento (attualmente) successivo
    layers[itemAttivo].classList.add("hidden");     // Assegno classe HIDDEN all'elemento (attualmente) successivo
}

// Setto i secondi
let secondi = 3 * 1000;

// Imposto intervallo ogni 3 secondo che dovrà far partire "nextFunction" (cambio foto automatico)
var clock = setInterval(function() {changePhoto((items.length -1), -1, +1, false)}, secondi);

// Setto funzione avanti (cambio foto IN AVANTI)
function avanti() {
    clock = setInterval(function() {changePhoto((items.length -1), -1, +1, false)}, secondi);
}

// Setto funzione indietro (cambio foto ALL'INDIETRO)
function indietro () {
    clock = setInterval(function() {changePhoto(0, items.length, -1, true)}, secondi);
}

// Collego pulsanti dall'HTML
const start = document.getElementById("start").addEventListener("click", startF);
const stop = document.getElementById("stop").addEventListener("click", stopF);
const inverti = document.getElementById("inverti").addEventListener("click", invertiF);

// Funzione collegata a pulsante START
function startF() {
    if (reverse == true) {                  // SE reverse = true
        indietro();                         // Procedi all'indietro
    } else {                                // Altrimenti
        avanti();                           // Procedi in avanti
    }
}

// Funzione collegata a pulsante STOP
function stopF() {
    clearInterval(clock);                   // Tolgo il contatore
}

// Funzione collegata a pulsante INVERTI
function invertiF() {
    clearInterval(clock);                   // Tolgo il contatore ATTUALE
    if (reverse == true) {                  // SE reverse = true
        avanti();                           // Procedi in avanti
    } else {                                // Altrimenti
        indietro();                         // Procedi all'indietro
    }
}