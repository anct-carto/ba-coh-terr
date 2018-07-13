//Variable selection
let selectionMonFacteur = document.querySelectorAll(".mon_facteur");
let selectionMonIndicateur = document.querySelectorAll(".mon_indicateur");
let selectionMonTexte = document.querySelectorAll(".mon_texte");
let selectionMonChoix = document.querySelectorAll(".mon_choix");
let selectionMonMotcle = document.querySelectorAll(".mon_motcle");



//Variable en mémoire
let memoireIndicateur = sessionStorage.getItem("memoireIndicateur");
console.log("sessionStorage memoireIndicateur : "+memoireIndicateur);
let memoireNiv3 = sessionStorage.getItem("memoireNiv3");
console.log("sessionStorage memoireNiv3 : "+memoireNiv3);
let mapIndicateur = sessionStorage.getItem("mapIndicateur");
console.log("sessionStorage mapIndicateur : "+mapIndicateur);

//Test diap 1_1
//---------------------------------
//memoireIndicateur = "niv3_1_1"
//memoireNiv3 = "0"
//---------------------------------



//Si variable mémoire inexistante
memoireIndicateur === null ? window.location = "index.html":true
//Suppression variable en mémoire
sessionStorage.removeItem("memoireNiv3");
sessionStorage.removeItem("memoireIndicateur");


/*
########..####....###....########...#######..
##.....##..##....##.##...##.....##.##.....##.
##.....##..##...##...##..##.....##.##.....##.
##.....##..##..##.....##.########..##.....##.
##.....##..##..#########.##........##.....##.
##.....##..##..##.....##.##........##.....##.
########..####.##.....##.##.........#######..
*/

/*Initialisation de l'index*/
let diapoIndex = 1;
montrerDiapo(diapoIndex);

/*Fonction permettant de passer à la diapositive suivante*/
var suivanteDiapo = (n) => {
  montrerDiapo(diapoIndex += n);
}

/*Fonction permettant de montrer la diapositive courrante*/
var courranteDiapo = (n) => {
  montrerDiapo(diapoIndex = n);
}

function montrerDiapo(n) {
  let i;
  let maDiapo = document.getElementsByClassName("ma_diapo");
  let pointDiapo = document.getElementsByClassName("point_diapo");
  n > maDiapo.length ? diapoIndex = 1: stop=true;
  n < 1 ? diapoIndex = maDiapo.length: stop=true;
  for (i = 0; i < maDiapo.length; i++) {
      maDiapo[i].style.display = "none";
  }
  for (i = 0; i < pointDiapo.length; i++) {
      pointDiapo[i].className = pointDiapo[i].className.replace(" active", "");
  }
  maDiapo[diapoIndex-1].style.display = "flex";
  pointDiapo[diapoIndex-1].className += " active";
}

/*
//Supprimer navigation diapo précédente si 1ere diapo
if("IntersectionObserver" in window) {

let ioDiapoPremiere = new IntersectionObserver(function(entries) {
  // Si intersectionRatio est égale à 0, l'élément cible est hors de vue
  if (entries[0].intersectionRatio <= 0) return document.getElementsByClassName("precedente_diapo")[0].style.display="block"
  //Sinon c'est que l'élement cible est en vue
  document.getElementsByClassName("precedente_diapo")[0].style.display="none"
});
// Commence l'observation
ioDiapoPremiere.observe(document.querySelector('#diapo1'));
} else{

}


*/

//Supprimer page diapo si pas de données ZAU



/*
########.....###....########.##.....##.
##.....##...##.##......##....##.....##.
##.....##..##...##.....##....##.....##.
########..##.....##....##....#########.
##........#########....##....##.....##.
##........##.....##....##....##.....##.
##........##.....##....##....##.....##.
*/

//Permet la requete sur le titre du facteur
let levelTitreFacteur = parseInt(memoireIndicateur.substr(5,1))-1;
let cheminMonFacteur = "data/txt/facteur.txt";
//Permet la requete sur le titre de l'indicateur
let levelTitreIndicateur = parseInt(memoireNiv3);
let cheminMonIndicateur = "data/txt/indicateur.txt"
//Permet la requete sur le texte de l'indicateur
let cheminMonTexte = `data/txt/texte_${memoireIndicateur.substring(5)}.txt`;
/*Spécifie le chemin des cartes et de l'histogramme*/
let cheminMaCarte = `data/csv/carte_${memoireIndicateur.substring(5)}.csv`;
let cheminMonHistogramme = `data/csv/histo_${memoireIndicateur.substring(5)}.csv`;
/*Spécifie le chemin des zau*/
let cheminMonZau = `data/csv/zau_${memoireIndicateur.substring(5)}.csv`;


