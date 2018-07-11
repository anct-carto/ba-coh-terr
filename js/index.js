let selectionAccueilFacteur = document.getElementsByClassName("accueil_facteur");
let selectionNiv1 = document.getElementsByClassName("niv1");
let selectionTexteFacteur = document.getElementsByClassName("texte_facteur");
let selectionTexteTheme = document.getElementsByClassName("texte_theme");
let selectionNiv3 = document.getElementsByClassName("niv3");
let selectionAccueilCercle = document.getElementsByClassName("accueil_cercle")

let selectionTexteThemeFacteur1 = document.querySelectorAll("#facteur1_niv1 .texte_theme");
let selectionTexteThemeFacteur2 = document.querySelectorAll("#facteur2_niv1 .texte_theme");
let selectionTexteThemeFacteur3 = document.querySelectorAll("#facteur3_niv1 .texte_theme");
let selectionTexteThemeFacteur4 = document.querySelectorAll("#facteur4_niv1 .texte_theme");
let selectionTexteThemeFacteur5 = document.querySelectorAll("#facteur5_niv1 .texte_theme");
let selectionTexteThemeFacteur6 = document.querySelectorAll("#facteur6_niv1 .texte_theme");

let selectionMonResume = document.getElementsByClassName("mon_resume");


/*
.######......###....##.....##..######..##.....##.########.
##....##....##.##...##.....##.##....##.##.....##.##.......
##.........##...##..##.....##.##.......##.....##.##.......
##...####.##.....##.##.....##.##.......#########.######...
##....##..#########.##.....##.##.......##.....##.##.......
##....##..##.....##.##.....##.##....##.##.....##.##.......
.######...##.....##..#######...######..##.....##.########.
*/

//Animation transition bloc de texte
let revelationAnimation = {
  opacity:[0,1]
}


let nonRevelationAnimation = {
  opacity:[1,0]
}

//Fonctions barometre svg

let memoireClick = "" ;

let afficherBlocTexte = (level) =>{
  enleverBlocTexte();
  selectionNiv1[level].style.display = "block";
  selectionAccueilFacteur[level].style.fillOpacity = "1";

  switch(memoireClick){
    case accueil_facteur1:
        selectionAccueilFacteur[0].style.fillOpacity = "1";
      break;
    case accueil_facteur2:
        selectionAccueilFacteur[1].style.fillOpacity = "1";
      break;
    case accueil_facteur3:
        selectionAccueilFacteur[2].style.fillOpacity = "1";
      break;
    case accueil_facteur4:
        selectionAccueilFacteur[3].style.fillOpacity = "1";
      break;
    case accueil_facteur5:
        selectionAccueilFacteur[4].style.fillOpacity = "1";
      break;
    case accueil_facteur6:
        selectionAccueilFacteur[5].style.fillOpacity = "1";
      break;
  };

};


let enleverBlocTexte = () =>{
  Array.from(selectionNiv1).forEach((el,i)=>{
    el.style.display = "none";
    selectionAccueilFacteur[i].style.fillOpacity = "0.5";
  });
};

let animerAfficherBlocTexte = (level) =>{
  document.getElementsByClassName("mon_accueil_droit")[0].style.display = "block"
  selectionNiv1[level].style.display = "block";
  selectionNiv1[level].animate(revelationAnimation,399);
  selectionNiv1[level].style.opacity = "1";
};


//Action sur le svg barometre
//---------------------------------------------------------------
//---------------------------------------------------------------


//Evenement au click
Array.from(selectionAccueilFacteur).forEach((el,i)=>{
  el.addEventListener("click", function(e){
    memoireClick = "";
    afficherBlocTexte(i);
    selectionMonResume[0].style.display="none";
    memoireClick = e.currentTarget ;
    selectionTexteFacteur[i].style.backgroundColor = colorTheme[i];
    e.stopPropagation();
  });
});

