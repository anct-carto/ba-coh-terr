

let afficherCarte=(cheminData)=>{

  let w = 600;
  let h = 350;
  let view = [0,0,600,350];


  //Sélection de l'élément html
  let svgCarte = d3.select(".carte")
      .attr("width", "100%")
      .attr("preserveAspectRatio","xMidYMid meet")
      .attr("viewBox", `${view[0]},${view[1]},${view[2]},${view[3]}`);


  //Création de l'objet choro pour créer une échelle quantitative linéaire
  let choro = d3.map();


  //Définition de la projection utilisée et centrage sur la France
  //Création de l'objet path pour manipuler les données GeoJSON
  let projection = d3.geoConicConformal()
      .center([1.282743, 46.328377])
      .scale(1600)
      .translate([w / 2, h / 2]);

  let path = d3.geoPath()
      .projection(projection);

  //La projection est assignée au path
  path.projection(projection);

  let color = d3.scaleQuantize()
      .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);

  //Chargement du json et du csv
  let promises1 = d3.json("data/json/au_WGS84_UTF8.topojson");
  let promises2 = d3.csv(cheminData);

  Promise.all([promises1, promises2]).then(function(fr){

      color.domain([
        d3.min(fr[1], function(d){ return d.value1; }),
        d3.max(fr[1], function(d){ return d.value1; })
      ]);

  //Fusion du json et du csv

    let featureCollection = topojson.feature(fr[0],fr[0].objects.au_WGS84_UTF8)
  for (var i=0; i< fr[1].length;i++){
    var csvId = fr[1][i].codgeo;
    var csvValue1 = parseFloat(fr[1][i].value1);
    var csvValue0 = parseFloat(fr[1][i].value0);
    for (var j=0; j<featureCollection.features.length;j++){
      var jsonId = featureCollection.features[j].properties.codgeo;
      if (csvId === jsonId) {
        featureCollection.features[j].properties.value1 = csvValue1;
        featureCollection.features[j].properties.value0 = csvValue0;
        break;
      }
    }
  }



  //L'attribut d définit un chemin à suivre, il permet de définir le chemin
    svgCarte.append("g")
      .selectAll("path")
      .data(featureCollection.features)
      .enter()
      .append("path")
      .attr("class", "dep")
      .attr("d", path)
      .style("fill", function(d){
        var value = d.properties.value1;
        return value? color(value):"#ccc";
      });

      //Contour des départements
      svgCarte.append("path")
        .attr("class", "dep_contour")
        .datum(topojson.mesh(fr[0], fr[0].objects.au_WGS84_UTF8, function(a, b) { return a !== b; }))
        .attr("d", path);

      //Contour des régions
      svgCarte.append("path")
        .attr("class", "reg_contour")
        .datum(topojson.mesh(fr[0], fr[0].objects.au_WGS84_UTF8, function(a, b) { return a.properties.libreg !== b.properties.libreg; }))
        .attr("d", path);



   //Création de la div pour le popup2
   let popup2 = d3.select("body").append("div")
      .attr("class", "mon_popup_carte");

     //Ajout du popup2
    svgCarte.selectAll("path")
        .on("mouseover", function(d){
          popup2
            .style("left", d3.event.pageX - 20 + "px")
            .style("top", d3.event.pageY - 50 + "px")
            .style("display", "inline-block")
            .style("text-align", "left")
            .html(`${d.properties.libgeo}<div>${d.properties.value1}</div>`);

      })
    .on("mouseout", function(d){ popup2.style("display", "none");});

  });


};