/*Spécifie le chemin json des cartes*/
let cheminMaCarteJSON = "";
const cheminMaCarteJSONdep = "data/json/dep_wgs84_utf8.topojson";
const cheminMaCarteJSONepci2017 = "data/json/epci2017_wgs84_utf8.topojson";
const cheminMaCarteJSONepci2018 = "data/json/epci2018_wgs84_utf8.topojson";
const cheminMaCarteJSONze = "data/json/ze_wgs84_utf8.topojson";


//Permet la requete sur le mot clé de l'indicateur
let cheminMonMotcle = "data/txt/motcle.txt"





/*
########.##.....##.########.
...##.....##...##.....##....
...##......##.##......##....
...##.......###.......##....
...##......##.##......##....
...##.....##...##.....##....
...##....##.....##....##....
*/


//Style des blocs suivant le facteur de cohésion choisi



Array.from(selectionMonFacteur).forEach((el)=>{
  switch(levelTitreFacteur){
    case 0:
      el.style.color = colorTheme[0];
      break;
    case 1:
      el.style.color = colorTheme[1];
      break;
    case 2:
      el.style.color = colorTheme[2];
      break;
    case 3:
      el.style.color = colorTheme[3];
      break;
    case 4:
      el.style.color = colorTheme[4];
      break;
    case 5:
      el.style.color = colorTheme[5];
      break;
  };
});


Array.from(selectionMonMotcle).forEach((el)=>{
  switch(levelTitreFacteur){
    case 0:
      el.style.color = colorTheme[0];
      break;
    case 1:
      el.style.color = colorTheme[1];
      break;
    case 2:
      el.style.color = colorTheme[2];
      break;
    case 3:
      el.style.color = colorTheme[3];
      break;
    case 4:
      el.style.color = colorTheme[4];
      break;
    case 5:
      el.style.color = colorTheme[5];
      break;
  };
});



Array.from(selectionMonIndicateur).forEach((el)=>{
  switch(levelTitreFacteur){
    case 0:
      el.style.backgroundColor = colorTheme[0];
      break;
    case 1:
      el.style.backgroundColor = colorTheme[1];
      break;
    case 2:
      el.style.backgroundColor = colorTheme[2];
      break;
    case 3:
      el.style.backgroundColor = colorTheme[3];
      break;
    case 4:
      el.style.backgroundColor = colorTheme[4];
      break;
    case 5:
      el.style.backgroundColor = colorTheme[5];
      break;
  };
});



/*Requête extraction du titre du facteur */
fetch(cheminMonFacteur).then(function(reponse) {
  reponse.ok ? (
    reponse.text().then(function(monTitreFacteur){
      monTitreFacteur = monTitreFacteur.split('\n');
      //console.log(monTitreFacteur[0])
      for(let i=0;i<selectionMonFacteur.length;i++){
          selectionMonFacteur[i].innerHTML = monTitreFacteur[levelTitreFacteur];
      }
    })
  ):(
    console.log("Mauvaise réponse du réseau")
  )
})
.catch(function(error){
  console.log("Il y a eu un problème avec l\'opération fetch: " + error.message);
});


/*Requête extraction du mot clé */
fetch(cheminMonMotcle).then(function(reponse) {
  reponse.ok ? (
    reponse.text().then(function(monTitreMotcle){
      monTitreMotcle = monTitreMotcle.split('\n');
      for(let i=0;i<selectionMonMotcle.length;i++){
          selectionMonMotcle[i].innerHTML = monTitreMotcle[levelTitreIndicateur];
      }
    })
  ):(
    console.log("Mauvaise réponse du réseau")
  )
})
.catch(function(error){
  console.log("Il y a eu un problème avec l\'opération fetch: " + error.message);
});



/*Requête extraction du titre de l'indicateur */
fetch(cheminMonIndicateur).then(function(reponse) {
  reponse.ok ? (
    reponse.text().then(function(monTitreIndicateur){
      monTitreIndicateur = monTitreIndicateur.split('\n');
      //console.log(monTitreIndicateur[0])
      for(let i=0;i<selectionMonIndicateur.length;i++){
          selectionMonIndicateur[i].innerHTML = monTitreIndicateur[levelTitreIndicateur];
      }
    })
  ):(
    console.log("Mauvaise réponse du réseau")
  )
})
.catch(function(error){
  console.log("Il y a eu un problème avec l\'opération fetch: " + error.message);
});