//Evenement mouseover
Array.from(selectionAccueilFacteur).forEach((el,i)=>{
  el.addEventListener("mouseover", function(e){
    afficherBlocTexte(i);
    selectionMonResume[0].style.display="none";
    animerAfficherBlocTexte(i);
    selectionTexteFacteur[i].style.backgroundColor = colorTheme[i];

    Array.from(selectionAccueilCercle).forEach((el,i)=>{
      el.style.opacity = "0.5";
    });

  });
});


//Evenement mouseout
Array.from(selectionAccueilFacteur).forEach((el,i)=>{
  el.addEventListener("mouseout", function(e){
    enleverBlocTexte(i);
    memoireClick ? selectionMonResume[0].style.display="none":
    selectionMonResume[0].style.display="block";
    switch(memoireClick){
      case accueil_facteur1:
          afficherBlocTexte(0);
        break;
      case accueil_facteur2:
          afficherBlocTexte(1);
        break;
      case accueil_facteur3:
          afficherBlocTexte(2);
        break;
      case accueil_facteur4:
          afficherBlocTexte(3);
        break;
      case accueil_facteur5:
          afficherBlocTexte(4);
        break;
      case accueil_facteur6:
          afficherBlocTexte(5);
        break
    };
  });
});

//Texte paramétrage

d3.selectAll(".barometre")
  .append("text")
  .attr("class","text")
  .attr("x",300)
  .attr("y",520)
  .style("font-family","latosemibold")
  .style("font-size","1.2em")
  .style("text-anchor","middle")
  .style("opacity",0)
  .text("")


  //Animation


premiereVisite();

function premiereVisite(){
  if (window.sessionStorage.getItem("nouvelleSession")){
    console.log("ce n'est pas la première visite");
  } else {
    //baroAnimation();
    window.sessionStorage.setItem("nouvelleSession","true");
  }
};
<<<<<<< HEAD


=======
 
>>>>>>> a5134a4fc15361ca74cf147d5173aeab2c94baaa
function baroAnimation(){
d3.selectAll("circle")
  .transition()
  .delay(1000)
  .duration(1000)
  .attr("cx",300)
  .attr("cy",300)

baroFrance(1000,1000)
baroGuadeloupe(2500,1000)
baroMartinique(4000,1000)
baroGuyane(5500,1000)
baroReunion(7000,1000)
baroMayotte(8500,1000)
baroOrigin(10000,1000)

/* Animation des textes
baroTexte("France métropolitaine", 1000)
baroTexteOrigin(2000)
baroTexte("Guadeloupe", 2500)
baroTexteOrigin(3500)
baroTexte("Martinique", 4000)
baroTexteOrigin(5000)
baroTexte("Guyane", 5500)
baroTexteOrigin(6500)
baroTexte("La Réunion", 7000)
baroTexteOrigin(8000)
baroTexte("Mayotte", 8500)
baroTexteOrigin(9500)
baroTexte("",10000)
*/
};





function baroTexte(texte, delai){
  d3.select("text").each(function(d,i){
    d3.select(this)
    .transition()
    .delay(delai)
    .duration(1000)
    .style("opacity",1)
    .text(texte.toUpperCase())
  });
};

function baroTexteOrigin(delai){
  d3.select("text").each(function(d,i){
    d3.select(this)
    .transition()
    .delay(delai)
    .duration(1000)
    .style("opacity",0)
  })
}


//France
function baroFrance(delai,duree){
d3.select("#circle1").transition().delay(delai).duration(duree).attr("cx",284.552).attr("cy",332.865)
d3.select("#circle2").transition().delay(delai).duration(duree).attr("cx",319.233).attr("cy",239.547)
d3.select("#circle3").transition().delay(delai).duration(duree).attr("cx",328.250).attr("cy",304.025)
d3.select("#circle4").transition().delay(delai).duration(duree).attr("cx",234.628).attr("cy",314.532)
d3.select("#circle5").transition().delay(delai).duration(duree).attr("cx",226.795).attr("cy",249.798)
d3.select("#circle6").transition().delay(delai).duration(duree).attr("cx",270.362).attr("cy",220.919)
d3.select("#circle7").transition().delay(delai).duration(duree).attr("cx",278.878).attr("cy",278.370)
d3.select("#circle8").transition().delay(delai).duration(duree).attr("cx",368.834).attr("cy",362.388)
};

