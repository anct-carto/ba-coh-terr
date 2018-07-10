
let etatBoutonCarte2 = true;

let afficherCarteEvolution = (cheminJSON, cheminData)=>{

  //Si une seule année
  let uneAnnee = false;


  w = 600;
  h = 550;
  view = [0,0,600,550];


  //Sélection de l'élément html
  let svgCarteEvolution = d3.select(".carte_evolution")
      .attr("width", "100%")

      .attr("preserveAspectRatio","xMidYMid meet")
      .attr("viewBox", `${view[0]},${view[1]},${view[2]},${view[3]}`);


  //Création de l'objet choro pour créer une échelle quantitative linéaire
  choro = d3.map();


  //Définition de la projection utilisée et centrage sur la France
  //Création de l'objet path pour manipuler les données GeoJSON
  projection = d3.geoConicConformal()
      .center([1.282743, 46.328377])
      .scale(2600)
      .translate([w / 2, h / 2]);

  path = d3.geoPath()
      .projection(projection);

  //La projection est assignée au path
  path.projection(projection);

  color = d3.scaleQuantile()
      .range(maPaletteCouleur);

  //Chargement du json et du csv
  let promises1 = d3.json(cheminJSON);
  let promises2 = d3.csv(cheminData);




  Promise.all([promises1, promises2]).then(function(fr){



  //Fusion du json et du csv

  let featureCollection = topojson.feature(fr[0],fr[0].objects.fr_wgs84_utf8)

  for (var i=0; i< fr[1].length;i++){
    var csvId = fr[1][i].codgeo;
    var csvValue1 = parseFloat(fr[1][i].value1);
    var csvValue0 = parseFloat(fr[1][i].value0);
    var csvYear1 = fr[1][i].year1;
    var csvYear0 = fr[1][i].year0;
    for (var j=0; j<featureCollection.features.length;j++){
      var jsonId = featureCollection.features[j].properties.codgeo;
      if (csvId === jsonId) {
        featureCollection.features[j].properties.value1 = csvValue1;
        featureCollection.features[j].properties.value0 = csvValue0;
        featureCollection.features[j].properties.year1 = csvYear1;
        featureCollection.features[j].properties.year0 = csvYear0;
        break;
      }
    }
  }

  //Coerce numérique
  fr[1].forEach(function(d) {
    d.value0 = +d.value0;
    d.value1 = +d.value1;
  });





    //Si une seule année
    if (d3.mean(fr[1].map(function(d){return d.value0}))===undefined){
      uneAnnee = true;
    } else {
      uneAnnee = false;
      }

    //Condition une seule année
    uneAnnee ? (
      document.getElementById("boutoncarte0").style.display="none",
      update("value1")
    ):(
      document.getElementById("boutoncarte1").style.display="flex",
      update("value1")
    );



   //Création de la div pour le popup2
   popup2 = d3.select("body").append("div")
      .attr("class", "mon_popup_carte");


    //Fonction création de tous les éléments de la carte
    function update(dataValue){

      color.domain(discretisation);

      svgCarteEvolution
        .selectAll("path")
        .remove();

      let features = svgCarteEvolution.append("g")
        .selectAll("path")
        .data(featureCollection.features)
        .enter()
        .append("path")
        .attr("class", "dep")
        .attr("d", path)
        .style("fill", function(d){
          var value = d.properties[dataValue];
          return value? color(value)
                 :value===0 ? color(value)
                 :"#ccc"
        });

        let highlighted = "";

        //Contour des ze
        svgCarteEvolution.append("path")
          .attr("class", "dep_contour")
          .datum(topojson.mesh(fr[0], fr[0].objects.fr_wgs84_utf8, function(a, b) { return a.properties.codgeo !== b.properties.codgeo; }))
          .attr("d", path);

        //Contour des régions
//        svgCarteEvolution.append("path")
//          .attr("class", "reg_contour")
//          .datum(topojson.mesh(fr[0], fr[0].objects.ze_WGS84_UTF8, function(a, b) { return a.properties.codreg !== b.properties.codreg; }))
//          .attr("d", path);


        //Ajout du popup2
       svgCarteEvolution.selectAll("path")
           .on("mouseover", function(d){
             popup2
               .style("left", d3.event.pageX - 20 + "px")
               .style("top", d3.event.pageY - 60 + "px")
               .style("display", "inline-block")
               .style("text-align", "left")
               .html(`<div>${d.properties.libgeo}</div><div><span>${d.properties[dataValue]} ${choixUnite}</span></div>`);
              d3.select(this).style("cursor","crosshair");

         })
       .on("mouseout", function(d){
          popup2
            .style("display", "none");
          d3.select(this).style("cursor","none");
          });

       //Ajout de la légende



      svgCarteEvolution
        .selectAll(".legend_entree")
        .remove();

      svgCarteEvolution
        .selectAll("rect")
        .remove();


      let legend = svgCarteEvolution.selectAll("g.legend_entree")
          .data(color.range().reverse())
          .enter()
          .append("g")
          .attr("class","legend_entree")
          .on("click",function(d,i) {
         // clicking an active entry: reset
         if(highlighted == d) {
          features.style("opacity",1);

          legend.selectAll("rect")
           .style("fill",function(d) { return d; });

           highlighted = ""; // reset


         }
         else {
           highlighted = d;

           features.style("opacity",0.2)
            .filter(function(f) {
             return color(f.properties[dataValue]) == d;
            })
            .style("opacity",1);

          // set legend:
          legend.selectAll("rect")
           .style("fill","white")

          d3.select(this).select("rect")
            .style("fill",function(d) { return d;});
         }
     })
        .on("mouseover",function(d,i){
          d3.select(this).style("cursor","pointer");
        })
        .on("mouseout",function(d,i){
          d3.select(this).style("cursor","none");
        })

      legend
      .append('rect')
      .attr("x", 30)
      .attr("y", function(d, i) {
         return 40 + i * 20;
      })
     .attr("width", 20)
     .attr("height", 10)
     .style("stroke", "black")
     .style("stroke-width", 0.1)
     .style("fill", function(d){return d;});
         //the data objects are the fill colors

      legend
          .append('text')
          .attr("x", 55) //leave 5 pixel space after the <rect>
          .attr("y", function(d, i) {
             return 40 + i * 20;
          })
          .attr("dy", "0.8em") //place text one line *below* the x,y point
          .style("font-family","latomedium")
          .style("font-size","0.8em")
          .style("fill","#595959")
          .text(function(d,i) {
              var extent = color.invertExtent(d);
              //extent will be a two-element array, format it however you want:
              var format = d3.format("");
              return `${format(+extent[0])} - ${format(+extent[1])}`
            });


            //Ajout Animation
            d3.select("#boutoncarte2")
            .on("click",function(d){
              if(etatBoutonCarte2===true){
                document.getElementById("boutoncarte2").innerHTML = "&#9654";
                d3.selectAll("path").transition();
                etatBoutonCarte2=false;
              } else {
                document.getElementById("boutoncarte2").innerHTML = "&#9724";
                evolution()
                etatBoutonCarte2=true;
              }

            });


            function evolution (){
            features
            .style("fill", function(d){
              var value = d.properties["value0"];
              return value? color(value):"#ccc";
            })
            .transition()
            .duration(2000)
            .on("start", function repeat(){
              d3.active(this)
              .style("fill", function(d){
                var value = d.properties["value1"];
                return value? color(value):"#ccc";
              })
              .transition()
              .style("fill", function(d){
                var value = d.properties["value0"];
                return value? color(value):"#ccc";
              })
              .transition()
                .on("start",repeat);

            })
    };



  }; //fin de la fonction update


    d3.select("#boutoncarte0")
    .on("click",function(d){

      update("value0");
    });

    d3.select("#boutoncarte1")
    .on("click",function(d){

      update("value1");
    });



    //Bouton Ajout année
    d3.select("#boutoncarte0>span")
        .data(featureCollection.features)
        .html(function(d){return d.properties.year0})
    d3.select("#boutoncarte1>span")
        .data(featureCollection.features)
        .html(function(d){return d.properties.year1})

    //Ajout texte légende
    svgCarteEvolution.append("text")
      .attr("x", 5)
      .attr("y",13)
      .attr("text-anchor","start")
      .style("font-family","latomedium")
      .style("font-size","0.9em")
      .style("fill","#595959")
      .text(titreLegende);

      svgCarteEvolution.append("text")
        .attr("x", 5)
        .attr("y",30)
        .attr("text-anchor","start")
        .style("font-family","latomedium")
        .style("font-size","0.8em")
        .style("fill","#595959")
        .text(sousTitreLegende);






  }).catch(function(err){
    console.log(err.message);
});


  ; //fin de Promise




//Style bouton
  d3.select("#boutoncarte1")
      .style("background-color", maPaletteCouleur[4])

  d3.select("#boutoncarte2")
      .style("background-color", maPaletteCouleur[4])

}; //fin de la fonction afficherCarteEvolution