/*Requête extraction du texte de l'indicateur */
fetch(cheminMonTexte).then(function(reponse) {
  reponse.ok ? (
    reponse.text().then(function(monCorpsDeTexte){
      monCorpsDeTexte = monCorpsDeTexte.split(/\n\s*\n/);
      Array.from(selectionMonTexte).forEach((el,i)=>{
        el.innerHTML = monCorpsDeTexte[i];
      });

      let fragment = document.createDocumentFragment();

      //diapo1 - 3 textes à gauche
      let monTexte0 = selectionMonTexte[0].innerHTML.split("\n");
      monTexte0.forEach((el,i)=>{
        let div = document.createElement("div");
        div.setAttribute("id","texte0"+i);
        div.setAttribute("class","texte");
        div.innerHTML = el;
        fragment.appendChild(div);
      });
      selectionMonTexte[0].innerHTML="";
      selectionMonTexte[0].appendChild(fragment);

      //diapo1 - 1 texte à droite
      let monTexte1 = selectionMonTexte[1];
      monTexte1.setAttribute("id","texte11");
      monTexte1.setAttribute("class","texte");

      //diapo2 - 2 textes à gauche
      let monTexte2 = selectionMonTexte[2].innerHTML.split("\n");
      monTexte2.forEach((el,i)=>{
        let div = document.createElement("div");
        div.setAttribute("id","texte2"+i);
        div.setAttribute("class","texte");
        div.innerHTML = el;
        fragment.appendChild(div);
      });
      selectionMonTexte[2].innerHTML="";
      selectionMonTexte[2].appendChild(fragment);

      //diapo3 - 2 textes à gauche
      let monTexte3 = selectionMonTexte[3].innerHTML.split("\n");
      monTexte3.forEach((el,i)=>{
        let div = document.createElement("div");
        div.setAttribute("id","texte3"+i);
        div.setAttribute("class","texte");
        div.innerHTML = el;
        fragment.appendChild(div);
      });
      selectionMonTexte[3].innerHTML="";
      selectionMonTexte[3].appendChild(fragment);


      //diapo4 - 2 textes à gauche
      let monTexte4 = selectionMonTexte[4].innerHTML.split("\n");
      monTexte4.forEach((el,i)=>{
        let div = document.createElement("div");
        div.setAttribute("id","texte4"+i);
        div.setAttribute("class","texte");
        div.innerHTML = el;
        fragment.appendChild(div);
      });
      selectionMonTexte[4].innerHTML="";
      selectionMonTexte[4].appendChild(fragment);

    })
  ):(
    console.log("Mauvaise réponse du réseau")
  )
})
.catch(function(error){
  console.log("Il y a eu un problème avec l\'opération fetch: " + error.message);
});

/*
##.....##.####.########.
##.....##..##.......##..
##.....##..##......##...
##.....##..##.....##....
.##...##...##....##.....
..##.##....##...##......
...###....####.########.
*/

/*Légende carte*/
let choixUnite = ["€","%","‰"];

let titreLegende = ["Médiane du revenu disponible par unité de consommation",
"Part des 15-24 ans, ni en emploi, ni en études, ni en formation",
"Part des personnes de 65 ans et plus",
"Part des demandeurs d'emploi de longue durée parmi les demandeurs d'emploi",
"Taux d'évolution annuel de la population due au solde migratoire apparent",
"Part des fonctions productives dans l'emploi",
"Part des locaux éligibles toutes technologies à un débit supérieur à 30 Mb/s",
"Nombre de bénévoles actifs dans les associations pour 100 habitants",
"Taux de participation au premier tour de l'élection présidentielle",
"Coefficient d'intégration fiscale moyen des EPCI",
"Part des retraites et des prestations sociales dans le revenu disponible"];

let sousTitreLegende = ["En euros, par zone d'emploi",
"En %, par intercommunalité",
"En %, par zone d'emploi",
"En %, par département",
"En ‰ par département"];


/*Légende graphique barometre*/

let valeurBarometre = [];

