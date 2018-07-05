
let afficherHistogramme = (cheminData, couleurHisto) =>{

  //Si une seule année
  let uneAnnee = false;

  //Création des marges externes du graphique
  let margin = {top: 20, right: 20, bottom: 20, left: 150}
  //Création des dimensions internes du graphique
  let width =  600 - margin.left - margin.right
  let height =  550 - margin.top - margin.bottom;


  //Sélection de l'élément html
  let svgHisto = d3.select(".histogramme")
      .attr("width","100%")
      .attr("preserveAspectRatio","xMidYMid meet")
      .attr("viewBox","0 0 600 550");

  //Création de l'élément g crée dans l'élément svg, centre les éléments
  let g1 = svgHisto.append("g")
      .attr("transform",`translate(${margin.left}, ${margin.top})`);

  //Chargement des données
  d3.csv(cheminData).then(function(data) {
    console.log(data);

  //Si une seule année
  if (d3.mean(data, function(d){return d.value0})==0){
    uneAnnee = true;
  } else {
    uneAnnee = false;
    }

    //Condition une seule année
    uneAnnee ?
      document.getElementById("bouton0").style.display="none":
      document.getElementById("bouton0").style.display="flex"

    //Coerce numérique
    data.forEach(function(d) {
      d.value0 = +d.value0;
      d.value1 = +d.value1;
    });

    //Création des échelles x et y
    let x = d3.scaleLinear();
    let y = d3.scaleBand();

    //Mise à l'échelle de la plage de données et attribution de l'axe

    let xmin = Math.min(d3.min(data, function(d){return d.value0}),d3.min(data, function(d){return d.value1}));
    let xmax = Math.max(d3.max(data, function(d){return d.value0}),d3.max(data, function (d){return d.value1}));

    //x commence à 0 si valeur positive
    if(xmin>0){
      xmin = 0;
    }
    x.domain(d3.extent([xmin,xmax])).nice()
     .rangeRound([0, width]);



    y.domain(data.map(function(d) { return d.libreg; }))
     .rangeRound([0, height])
     .padding(0.1);

    //Ajout de l'axe x
    g1.append("g")
        .attr("class", "axis x_axis")
        .attr("transform",`translate(0,${height})`)
        .call(d3.axisBottom(x));

    //Ajout de l'axe y
    g1.append("g")
        .attr("class", "axis y_axis")
        .attr("transform",`translate(${x(0)},0)`)
        .call(d3.axisLeft(y))


    //Création de la div pour le popup
    let popup = d3.select("body").append("div")
      .attr("class", "mon_popup_histogramme");






    //Ajout de la barre 0
    g1.selectAll(".bar0")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar bar0")
        .attr("x", function (d) {
        return x(Math.min(0, d.value0));
    })
        .attr("y", function(d) { return y(d.libreg) + 10; })
        .attr("width", 0)
        .attr("height", y.bandwidth() - 20);

    //Ajout de la barre 1
    g1.selectAll(".bar1")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar bar1")
        .attr("x", function (d) {
        return x(Math.min(0, d.value1));
    })
        .attr("y", function(d) { return y(d.libreg); })
        .attr("width", 0)
        .attr("height", y.bandwidth());


      //Ajout de l'animation barre0
      g1.selectAll(".bar0")
      .transition()
      .duration(1000)
      .delay(function(d,i){return i*100})
      .attr("width", function (d) {
        return Math.abs(x(d.value0) - x(0));
    })

      //Ajout de l'animation barre1
      g1.selectAll(".bar1")
      .transition()
      .duration(800)
      .delay(function(d,i){return i*100})
      .attr("width", function (d) {
        return Math.abs(x(d.value1) - x(0));
    })

      //Ajout du popup
      g1.selectAll(".bar")
      .on("mousemove", function(d){

            popup
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 80 + "px")
              .style("display", "inline-block")
              .style("text-align", "left")

            //Condition si une seule année
            uneAnnee ?
            popup
              .html(`<div>${(d.libreg)}</div>
                     <div><span> ${(d.year1)} </span> : ${(d.value1)} ${choixUnite}</div>`):
            popup
              .html(`<div>${(d.libreg)}</div>
                     <div><span> ${(d.year0)} </span> : ${(d.value0)} ${choixUnite} </div>
                     <div><span> ${(d.year1)} </span> : ${(d.value1)} ${choixUnite}</div>`)


     //Couleur div texte popup


     d3.select(".mon_popup_histogramme>div:last-child")
       .style("color",couleurHisto)



        })
    	.on("mouseout", function(d){
        popup.style("display", "none");
      });



      //Courleur histo year1
      g1.selectAll(".bar1")
        .style("fill",couleurHisto)


      //Ajout texture pour year0
      let texture1 = textures.lines()
        .thicker()
        .stroke("#666666");
      svgHisto.call(texture1);
      g1.selectAll(".bar0")
        .style("fill", texture1.url())
        .style("opacity", 0.6);


      //Bouton tri selon year0
      d3.select("#bouton0")
      .on("click",function(d){
          data.sort(function(a,b){
              return d3.descending(a.value0,b.value0);
            })
            y.domain(data.map(function(d){
              return d.libreg;
            }));
              g1.selectAll(".bar0")
              .transition()
              .duration(500)
              .attr("y",function(d,i){ return y(d.libreg)+10; })
              g1.select(".y_axis")
              .transition()
              .duration(500)
              .call(d3.axisLeft(y))
              g1.selectAll(".bar1")
              .transition()
              .duration(500)
              .attr("y",function(d,i){ return y(d.libreg); })
          });


          //Bouton tri selon year1
          d3.select("#bouton1")
          .on("click",function(d){
              data.sort(function(a,b){
                  return d3.descending(a.value1,b.value1);
                })
                y.domain(data.map(function(d){
                  return d.libreg;
                }));
                  g1.selectAll(".bar0")
                  .transition()
                  .duration(500)
                  .attr("y",function(d,i){ return y(d.libreg)+10; })
                  g1.select(".y_axis")
                  .transition()
                  .duration(500)
                  .call(d3.axisLeft(y))
                  g1.selectAll(".bar1")
                  .transition()
                  .duration(500)
                  .attr("y",function(d,i){ return y(d.libreg); })
              });



      //Bouton Ajout année
      d3.select("#bouton0>span")
          .data(data)
          .html(function(d){return d.year0})
      d3.select("#bouton1>span")
          .data(data)
          .html(function(d){return d.year1})

        //Passage souris couleur histo bar1
        g1.selectAll(".bar1")
        .on("mouseover", function(){
          popup.style("opacity",1);
          d3.select(this)
            .style("fill", couleurHisto)
            .style("opacity",0.9)
			      .style("cursor","crosshair");
      });

        g1.selectAll(".bar1")
        .on("mouseout", function(){
          popup.style("opacity",0);
          d3.select(this)
            .style("fill", couleurHisto)
            .style("opacity",0.6)
			      .style("cursor","none");
      });

        //Passage souris couleur histo bar0
        g1.selectAll(".bar0")
        .on("mouseover", function(){
          popup.style("opacity",1);
          d3.select(this)
            .style("opacity",0.9)
			      .style("cursor","crosshair");
      });

        g1.selectAll(".bar0")
        .on("mouseout", function(){
          popup.style("opacity",0);
          d3.select(this)
            .style("opacity",0.6)
			      .style("cursor","none");
      });





  }); //d3 data

//Style bouton1
d3.select("#bouton1")
    .style("background-color", couleurHisto)


}; //fonction afficherHistogramme
