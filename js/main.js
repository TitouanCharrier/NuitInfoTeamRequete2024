<<<<<<< HEAD
import Gametcha from "./gametcha.js";
import GameWindow from "./GameWindow.js";
let gametcha = new Gametcha((res) => { console.log(res); });
gametcha.show();
let game = new GameWindow(gametcha);
/*
let bh = new BulletHell(gametcha);
bh.start();*/ 
=======
"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let head = document.getElementsByClassName("head")[0];
    let cheast = document.getElementsByClassName("cheast")[0];
    let stomach = document.getElementsByClassName("stomach")[0];
    let legs = document.getElementsByClassName("legs")[0];
    let body = document.getElementsByClassName('human-body')[0];
    const popup = document.getElementById("popup");
    const popupBody = document.getElementById("popupBody");
    head.addEventListener("mouseover", () => {
        popupBody.innerHTML = `
        <ul>
          <li>
            Le cerveau, le maître de notre corps permettant de mettre en œuvre
            tout les autres organes du corps, si le cerveau possède un
            dysfonctionnement alors tout le reste du corps en subit les
            conséquences.
          </li>
          <li>
            Ainsi nous pouvons en faire un parallèle avec le climat terrestre,
            le climat restant le même, alors les systèmes des océans peuvent
            fonctionner correctement, mais depuis quelques années avec le
            changement climatique, des modifications ont été perçu dans l’océan,
            comme l’augmentation du volume, le changement du taux d’acidité, la
            température de l’eau… réduisant la biodiversité, et augmentant le
            réchauffement climatique.
          </li>
        </ul>
      `;
        body.style.display = "none";
        popup.classList.add("active");
    });
    cheast.addEventListener("mouseover", () => {
        popupBody.innerHTML = `
        <ul>
          <li>
            Le cœur est un organe musculaire situé dans la cage thoracique.Le
            cœur fonctionne comme une pompe qui, grâce à ses contractions
            régulières, propulse le sang dans tout l’organisme et assure ainsi
            l’alimentation en oxygène du corps entier. Il permet donc le bon
            fonctionnement du corps humain.
          </li>
          <li>
            Les courants marins régulent la chaleur des différents continents
            ainsi que l’humidité de l’air. La Terre n’étant pas ensoleillée de
            manière égale, les courants vont redistribuer les énergies solaires
            des zones chaudes aux zones froides.
          </li>
          <li>
            Avec une augmentation des températures, la redistribution de la
            chaleur est beaucoup plus compliqué. Cela provoque aussi une
            augmentation de son volume et rend plus compliqué la redistribution
            de la chaleur ce qui produits notamment de plus amples évènements
            extrêmes. Il est donc important d’essayer de les effets du
            changement climatique
          </li>
        </ul>
      `;
        body.style.display = "none";
        popup.classList.add("active");
    });
    stomach.addEventListener("mouseover", () => {
        popupBody.innerHTML = `
        <ul>
          <li>
            L’air inspiré par le nez ou la bouche circule vers les poumons à
            travers les voies respiratoires. Les poumons permettent de capter le
            dioxygène de l’air inspiré et d’effectuer des échanges avec le
            sang : l’oxygène contenu dans l’air inspiré traverse la paroi des
            alvéoles pour passer dans le sang. Le sang distribue ensuite
            l’oxygène à toutes les cellules de l’organisme. À l’inverse, le
            dioxyde de carbone rejeté par toutes les cellules de l’organisme,
            est extrait du sang au moment de l’expiration.
          </li>
          <li>
            Les phytoplancton permettent d’effectuer la transformation du CO2 en
            matière organique à l’aide de la photosynthèse. Ce processus est dit
            biologique. Le phytoplancton océanique vit dans la couche éclairée
            de l’océan et utilise l’énergie du soleil pour effectuer la
            photosynthèse. Une deuxième série de processus, physico-chimiques
            cette fois, contribue aussi à cette inégale répartition du carbone
            sur la verticale. Le refroidissement des eaux de surface aux hautes
            latitudes augmente leur capacité à dissoudre du CO2 atmosphérique
            (principalement en augmentant la solubilité du gaz) tout en
            augmentant leur densité. Ces eaux plongent alors en profondeur,
            emportant avec elles le CO2 qui sera soustrait à tout contact avec
            l’atmosphère, contribuant ainsi au gradient vertical de carbone
            océanique. On parle dans ce cas de pompe physique.
          </li>
          <li>
            Avec le changement climatique et une augmentation de la production
            du CO2 par l’humain, l’océan augmente considérablement son acidité
            et ainsi réduit sa capacité d’absorption du CO₂ et perturbent les
            écosystèmes marins. Ce déséquilibre pourrait entraîner une
            accélération du changement climatique en libérant davantage de CO₂
            dans l’atmosphère. Ainsi, préserver la santé des océans est
            primordial pour maintenir leur rôle crucial dans la régulation du
            climat global
          </li>
        </ul>
      `;
        body.style.display = "none";
        popup.classList.add("active");
    });
    legs.addEventListener("mouseover", () => {
        popupBody.innerHTML = `
        <ul>
          <li>
            Le microbiote intestinal regroupe des milliers de milliards de
            micro-organismes vivant principalement dans les intestins, en
            symbiose avec l'organisme, c'est-à-dire en association bénéfique à
            chacun. Et l’intestin nous apportant une fonction vitale. Il y en a
            autant que de cellules constituant notre corps.
          </li>
          <li>
            Les récifs coralliens recouvrent une faible surface des océans,
            entre 0,08 et 0,16 %, mais abritent environ un tiers de toutes les
            espèces marines connues à ce jour. Ce succès écologique est dû à une
            symbiose entre le corail et des microalgues intracellulaires
            communément appelées zooxanthelles. « Organismes ingénieurs », ils
            sont à l’origine des plus vastes bioconstructions de notre planète.
            Les récifs coralliens permettent une protection des côtes contre
            l’érosion.
          </li>
          <li>
            Leur croissance est dépendante de nombreux facteurs (lumière,
            température, pH, nutriments, turbidité..) Ils sont donc extrêmement
            sensibles aux changements actuels de notre environnement :
            réchauffement des eaux, acidification des océans, qui s’ajoutent aux
            perturbations locales (pollution, sédimentation, aménagement des
            côtes, surpêche, trafic maritime…). Cela engendrerait la destruction
            de cette symbiose et une disparition de un tiers de toutes les
            espèces marines connues à ce jour, et entraînerai une fragilisation
            des cotes terrestres.
          </li>
        </ul>
      `;
        body.style.display = "none";
        popup.classList.add("active");
    });
    const closePopupButton = document.getElementById("closePopup");
    closePopupButton.addEventListener("click", () => {
        popup.classList.remove("active");
        body.style.display = 'block';
    });
});
>>>>>>> main