const valeurBarometre11 = ["17\u2009000","18\u2009000","19\u2009000","20\u2009000","21\u2009000","22\u2009000","23\u2009000"];
const valeurBarometre15 = ["10","15","20","25","30","35","40"];
const valeurBarometre21 = ["0","4","8","12","16","20","24"];
const valeurBarometre24 = ["21","28","35","42","49","56","63"];
const valeurBarometre31 = ["-1,2","-0,7","-0,2","0,3","0,8","1,3","1,8"];
const valeurBarometre44 = ["12","17","22","27","32","37","42"];
const valeurBarometre46 = ["7","20","33","46","59","72","85"];
const valeurBarometre51 = ["2","4","6","8","10","12","14"];
const valeurBarometre53 = ["30","40","50","60","70","80","90"];
const valeurBarometre61 = ["20","25","30","35","40","45","50"];
const valeurBarometre65 = ["22","25","28","31","34","37","40"];


let d0 = ""
let d1 = ""

const d0_11 = "M59.33,61.83,57.71,18l9.55,42.77a4,4,0,0,1-7.84,1.75A4.55,4.55,0,0,1,59.33,61.83Z"
const d1_11 = "M59.86,60.67,73.31,8.4,66.74,62a3.51,3.51,0,0,1-7-.85A2.23,2.23,0,0,1,59.86,60.67Z"
const d0_15 = "M61.43,64.86l-39-25.09,42.75,18A4,4,0,0,1,62,65.18,4.42,4.42,0,0,1,61.43,64.86Z"
const d1_15 = "M60.92,63.88,22.47,23.4,65.68,58.76a3.5,3.5,0,1,1-4.44,5.42A3.06,3.06,0,0,1,60.92,63.88Z"
const d0_21 = "M59.77,59.43,83.84,22.89l-17,40.32a4,4,0,0,1-7.4-3.13A5.07,5.07,0,0,1,59.77,59.43Z"
const d1_21 = "M60.93,58.74,103.44,24.4,65.67,63.9a3.51,3.51,0,0,1-5.07-4.85A3.19,3.19,0,0,1,60.93,58.74Z"
const d0_24 = "M59.32,61.75,58.66,18l8.61,43a4,4,0,1,1-7.87,1.57A3.53,3.53,0,0,1,59.32,61.75Z"
const d1_24 = "M59.85,60.74,72.25,8.21,66.75,61.9a3.51,3.51,0,0,1-7-.71C59.79,61,59.82,60.88,59.85,60.74Z"
const d0_31 = "M59.31,61.63l.6-43.76L67.28,61a4,4,0,1,1-7.91,1.35A4.49,4.49,0,0,1,59.31,61.63Z"
const d1_31 = "M59.9,62.17,50.09,8.71l16.6,51.76A3.51,3.51,0,0,1,60,62.61C60,62.47,59.93,62.31,59.9,62.17Z"
const d0_44 = "M60.55,58.41,95.36,31.07,66,64.23a4,4,0,1,1-6-5.32A4.14,4.14,0,0,1,60.55,58.41Z"
const d1_44 = "M60.75,58.92l39.9-37.14L65.84,63.72a3.5,3.5,0,1,1-5.39-4.48A3.06,3.06,0,0,1,60.75,58.92Z"
const d0_46 = "M59.31,61.61l.86-43.75L67.29,61a4,4,0,0,1-7.93,1.31A3.64,3.64,0,0,1,59.31,61.61Z"
const d1_46 = "M59.93,60.38,77.78,9.44,66.67,62.26a3.5,3.5,0,0,1-6.86-1.44A3.17,3.17,0,0,1,59.93,60.38Z"
const d0_51 = "M63.31,64.82,11,61.46l52.25-3.64a3.51,3.51,0,0,1,.49,7A3.69,3.69,0,0,1,63.31,64.82Z"
const d1_51 = "M59.87,60.61l14.42-52L66.73,62a3.51,3.51,0,1,1-7-1C59.8,60.91,59.84,60.74,59.87,60.61Z"
const d0_53 = "M61.52,57.73l42-16.29L65.07,64.91a4,4,0,0,1-4.19-6.86A6.36,6.36,0,0,1,61.52,57.73Z"
const d1_53 = "M61.45,58.35l48.47-26L65.14,64.29a3.51,3.51,0,0,1-4.07-5.71A3.85,3.85,0,0,1,61.45,58.35Z"
const d0_61 = "M59.3,61.11,65.56,17.8l1.73,43.73a4,4,0,0,1-8,.32A4.47,4.47,0,0,1,59.3,61.11Z"
const d1_61 = "M59.82,61,68.53,7.7l-1.75,54a3.51,3.51,0,1,1-7-.23A3.44,3.44,0,0,1,59.82,61Z"
const d0_65 = "M59.3,61.08l6.57-43.15,1.42,43.63a4,4,0,0,1-8,.26A4.59,4.59,0,0,1,59.3,61.08Z"
const d1_65 = "M60.06,60,83.63,11.27,66.54,62.64a3.51,3.51,0,1,1-6.65-2.22A2.17,2.17,0,0,1,60.06,60Z"