//Guadeloupe
function baroGuadeloupe(delai,duree){
d3.select("#circle1").transition().delay(delai).duration(duree).attr("cx",230.126).attr("cy",292.934)
d3.select("#circle2").transition().delay(delai).duration(duree).attr("cx",318.510).attr("cy",239.229)
d3.select("#circle3").transition().delay(delai).duration(duree).attr("cx",272.789).attr("cy",263.508)
d3.select("#circle4").transition().delay(delai).duration(duree).attr("cx",243.127).attr("cy",343.006)
d3.select("#circle5").transition().delay(delai).duration(duree).attr("cx",216.646).attr("cy",242.632)
d3.select("#circle6").transition().delay(delai).duration(duree).attr("cx",308.413).attr("cy",188.329)
d3.select("#circle7").transition().delay(delai).duration(duree).attr("cx",368.321).attr("cy",252.603)
d3.select("#circle8").transition().delay(delai).duration(duree).attr("cx",381.145).attr("cy",373.821)
};

//Martinique
function baroMartinique(delai,duree){
d3.select("#circle1").transition().delay(delai).duration(duree).attr("cx",253.059).attr("cy",274.987)
d3.select("#circle2").transition().delay(delai).duration(duree).attr("cx",326.986).attr("cy",255.681)
d3.select("#circle3").transition().delay(delai).duration(duree).attr("cx",299.212).attr("cy",299.902)
d3.select("#circle4").transition().delay(delai).duration(duree).attr("cx",298.965).attr("cy",357.962)
d3.select("#circle5").transition().delay(delai).duration(duree).attr("cx",228.113).attr("cy",225.682)
d3.select("#circle6").transition().delay(delai).duration(duree).attr("cx",281.990).attr("cy",229.210)
d3.select("#circle7").transition().delay(delai).duration(duree).attr("cx",342.397).attr("cy",328.881)
d3.select("#circle8").transition().delay(delai).duration(duree).attr("cx",373.168).attr("cy",369.833)
};

//Guyane
function baroGuyane(delai,duree){
d3.select("#circle1").transition().delay(delai).duration(duree).attr("cx",295.789).attr("cy",288.277)
d3.select("#circle2").transition().delay(delai).duration(duree).attr("cx",363.820).attr("cy",269.125)
d3.select("#circle3").transition().delay(delai).duration(duree).attr("cx",242.883).attr("cy",281.002)
d3.select("#circle4").transition().delay(delai).duration(duree).attr("cx",266.719).attr("cy",336.401)
d3.select("#circle5").transition().delay(delai).duration(duree).attr("cx",267.288).attr("cy",228.048)
d3.select("#circle6").transition().delay(delai).duration(duree).attr("cx",318.472).attr("cy",241.463)
d3.select("#circle7").transition().delay(delai).duration(duree).attr("cx",340.159).attr("cy",316.324)
d3.select("#circle8").transition().delay(delai).duration(duree).attr("cx",311.909).attr("cy",359.792)
};

//Reunion
function baroReunion(delai,duree){
d3.select("#circle1").transition().delay(delai).duration(duree).attr("cx",298.789).attr("cy",296.099)
d3.select("#circle2").transition().delay(delai).duration(duree).attr("cx",348.777).attr("cy",281.089)
d3.select("#circle3").transition().delay(delai).duration(duree).attr("cx",240.263).attr("cy",288.364)
d3.select("#circle4").transition().delay(delai).duration(duree).attr("cx",263.639).attr("cy",335.941)
d3.select("#circle5").transition().delay(delai).duration(duree).attr("cx",255.926).attr("cy",236.791)
d3.select("#circle6").transition().delay(delai).duration(duree).attr("cx",307.571).attr("cy",241.923)
d3.select("#circle7").transition().delay(delai).duration(duree).attr("cx",363.767).attr("cy",334.268)
d3.select("#circle8").transition().delay(delai).duration(duree).attr("cx",313.430).attr("cy",353.351)
};

