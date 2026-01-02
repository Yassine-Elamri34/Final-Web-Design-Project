var icons = [
    "js.png","js.png",
    "php.png","php.png",
    "github.png","github.png",
    "csharp.png","csharp.png",
    "html.png","html.png",
    "css.png","css.png",
    "sql.png","sql.png",
    "asp.png","asp.png"
];


icons.sort(() => Math.random() - 0.5);

var game = document.getElementById("game");
var stopBtn = document.getElementById("stopBtn");
var fireworkInterval = null;


for (var i = 0; i < icons.length; i++) {
    var card = document.createElement("div");
    card.className = "card";
    card.dataset.icon = icons[i];

    card.innerHTML =
        '<div class="front"></div>' +
        '<div class="back"><img src="image/' + icons[i] + '" alt=""></div>';

    card.onclick = flipCard;
    game.appendChild(card);
}


setTimeout(() => {
    document.getElementById("welcome").style.display = "none";
}, 3000);


var firstCard = null;
var secondCard = null;
var lockBoard = false;
var matches = 0;
var totalMatches = icons.length / 2;

function flipCard() {
    if (lockBoard) return;
    if (this.classList.contains("flipped")) return;

    this.classList.add("flipped");

    if (firstCard === null) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        setTimeout(checkMatch, 700);
    }
}

function checkMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {

        firstCard.classList.add("matchGlow");
        secondCard.classList.add("matchGlow");

        firstCard.onclick = null;
        secondCard.onclick = null;

        matches++;
        document.getElementById("score").innerHTML = "Matches: " + matches;

        if (matches === totalMatches) startFireworks();

    } else {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


function randomColor() {
    var c = ["red","yellow","cyan","magenta","orange","purple",
             "white","#ff00ff","#00ffff","#ff1493"];
    return c[Math.floor(Math.random() * c.length)];
}

function createExplosion(x, y) {
    var fw = document.getElementById("fireworks");

    for (var i = 0; i < 30; i++) {
        var p = document.createElement("div");
        p.className = "particle";

        p.style.background = randomColor();
        p.style.setProperty("--x", (Math.random() - 0.5) * 700 + "px");
        p.style.setProperty("--y", (Math.random() - 0.5) * 700 + "px");

        p.style.left = x + "px";
        p.style.top = y + "px";

        fw.appendChild(p);

        setTimeout(() => p.remove(), 1200);
    }
}

function startFireworks() {
    stopBtn.style.display = "block";

    fireworkInterval = setInterval(() => {
        for (var i = 0; i < 25; i++) {
            var x = Math.random() * window.innerWidth;
            var y = Math.random() * window.innerHeight;
            createExplosion(x, y);
        }
    }, 350);
}

// STOP BUTTON → reload page
stopBtn.onclick = function () {
    clearInterval(fireworkInterval);
    window.location.reload();
};