let coord = [];

const coord11 = ["55.32","1.71","73.34","2.76"]
const coord15 = ["9.49","29.28","18.65","17.56"]
const coord21 = ["90.23","6.48","106.67","17.78"]
const coord24 = ["56.61","1.71","72.22","2.42"]
const coord31 = ["58.25","1.71","48.44","3.16"]
const coord44 = ["105.95","17.13","103.66","14.86"]
const coord46 = ["58.36","1.71","78.06","3.41"]
const coord51 = ["62.46","59.77","74.24","2.02"]
const coord53 = ["117.1","31.01","114.15","26.31"]
const coord61 = ["65.53","1.71","68.05","1.71"]
const coord65 = ["66.15","1.71","84.6","5.41"]

let discretisation = [];

const discretisation11 = [12522,18000,19000,20000,21000,28660];
const discretisation15 = [4.6,12.5,15,18,20,54];
const discretisation21 = [2.2,15.5,18,20.5,24.5,37.4];
const discretisation24 = [24.2,40,42,43.5,45,56.5];
const discretisation31 = [-2.5,0,0.2,0.5,0.8,6.5];
const discretisation44 = [12.2,27.5,32.5,36,39.5,57.2];
const discretisation46 = [0,20,25,30,40,98.9];
const discretisation51 = [5.6,7.5,9,10,11.5,17.2];
const discretisation53 = [20.1,78.5,80.5,81.5,82.5,87.3];
const discretisation61 = [1,30,35,38,45,88];
const discretisation65 = [17.8,31.5,35,38,40,53.50];


