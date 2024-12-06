let score = 0;  // Points gagnés
let lostPoints = 0;  // Points perdus
let positiveBots = 0;
let negativeBots = 0;
let isInverted = false;  // Variable pour savoir si la logique de scroll est inversée
let botPrice = 50;  // Le prix initial du bot
let multiplier = 1;  // Multiplicateur de points
let upgradePrice = 50;  // Prix de l'augmentation
let currentLevel = 1;  // Niveau actuel des augmentations

// Sélecteurs HTML
const scoreDisplay = document.getElementById('score');
const lostPointsDisplay = document.getElementById('lost-points');
const positiveBotsDisplay = document.getElementById('positive-bots');
const negativeBotsDisplay = document.getElementById('negative-bots');
const popup = document.getElementById('popup');
const buyBotButton = document.getElementById('buy-bot');
const cancelBotButton = document.getElementById('cancel-bot');
const resetButton = document.getElementById('reset-button');
const botPriceDisplay = document.getElementById('bot-price');
const upgradeBox = document.getElementById('upgrade-box');
const upgradePriceDisplay = document.getElementById('upgrade-price');
const multiplierDisplay = document.getElementById('multiplier');
const currentLevelDisplay = document.getElementById('current-level');
const buyUpgradeButton = document.getElementById('buy-upgrade');

// Fonction pour mettre à jour le score
function updateScore(points) {
  if (points > 0) {
    score += points;  // Ajouter des points gagnés
    scoreDisplay.textContent = score;
    // Si le score atteint 1000 points, faire trembler l'écran
    if (score >= 500 && !document.body.classList.contains('shake')) {
        shakeScreen();
    }
  
      // Si le score atteint 10000 points, commencer l'inversion aléatoire
    if (score >= 1000) {
        if (!isInverted) {
          isInverted = true;
          invertScreen();
        }
    }
  } else {
    lostPoints -= points;  // Ajouter des points perdus (points est négatif)
    lostPointsDisplay.textContent = lostPoints;
  }
}

// Fonction pour réinitialiser le score
function resetScore() {
  score = 0;
  lostPoints = 0;  // Réinitialiser les points perdus
  positiveBots = 0;
  negativeBots = 0;
  botPrice = 50;  // Réinitialiser le prix du bot à sa valeur initiale
  positiveBotsDisplay.textContent = positiveBots;
  negativeBotsDisplay.textContent = negativeBots;
  scoreDisplay.textContent = score;
  lostPointsDisplay.textContent = lostPoints;  // Afficher les points perdus réinitialisés
  botPriceDisplay.textContent = botPrice; // Afficher le prix du bot dans la popup
  multiplier = 1;  // Réinitialiser le multiplicateur
  upgradePrice = 50;  // Réinitialiser le prix de l'upgrade
  upgradePriceDisplay.textContent = Math.round(upgradePrice); // Mettre à jour le prix de l'upgrade
  multiplierDisplay.textContent = multiplier + "x"; // Mettre à jour le multiplicateur
  currentLevel = 1; // Réinitialiser le niveau
  currentLevelDisplay.textContent = currentLevel; // Mettre à jour le niveau
  document.body.style.backgroundColor = "#f0f8ff"; // Réinitialiser la couleur de fond
  document.body.style.transform = ''; // Réinitialiser l'inversion de l'écran
  isInverted = false; // Réinitialiser la logique d'inversion
  document.body.classList.remove('shake'); // Enlever l'effet de tremblement
}

// Capturer l'événement de la molette de la souris (wheel)
window.addEventListener('wheel', function(event) {
  if (isInverted) {
    if (event.deltaY > 0) {
      updateScore(1*multiplier); // Gagner 1 point (scroll vers le bas)
    } else {
      updateScore(-1*multiplier); // Perdre 1 point (scroll vers le haut)
    }
  } else {
    if (event.deltaY > 0) {
      updateScore(-1*multiplier); // Perdre 1 point (scroll vers le bas)
    } else {
      updateScore(1*multiplier); // Gagner 1 point (scroll vers le haut)
    }
  }
  event.preventDefault();
});

// Fonction pour faire trembler l'écran
function shakeScreen() {
    document.body.classList.add('shake');
    setTimeout(() => {
      document.body.classList.remove('shake');
    }, 1000);  // Tremble pendant 1 seconde
}

// Fonction pour inverser l'écran de manière aléatoire
function invertScreen() {
    const direction = Math.random() < 0.5 ? 'vertical' : 'horizontal'; // Choisir aléatoirement l'axe
  
    // Appliquer l'inversion
    if (direction === 'vertical') {
      document.body.style.transform = `scaleY(-1)`;  // Inverser verticalement
    } else {
      document.body.style.transform = `scaleX(-1)`;  // Inverser horizontalement
    }
}

