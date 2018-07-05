




let afficherBarometre = ()=>{




  let svgBarometre = d3.select(".graphique")
    .attr("width","60%")
    .attr("viewBox","0 0 124.95 77.33");


  //Dégradé de couleur

  let gradient = d3.scaleLinear().range(monDegrade).domain([1,2,3,4,5]);

  let linearGradient = svgBarometre.append("defs")
    .append("linearGradient")
    .attr("id","linear_gradient");

  linearGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", gradient(1));

  linearGradient.append("stop")
      .attr("offset", "25%")
      .attr("stop-color", gradient(2));

  linearGradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", gradient(3));

  linearGradient.append("stop")
      .attr("offset", "75%")
      .attr("stop-color", gradient(4));

  linearGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", gradient(5));


  svgBarometre.select("polyline")
    .style("opacity",0.8)
    .style("fill","url(#linear_gradient)");


  //Tiret
  svgBarometre.selectAll("line")
    .style("fill","#fff")
    .style("stroke","#868686")
    .style("stroke-miterlimit",10)

  //Premier cercle
  svgBarometre.select("circle")
    .style("fill","#fff")

  //Les rond de positionnement de valeur

  //rond valeur0
  svgBarometre.select("#rond_valeur0")
    .style("fill","#b2b2b2")

  //rond valeur1
  svgBarometre.select("#rond_valeur1")
    .style("fill",maCouleurHisto)


  //Les flèche de positionnement de valeur
  svgBarometre.selectAll(".fleche_valeur")
    .attr("transform","translate(" + -0.94 + "," + -1.68 + ")")


  //Texte
  let texte = svgBarometre.selectAll("text")

  texte
    .style("font-family","latomedium")
    .style("font-size","0.3em")
    .style("fill","#575856")

  texte
    .text(function(d,i){return valeurBarometre[i];})



  //Animation path

  let d = "M63.31,64.82,11,61.46l52.25-3.64a3.51,3.51,0,0,1,.49,7A3.69,3.69,0,0,1,63.31,64.82Z"


  svgBarometre.select(".fleche_valeur")
      .attr("d", d)
      .style("fill",maCouleurHisto)
      .style("cursor","crosshair")




  //Animation cercle

  svgBarometre.select(".rond_valeur")
      .attr("cx","62.46")
      .attr("cy","59.77")
      .attr("r","1.71")
      .style("fill",maCouleurHisto)


  function pathTween(d1, precision) {
    return function() {
      var path0 = this,
          path1 = path0.cloneNode(),
          n0 = path0.getTotalLength(),
          n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

      // Echantillonnage uniforme de la distance en fonction de la précision spécifiée
      var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
      while ((i += dt) < 1) distances.push(i);
      distances.push(1);

      // Pour chaque distance, définit un point d'interpolation
      var points = distances.map(function(t) {
        var p0 = path0.getPointAtLength(t * n0),
            p1 = path1.getPointAtLength(t * n1);
        return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
      });

      return function(t) {
        return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
      };
    };
  }


  //Ajout des moyenne France et année
  //Importation des données
  d3.csv("data/csv/baro.csv").then(function(data){
    console.log(data);





    //Création de la div pour le popup
    let popup = d3.select("body").append("div")
      .attr("class", "mon_popup_barometre");


      //donnée filtrée

      switch(memoireNiv3){
        case "0":
        data = data.filter(function(d){return d.id === "11"})
          break;
        case "1":
        data = data.filter(function(d){return d.id === "15"})
          break;
        case "2":
        data = data.filter(function(d){return d.id === "21"})
          break;
        case "3":
        data = data.filter(function(d){return d.id === "24"})
          break;
        case "4":
        data = data.filter(function(d){return d.id === "31"})
          break;
        case "5":
        data = data.filter(function(d){return d.id === "44"})
          break;
        case "6":
        data = data.filter(function(d){return d.id === "46"})
          break;
        case "7":
        data = data.filter(function(d){return d.id === "51"})
          break;
        case "8":
        data = data.filter(function(d){return d.id === "53"})
          break;
        case "9":
        data = data.filter(function(d){return d.id === "61"})
          break;
        case "10":
        data = data.filter(function(d){return d.id === "65"})
          break;
  };


    //Si une seule année
    let uneAnnee = false;

    //Si une seule année

    if (d3.mean(data, function(d){return d.value0})==0){
      uneAnnee = true;
    } else {
      uneAnnee = false;
      }

    //Condition une seule année
    uneAnnee ?
      document.getElementById("boutonbarometre0").style.display="none":
      document.getElementById("boutonbarometre1").style.display="flex"


    //Ajout du popup sur fleche - événement souris
    svgBarometre.select(".fleche_valeur")
      .on("mousemove",function(d){

        popup
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 80 + "px")
          .style("display", "inline-block")
          .style("text-align", "left")


        //Condition si une seule année
        uneAnnee ?
        popup
          .data(data)
          .html(function(d){return `<div><span> ${(d.year1)} </span> : ${(d.value1)} ${choixUnite}</div>`}):
        popup
          .data(data)
          .html(function(d){return `<div><span> ${(d.year0)} </span> : ${(d.value0)} ${choixUnite}</div>
                                  <div><span> ${(d.year1)} </span> : ${(d.value1)} ${choixUnite}</div>`})

        d3.select(".mon_popup_barometre>div:last-child")
          .style("color",maCouleurHisto)

      })
      .on("mouseout", function(d){
        popup.style("display", "none");
      });


      //Bouton Ajout année
      d3.select("#boutonbarometre0>span")
          .data(data)
          .html(function(d){return d.year0})
      d3.select("#boutonbarometre1>span")
          .data(data)
          .html(function(d){return d.year1})


      //Bonton0 - événement click
      d3.select("#boutonbarometre0")
      .on("click",function(d){

        svgBarometre.select(".fleche_valeur")
          .transition()
            .duration(1000)
            .attrTween("d", pathTween(d0, 2))
            .style("fill","#b1b1b1")

        svgBarometre.select(".rond_valeur")
            .transition()
            .duration(1000)
            .attr("cx",coord[0])
            .attr("cy",coord[1])
            .attr("r","1.71")
            .style("fill","#b2b2b2")
      })



      //Bonton1 - événement clic
      d3.select("#boutonbarometre1")
      .on("click",function(d){

        svgBarometre.select(".fleche_valeur")
          .transition()
            .duration(1000)
            .attrTween("d", pathTween(d1, 2))
            .style("fill",maCouleurHisto)

        svgBarometre.select(".rond_valeur")
            .transition()
            .duration(1000)
            .attr("cx",coord[2])
            .attr("cy",coord[3])
            .style("fill",maCouleurHisto)
      })


      //Ajout animation fleche_valeur et rond_valeur


      svgBarometre.select(".fleche_valeur")
        .transition()
          .duration(1500)
          .attrTween("d", pathTween(d0, 2))
          .style("fill","#b1b1b1")
        .transition()
          .duration(1500)
          .attrTween("d", pathTween(d1, 2))
          .style("fill",maCouleurHisto)

      svgBarometre.select(".rond_valeur")
        .transition()
          .duration(1500)
          .attr("cx",coord[0])
          .attr("cy",coord[1])
          .attr("r","1.71")
          .style("fill","#b2b2b2")
        .transition()
          .duration(1500)
          .attr("cx",coord[2])
          .attr("cy",coord[3])
          .style("fill",maCouleurHisto)




  }); //d3 data


  d3.select("#boutonbarometre1")
    .style("background-color",maCouleurHisto)




} //fonction afficherBarometre
