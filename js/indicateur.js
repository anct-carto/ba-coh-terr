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
console.log(cheminMonHistogramme)
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

/*Couleur histogramme*/

let maCouleurHisto = "#fff"
  switch(levelTitreFacteur){
    case 0:
      maCouleurHisto = colorTheme1;
      paletteCouleur = color5Theme2;
      document.getElementById("bouton1").style.backgroundColor = colorTheme1;
      document.getElementById("boutoncarte1").style.backgroundColor = colorTheme2;
      document.getElementById("boutoncarte2").style.backgroundColor = colorTheme2;
      break;
    case 1:
      maCouleurHisto = colorTheme2;
      paletteCouleur = color5Theme5;
      document.getElementById("bouton1").style.backgroundColor = colorTheme2;
      document.getElementById("boutoncarte1").style.backgroundColor = colorTheme5;
      document.getElementById("boutoncarte2").style.backgroundColor = colorTheme5;
      break;
    case 2:
      maCouleurHisto = colorTheme3;
      paletteCouleur = color5Theme6;
      document.getElementById("bouton1").style.backgroundColor = colorTheme3;
      document.getElementById("boutoncarte1").style.backgroundColor = colorTheme6;
      document.getElementById("boutoncarte2").style.backgroundColor = colorTheme6;
      break;
    case 3:
      maCouleurHisto = colorTheme4;
      paletteCouleur = color5Theme3;
      document.getElementById("bouton1").style.backgroundColor = colorTheme4;
      document.getElementById("boutoncarte1").style.backgroundColor = colorTheme3;
      document.getElementById("boutoncarte2").style.backgroundColor = colorTheme3;
      break;
    case 4:
      maCouleurHisto = colorTheme5;
      paletteCouleur = color5Theme1;
      document.getElementById("bouton1").style.backgroundColor = colorTheme5;
      document.getElementById("boutoncarte1").style.backgroundColor = colorTheme1;
      document.getElementById("boutoncarte2").style.backgroundColor = colorTheme1;
      break;
    case 5:
      maCouleurHisto = colorTheme6;
      paletteCouleur = color5Theme4;
      document.getElementById("bouton1").style.backgroundColor = colorTheme6;
      document.getElementById("boutoncarte1").style.backgroundColor = colorTheme4;
      document.getElementById("boutoncarte2").style.backgroundColor = colorTheme4;
      break;
  };

/*Légende carte*/
let choixUnite = ["€","%","‰"];

let titreLegende = ["Médiane du revenu disponible par unité de consommation",
"Part des 15-24 ans, ni en emploi, ni en études, ni en formation",
"Part des personnes de 65 ans et plus en 2014",
"Part des demandeurs d'emploi de longue durée parmi les demandeurs d'emploi de catégories A, B et C",
"Taux d'évolution annuel de la population due au solde migratoire apparent",
"Part des locaux éligibles toutes technologies à un débit supérieur à 30 Mb/s",
"Part des fonctions productives dans l'emploi",
"Nombre de bénévoles actifs dans les associations pour 1000 habitants",
"Taux de participation au premier tour de l'élection présidentielle",
"",
""];

let sousTitreLegende = ["En euros, par zone d'emploi",
"En %, par intercommunalité",
"En %, par zone d'emploi",
"En %, par département",
"En ‰ par département"];


switch(levelTitreFacteur){
  case 0:
    titreLegende = titreLegende[0];
    sousTitreLegende = sousTitreLegende[0];
    choixUnite = choixUnite[0];
    break;
  case 1:
    titreLegende = titreLegende[1];
    sousTitreLegende = sousTitreLegende[1];
    choixUnite = choixUnite[1];
    break;
  case 2:
    titreLegende = titreLegende[2];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    break;
  case 3:
    titreLegende = titreLegende[3];
    sousTitreLegende = sousTitreLegende[1];
    choixUnite = choixUnite[1];
    break;
  case 4:
    titreLegende = titreLegende[4];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    break;
  case 5:
    titreLegende = titreLegende[5];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    break;
  case 6:
    titreLegende = titreLegende[6];
    sousTitreLegende = sousTitreLegende[1];
    choixUnite = choixUnite[1];
    break;
  case 7:
    titreLegende = titreLegende[7];
    sousTitreLegende = sousTitreLegende[4];
    choixUnite = choixUnite[2];
    break;
  case 8:
    titreLegende = titreLegende[8];
    sousTitreLegende = sousTitreLegende[2];
    choixUnite = choixUnite[1];
    break;
  case 9:

    break;
  case 10:

              break;

};





/*Affichage carte et graphique*/

//IntersectionObserver permet d'observer l'évolution de l'intersection d'un
//élément cible avec un élément ancêtre ou avec la zone d'afficahge d'un document

if("IntersectionObserver" in window) {

let ioHisto = new IntersectionObserver(function(entries) {
  // Si intersectionRatio est égale à 0, l'élément cible est hors de vue
  if (entries[0].intersectionRatio <= 0) return d3.selectAll(".histogramme>*").remove();;
  //Sinon c'est que l'élement cible est en vue
  afficherHistogramme(cheminMonHistogramme,maCouleurHisto);
});
// Commence l'observation
ioHisto.observe(document.querySelector('.mon_histogramme'));
} else{
  afficherHistogramme(cheminMonHistogramme,maCouleurHisto);
}


afficherCarteEvolution(cheminMaCarte);
afficherCarte(cheminMaCarte);


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

selectionChoix[0].innerHTML = " Choisir un autre indicateur du même enjeu";
selectionChoix[1].innerHTML = " Choisir un indicateur au hasard";
selectionChoix[2].innerHTML = " Retourner sur le baromètre interactif";

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