console.log(memoireNiv3);
switch(memoireNiv3){
  case "0":
    cheminMaCarteJSON = cheminMaCarteJSONze;
    titreLegende = titreLegende[0];
    sousTitreLegende = sousTitreLegende[0];
    choixUnite = choixUnite[0];
    d0 = d0_11;
    d1 = d1_11;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre11);
    Array.prototype.push.apply(coord,coord11);
    Array.prototype.push.apply(discretisation,discretisation11);

    document.getElementById("mon_bouton_zau").style.display="none"
    break;
  case "1":
    cheminMaCarteJSON = cheminMaCarteJSONepci2018;
    titreLegende = titreLegende[1];
    sousTitreLegende = sousTitreLegende[1];
    choixUnite = choixUnite[1];
    d0 = d0_15;
    d1 = d1_15;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre15);
    Array.prototype.push.apply(coord,coord15);
    Array.prototype.push.apply(discretisation,discretisation15);
    break;
  case "2":
    cheminMaCarteJSON = cheminMaCarteJSONepci2018;
    titreLegende = titreLegende[2];
    sousTitreLegende = sousTitreLegende[1];
    choixUnite = choixUnite[1];
    d0 = d0_21;
    d1 = d1_21;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre21);
    Array.prototype.push.apply(coord,coord21);
    Array.prototype.push.apply(discretisation,discretisation21);
    break;
  case "3":
    cheminMaCarteJSON = cheminMaCarteJSONdep;
    titreLegende = titreLegende[3];
    sousTitreLegende = sousTitreLegende[3];
    choixUnite = choixUnite[1];
    d0 = d0_24;
    d1 = d1_24;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre24);
    Array.prototype.push.apply(coord,coord24);
    Array.prototype.push.apply(discretisation,discretisation24);

    document.getElementById("mon_bouton_zau").style.display="none"
    break;
  case "4":
    cheminMaCarteJSON = cheminMaCarteJSONze;
    titreLegende = titreLegende[4];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    d0 = d0_31;
    d1 = d1_31;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre31);
    Array.prototype.push.apply(coord,coord31);
    Array.prototype.push.apply(discretisation,discretisation31);
    break;
  case "5":
    cheminMaCarteJSON = cheminMaCarteJSONze;
    titreLegende = titreLegende[5];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    d0 = d0_44;
    d1 = d1_44;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre44);
    Array.prototype.push.apply(coord,coord44);
    Array.prototype.push.apply(discretisation,discretisation44);
    break;
  case "6":
    cheminMaCarteJSON = cheminMaCarteJSONepci2017;
    titreLegende = titreLegende[6];
    sousTitreLegende = sousTitreLegende[1];
    choixUnite = choixUnite[1];
    d0 = d0_46;
    d1 = d1_46;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre46);
    Array.prototype.push.apply(coord,coord46);
    Array.prototype.push.apply(discretisation,discretisation46);

    document.getElementById("mon_bouton_zau").style.display="none"
    break;
  case "7":
    cheminMaCarteJSON = cheminMaCarteJSONdep;
    titreLegende = titreLegende[7];
    sousTitreLegende = sousTitreLegende[3];
    choixUnite = choixUnite[1];
    d0 = d0_51;
    d1 = d1_51;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre51);
    Array.prototype.push.apply(coord,coord51);
    Array.prototype.push.apply(discretisation,discretisation51);

    document.getElementById("mon_bouton_zau").style.display="none"
    break;
  case "8":
    cheminMaCarteJSON = cheminMaCarteJSONze;
    titreLegende = titreLegende[8];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    d0 = d0_53;
    d1 = d1_53;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre53);
    Array.prototype.push.apply(coord,coord53);
    Array.prototype.push.apply(discretisation,discretisation53);
    break;
  case "9":
    cheminMaCarteJSON = cheminMaCarteJSONepci2017;
    titreLegende = titreLegende[9];
    sousTitreLegende = sousTitreLegende[1];
    choixUnite = choixUnite[1];
    d0 = d0_61;
    d1 = d1_61;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre61);
    Array.prototype.push.apply(coord,coord61);
    Array.prototype.push.apply(discretisation,discretisation61);

    document.getElementById("mon_bouton_zau").style.display="none"
    break;
  case "10":
    cheminMaCarteJSON = cheminMaCarteJSONze;
    titreLegende = titreLegende[10];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    d0 = d0_65;
    d1 = d1_65;
    Array.prototype.push.apply(valeurBarometre,valeurBarometre65);
    Array.prototype.push.apply(coord,coord65);
    Array.prototype.push.apply(discretisation,discretisation65);

    document.getElementById("mon_bouton_zau").style.display="none"
    break;
};



/*Couleur histogramme*/
/*Afficher graphique barometre*/

let maCouleurHisto = "#fff";
let monDegrade = "";
let maPaletteCouleur = "";


  switch(levelTitreFacteur){
    case 0:
      maCouleurHisto = colorTheme1;
      maPaletteCouleur = color5Theme2;
      monDegrade = degrade1;
      break;
    case 1:
      maCouleurHisto = colorTheme2;
      maPaletteCouleur = color5Theme5;
      monDegrade = degrade2;
      break;
    case 2:
      maCouleurHisto = colorTheme3;
      maPaletteCouleur = color5Theme6;
      monDegrade = degrade3;
      break;
    case 3:
      maCouleurHisto = colorTheme4;
      maPaletteCouleur = color5Theme3;
      monDegrade = degrade4;
      break;
    case 4:
      maCouleurHisto = colorTheme5;
      maPaletteCouleur = color5Theme1;
      monDegrade = degrade5;
      break;
    case 5:
      maCouleurHisto = colorTheme6;
      maPaletteCouleur = color5Theme4;
      monDegrade = degrade6;
      break;
  };






/*Affichage carte et graphique*/

//IntersectionObserver permet d'observer l'évolution de l'intersection d'un
//élément cible avec un élément ancêtre ou avec la zone d'afficahge d'un document

if("IntersectionObserver" in window) {

let ioHisto = new IntersectionObserver(function(entries) {
  // Si intersectionRatio est égale à 0, l'élément cible est hors de vue
  if (entries[0].intersectionRatio <= 0) return d3.selectAll(".histogramme>*").remove();
  //Sinon c'est que l'élement cible est en vue
  afficherHistogramme(cheminMonHistogramme,maCouleurHisto);
});
// Commence l'observation
ioHisto.observe(document.querySelector('.mon_histogramme'));
} else{
  afficherHistogramme(cheminMonHistogramme,maCouleurHisto);
}