//Mayotte
function baroMayotte(delai,duree){
d3.select("#circle1").transition().delay(delai).duration(duree).attr("cx",303.831).attr("cy",296.289)
d3.select("#circle2").transition().delay(delai).duration(duree).attr("cx",342.586).attr("cy",259.621)
d3.select("#circle3").transition().delay(delai).duration(duree).attr("cx",240.821).attr("cy",255.861)
d3.select("#circle4").transition().delay(delai).duration(duree).attr("cx",269.115).attr("cy",361.542)
d3.select("#circle5").transition().delay(delai).duration(duree).attr("cx",258.529).attr("cy",206.207)
d3.select("#circle6").transition().delay(delai).duration(duree).attr("cx",291.940).attr("cy",246.794)
d3.select("#circle7").transition().delay(delai).duration(duree).attr("cx",317.612).attr("cy",346.218)
d3.select("#circle8").transition().delay(delai).duration(duree).attr("cx",308.448).attr("cy",395.614)
};

//Barometre
function baroOrigin(delai,duree){
d3.select("#circle1").transition().delay(delai).duration(duree).attr("cx",260.714).attr("cy",302.599)
d3.select("#circle2").transition().delay(delai).duration(duree).attr("cx",358.571).attr("cy",251.884)
d3.select("#circle3").transition().delay(delai).duration(duree).attr("cx",408.571).attr("cy",371.884)
d3.select("#circle4").transition().delay(delai).duration(duree).attr("cx",127.143).attr("cy",473.313)
d3.select("#circle5").transition().delay(delai).duration(duree).attr("cx",107.143).attr("cy",126.170)
d3.select("#circle6").transition().delay(delai).duration(duree).attr("cx",435.714).attr("cy",114.741)
d3.select("#circle7").transition().delay(delai).duration(duree).attr("cx",515.714).attr("cy",310.456)
d3.select("#circle8").transition().delay(delai).duration(duree).attr("cx",462.650).attr("cy",491.706)
};

/*
########..########...#######..####.########.########.
##.....##.##.....##.##.....##..##.....##....##.......
##.....##.##.....##.##.....##..##.....##....##.......
##.....##.########..##.....##..##.....##....######...
##.....##.##...##...##.....##..##.....##....##.......
##.....##.##....##..##.....##..##.....##....##.......
########..##.....##..#######..####....##....########.
*/

//Action à l'intérieur du bloc de texte_theme
//---------------------------------------------------------------
//---------------------------------------------------------------

//Fonctions bloc texte


//Sur Mouseover police et couleur de police
let afficherEffetSurvolThemeTexte = (level,color) =>{
  selectionTexteTheme[level].style.color = color;
  selectionTexteTheme[level].style.fontFamily = "latosemibold";
};

let enleverEffetSurvolThemeTexte = (level) =>{
  selectionTexteTheme[level].style.color = "#595959";
  selectionTexteTheme[level].style.fontFamily = "latomedium";
};

let afficherEffetSurvolIndicateurTexte = (level,color) =>{
  selectionNiv3[level].style.color = color;
  selectionNiv3[level].style.fontFamily = "latosemibold";
};

let enleverEffetSurvolIndicateurTexte = (level) =>{
  selectionNiv3[level].style.color = "#595959";
  selectionNiv3[level].style.fontFamily = "latomedium";
};


//Ajout couleur pour les thèmes
Array.from(selectionTexteTheme).forEach((el,i)=>{

    return (i===0 || i===1)? afficherEffetSurvolThemeTexte(i,colorTheme1):
           (i===2 || i===3)? afficherEffetSurvolThemeTexte(i,colorTheme2):
           (i===4)? afficherEffetSurvolThemeTexte(i,colorTheme3):
           (i===5 || i===6)? afficherEffetSurvolThemeTexte(i,colorTheme4):
           (i===7 || i===8)? afficherEffetSurvolThemeTexte(i,colorTheme5):
                              afficherEffetSurvolThemeTexte(i,colorTheme6);
});