function getRandomInterval() {
    return Math.floor(Math.random() * 1000);  // Intervalle entre 10 000 ms (10s) et 20 000 ms (20s)
}

// Fonction pour afficher la popup d'achat de bot
function showPopup() {
  if (score >= botPrice) {
    botPriceDisplay.textContent = botPrice; // Mettre à jour le prix dans la popup avant de l'afficher
    popup.style.display = "flex"; // Afficher la popup
  }
}

document.getElementById('clickable-image').addEventListener('click', function () {
  alert("Non, ça ne fait rien ça !");
});


// Fonction pour acheter un bot
function buyBot() {
  if (score >= botPrice) {
    score -= botPrice;  // Retirer le prix du bot pour l'achat
    scoreDisplay.textContent = score;

    // Choisir aléatoirement si le bot est positif ou négatif
    const botType = Math.random() < 0.5 ? "positive" : "negative";

    if (botType === "positive") {
      positiveBots++;
      positiveBotsDisplay.textContent = positiveBots;
      updateScore(5);  // Gagner 5 points immédiatement
    } else {
      negativeBots++;
      negativeBotsDisplay.textContent = negativeBots;
      updateScore(-5);  // Perdre 5 points immédiatement
    }

    // Double le prix du bot pour la prochaine offre
    botPrice *= 2;
    botPriceDisplay.textContent = botPrice; // Mettre à jour l'affichage du prix du bot
  }
  popup.style.display = "none";  // Fermer la popup après l'achat
}

// Annuler l'achat du bot
function cancelBot() {
  popup.style.display = "none";  // Fermer la popup sans acheter de bot
}

// Fonction qui inverse la logique de scroll (gain/perte de points)
function invertPointsLogic() {
  isInverted = !isInverted;  // Inverse l'état de l'inversion
}

// Fonction pour changer l'écran en rouge pendant 2 secondes
function makeScreenRed() {
  document.body.style.backgroundColor = "red";  // Change le fond en rouge
  setTimeout(() => {
    document.body.style.backgroundColor = "#f0f8ff";  // Réinitialise la couleur du fond
  }, 2000);  // Après 2 secondes, réinitialise la couleur
}

// Fonction qui exécute l'inversion des points et le changement de couleur toutes les 15 secondes
function triggerRedEffect() {
  makeScreenRed();
  invertPointsLogic();  // Inverse la logique de scroll
}

// Réinitialiser le score quand le bouton est cliqué
resetButton.addEventListener('click', resetScore);

// Ajouter un intervalle pour afficher la popup chaque minute
setInterval(showPopup, 20000); // 60000 ms = 1 minute

// Ajouter des événements aux boutons de la popup
buyBotButton.addEventListener('click', buyBot);
cancelBotButton.addEventListener('click', cancelBot);

// Activer l'effet du fond rouge et l'inversion des points toutes les 15 secondes
setInterval(triggerRedEffect, 10000); // 15000 ms = 15 secondes

// Fonction pour gérer les bots toutes les secondes
function manageBots() {
  // Pour chaque bot positif, on ajoute 5 points
  for (let i = 0; i < positiveBots; i++) {
    updateScore(5);
  }
  // Pour chaque bot négatif, on enlève 5 points
  for (let i = 0; i < negativeBots; i++) {
    updateScore(-5);
  }
}

// Appel de la fonction manageBots chaque seconde
setInterval(manageBots, 1000); // 1000 ms = 1 seconde

// Fonction pour acheter une augmentation
function buyUpgrade() {
  if (score >= upgradePrice) {
    score -= upgradePrice;  // Déduire le prix de l'upgrade
    scoreDisplay.textContent = score;

    // Logique pour appliquer l'augmentation ou diminution du multiplicateur
    const chance = Math.random();
    if (chance < 0.7) {
      multiplier += 0.5;  // Augmenter le multiplicateur
    } else {
      multiplier -= 0.5;  // Diminuer le multiplicateur
    }

    // Vérifier que le multiplicateur ne tombe pas sous 1
    if (multiplier < 1) multiplier = 1;

    // Mettre à jour les affichages
    multiplierDisplay.textContent = multiplier + "x";
    currentLevel++;
    currentLevelDisplay.textContent = currentLevel;
    upgradePrice *= 1.5;  // Augmenter le prix pour la prochaine augmentation
    upgradePriceDisplay.textContent = Math.round(upgradePrice);
  }
}

// Ajouter un événement pour acheter l'augmentation
buyUpgradeButton.addEventListener('click', buyUpgrade);

