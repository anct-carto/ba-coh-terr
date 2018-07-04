
let monImage = document.querySelector('img');

fetch('img/flowers.jpg').then(function(reponse) {
  reponse.ok ? (
    reponse.blob().then(function(monBlob){
      let objetURL = URL.createObjectURL(monBlob);
      monImage.src = objetURL;
    })
  ):(
    console.Log('Mauvaise réponse du réseau')
  )
})
.catch(function(error){
  console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
});








//CARTE---------------------------------------------------
//-------------------------------------------------------

let w = 560;
let h = 550;
let view = [0,0,560,550];


//Sélection de l'élément html
let svgCarte = d3.select(".carte")
  .attr("width", w)
  .attr("height", h)
  .attr("viewBox", view[0]+view[1]+view[2]+view[3]);


//Création de l'objet choro pour créer une échelle quantitative linéaire
let choro = d3.map();


//Définition de la projection utilisée et centrage sur la France
//Création de l'objet path pour manipuler les données GeoJSON
let projection = d3.geoConicConformal()
    .center([1.282743, 46.328377])
    .scale(2600)
    .translate([w / 2, h / 2]);

let path = d3.geoPath()
  .projection(projection);

//La projection est assignée au path
path.projection(projection);

let g2 = svgCarte.append("g")


//Chargement du json et du csv
let promises1 = d3.json("data/json/dep_GEN_WGS84_UTF8.topojson");
let promises2 = d3.csv("data/csv/map_indicateur1.csv");

Promise.all([promises1, promises2]).then(function(fr){
    console.log(fr[0]);
    console.log(fr[1]);


//L'attribut d définit un chemin à suivre
  svgCarte.append("g")
     .attr("class", "dep")
     .selectAll("path")
     .data(topojson.feature(fr[0],fr[0].objects.dep_GEN_WGS84_UTF8).features)
     .enter()
     .append("path")
     .attr("d", path);

});








//HISTOGRAMME REVERSE------------------------------------
//-------------------------------------------------------







//Sélection de l'élément html
let svg = d3.select(".histogramme")

//Création des dimensions du graphique
let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

/*
-------
d3.scaleBand() : construit une échelle de bande ordinale [0,1]
-------
d3.scaleLinear() : construit une échelle linéaire quantitative [0,1]

band.rangeRound([range]) : définit la plage de l'échelle sur le
graphique tout en permettant d'arrondir
-------
band.padding([padding]) : définit la valeur de remplissage externe
et interne :
-------
*/

//Création des échelles x et y
let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
let y = d3.scaleLinear().rangeRound([height, 0]);


//Création de l'élément g crée dans l'élément svg, centre les éléments
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Chargement des données
d3.csv("data.csv").then(function(data) {
  console.log(data);

  //Mise à l'échelle de la plage de données et attribution de l'axe
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  /*
  -------
  d3.axisBottom() crée un axe orienté en bas
  -------
  */

  //Ajout de l'axe x
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));


      /*
      -------
      d3.axisLeft() crée un axe orienté à gauche
      -------
      */

  //Ajout de l'axe y
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  //Ajout des rectangles
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); });
});











//CONFLIT MOUSEMOVE & CLICK------------------------------------
//-------------------------------------------------------










let opaciteAccueilTheme = window.getComputedStyle(selectionAccueilTheme[1],null).getPropertyValue("fill-opacity");
if(opaciteAccueilTheme==="1"){
  console.log(opaciteAccueilTheme);
};
if(opaciteAccueilTheme==="0.5"){
  selectionAccueilTheme[1].style.fillOpacity=1;
  console.log(opaciteAccueilTheme);
};

selectionAccueilTheme[1].addEventListener("mousemove", function(){
  selectionAccueilTheme[1].style.fillOpacity=1;
});

selectionAccueilTheme[1].addEventListener("mouseout", function(){
  selectionAccueilTheme[1].style.fillOpacity=0.5;
});








//Création du boutton
let button = document.createElement("button");
let t = document.createTextNode("OK");
button.appendChild(t);
button.setAttribute("id","button_launch");

let afficherButton=(level)=>{
  selectionNiv3[level].appendChild(button);
};









switch(memoireIndicateur){
  case "niv3_1_1":
      levelTitreFacteur = 1;
      levelTitreIndicateur = 1;
    break;
  case "niv3_1_5":
      levelTitreFacteur = 1;
      levelTitreIndicateur = 5;
    break;
  case "niv3_2_1":
      levelTitreFacteur = 2;
    break;
  case "niv3_2_4":
      levelTitreFacteur = 2;
    break;
  case "niv3_3_1":
      levelTitreFacteur = 3;
    break;
  case "niv3_4_4":
      levelTitreFacteur = 4;
    break;
  case "niv3_4_6":
      levelTitreFacteur = 4;
    break;
  case "niv3_5_1":
      levelTitreFacteur = 5;
    break;
  case "niv3_5_3":
      levelTitreFacteur = 5;
    break;
  case "niv3_6_1":
      levelTitreFacteur = 6;
    break;
  case "niv3_6_5":
      levelTitreFacteur = 6;
    break;
};