//Ajout des flèches pour les thèmes
Array.from(selectionTexteTheme).forEach((el)=>{
  el.innerHTML = "&#10097; "+el.innerHTML;
});




//Creation string Map
let mapIndicateur = new Map();
Array.from(selectionNiv3).forEach((el,i)=>{
  mapIndicateur.set(i,el.id);
})
console.log(mapIndicateur);


//Evenement click sur mon contenu
document.getElementsByClassName("mon_contenu")[0].addEventListener("click",function(e){
    e.stopPropagation();
});

//Evenement mouseover sur les indicateurs
Array.from(selectionNiv3).forEach((el,i)=>{
  el.addEventListener("mouseover",function(){
    return (i===0)? afficherEffetSurvolIndicateurTexte(i,colorTheme1):
           (i===1)? afficherEffetSurvolIndicateurTexte(i,colorTheme1):
           (i===2)? afficherEffetSurvolIndicateurTexte(i,colorTheme2):
           (i===3)? afficherEffetSurvolIndicateurTexte(i,colorTheme2):
           (i===4)? afficherEffetSurvolIndicateurTexte(i,colorTheme3):
           (i===5)? afficherEffetSurvolIndicateurTexte(i,colorTheme4):
           (i===6)? afficherEffetSurvolIndicateurTexte(i,colorTheme4):
           (i===7)? afficherEffetSurvolIndicateurTexte(i,colorTheme5):
           (i===8)? afficherEffetSurvolIndicateurTexte(i,colorTheme5):
                    afficherEffetSurvolIndicateurTexte(i,colorTheme6);
  });
});


//Evenement mouseout sur les indicateurs
Array.from(selectionNiv3).forEach((el,i)=>{
  el.addEventListener("mouseout",function(){
    enleverEffetSurvolIndicateurTexte(i);
  });
});


//Evenement click sur les indicateurs

for (let i=0;i<selectionNiv3.length;i++){
  selectionNiv3[i].addEventListener("click",function(e){
    sessionStorage.setItem("memoireNiv3",i);
    sessionStorage.setItem("memoireIndicateur",e.currentTarget.id);
    window.location =  "indicateur.html";
    e.stopPropagation();
  });
};

//Calcul nombre indicateurs
//let selectionNombreIndicateur = document.querySelector("p>strong");
//selectionNombreIndicateur.innerHTML = selectionNiv3.length;

/*
########..########.##.....##..#######..########...######..
##.....##.##.......##.....##.##.....##.##.....##.##....##.
##.....##.##.......##.....##.##.....##.##.....##.##.......
##.....##.######...#########.##.....##.########...######..
##.....##.##.......##.....##.##.....##.##...##.........##.
##.....##.##.......##.....##.##.....##.##....##..##....##.
########..########.##.....##..#######..##.....##..######..
*/



//Action à l'extérieur du barometre svg
//---------------------------------------------------------------
//---------------------------------------------------------------

document.addEventListener("click",function(){
  enleverBlocTexte();
Array.from(selectionNiv1).forEach((el,i)=>{
    selectionAccueilFacteur[i].style.fillOpacity = "1";

    Array.from(selectionAccueilCercle).forEach((el,i)=>{
      el.style.opacity = "1";
    });

    document.getElementsByClassName("mon_accueil_droit")[0].style.display="flex";
    selectionMonResume[0].style.display="block";
    memoireClick = ""
  });
});


//SessionStorage mapIndicateur


//Transformation stringMap to object
function strMapToObj(strMap){
  let obj = Object.create(null);
  for(let [k,v] of strMap){
    obj[k]=v;
  };
  return obj;
};

//Enregistrement de l'objet
mapIndicateur = strMapToObj(mapIndicateur);
sessionStorage.setItem("mapIndicateur",JSON.stringify(mapIndicateur));