console.log(cheminMaCarteJSON);
afficherBarometre();
afficherCarteEvolution(cheminMaCarteJSON,cheminMaCarte);
afficherZau(cheminMonZau)
//afficherCarte(cheminMaCarte);


/*
.######..##.....##..#######..####.##.....##.
##....##.##.....##.##.....##..##...##...##..
##.......##.....##.##.....##..##....##.##...
##.......#########.##.....##..##.....###....
##.......##.....##.##.....##..##....##.##...
##....##.##.....##.##.....##..##...##...##..
.######..##.....##..#######..####.##.....##.
*/


/*Requete mon choix*/

//Fabrication des div choix

let fragment = document.createDocumentFragment();
for (let i=0;i<3;i++){
  let div = document.createElement("div");
  div.setAttribute("id","choix0"+i);
  div.setAttribute("class","choix non_selection");
  fragment.appendChild(div)
};
selectionMonChoix[0].appendChild(fragment);

//Ajout du texte des div choix
let selectionChoix = document.getElementsByClassName("choix");

selectionChoix[0].innerHTML = " Choisir un autre indicateur du même facteur de cohésion";
selectionChoix[1].innerHTML = " Choisir un indicateur au hasard";
selectionChoix[2].innerHTML = " Retourner à l'accueil";

//Ajout des liens

let subMemoire = "";
let subMemoireIndicateur = "";
let subMemoireNiv3 = "";

//Transformation en obj
mapIndicateur = JSON.parse(mapIndicateur);
//Transformation en map
function objToStrMap(obj){
  let strMap = new Map();
  for (let k of Object.keys(obj)){
    strMap.set(k,obj[k]);
  };
  return strMap;
};

mapIndicateur = objToStrMap(mapIndicateur);



//Préparation du cas 1 : indicateur du même enjeu
function nombreHasard(min,max){
  return Math.floor(Math.random() * (max -min + 1)) + min;
};




let afficherChoix1 = ()=>{
  let mapMemeIndicateur = new Map();
  for(let [k,v] of mapIndicateur.entries()){
    if (parseInt(v.substr(5,1))-1===levelTitreFacteur){
      mapMemeIndicateur.set(k,v);
    };
  };

  subMemoireNiv3 = nombreHasard(parseInt(mapMemeIndicateur.keys().next().value),parseInt(mapMemeIndicateur.keys().next().value)+mapMemeIndicateur.size-1).toString();
  subMemoireIndicateur = mapMemeIndicateur.get(subMemoireNiv3);

};



//Préparation du cas 2 : indicateur au hasard
let afficherChoix2 = ()=>{
  subMemoireNiv3 = nombreHasard(0,mapIndicateur.size-1).toString();
  console.log(subMemoireNiv3);
  subMemoireIndicateur = mapIndicateur.get(subMemoireNiv3);
  console.log(subMemoireIndicateur);
};

//Cas suivant le choix de l'utilisateur
Array.from(selectionChoix).forEach((el,i)=>{
  el.addEventListener("click",function(e){
    switch (i) {
      case 0:
        afficherChoix1();
        sessionStorage.setItem("memoireIndicateur", subMemoireIndicateur);
        sessionStorage.setItem("memoireNiv3",subMemoireNiv3);
        window.location = "indicateur.html";
      break;
      case 1:
        afficherChoix2();
        sessionStorage.setItem("memoireIndicateur", subMemoireIndicateur);
        sessionStorage.setItem("memoireNiv3",subMemoireNiv3);
        window.location = "indicateur.html";
      break;
      case 2:
        window.location = "index.html";
      break;
    };
  });
});




//Test interaction Touch Event



//Fond d'Image
switch(levelTitreFacteur){
  case 0:
    document.body.style.backgroundImage = "url('img/fond_1.gif')";
    break;
  case 1:
    document.body.style.backgroundImage = "url('img/fond_2.gif')";
    break;
  case 2:
    document.body.style.backgroundImage = "url('img/fond_3.gif')";
    break;
  case 3:
    document.body.style.backgroundImage = "url('img/fond_4.gif')";
    break;
  case 4:
    document.body.style.backgroundImage = "url('img/fond_5.gif')";
    break;
  case 5:
    document.body.style.backgroundImage = "url('img/fond_6.gif')";
    break;
};
