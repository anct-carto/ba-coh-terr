let afficherZau = (cheminData) =>{

//Création des marges externes du graphique
let margin = {top: 200, right: 20, bottom: 100, left: 20}
//Création des dimensions internes du graphique
let width =  600 - margin.left - margin.right
let height =  550 - margin.top - margin.bottom;


//Sélection de l'élément html
let svgZau = d3.select(".zau")
    .attr("width","100%")
    .attr("preserveAspectRatio","xMidYMid meet")
    .attr("viewBox","0 0 600 550");

//Création de l'élément g crée dans l'élément svg, centre les éléments
let g1 = svgZau.append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

//Chargement des données
d3.csv(cheminData).then(function(data) {
  console.log(data);
;

//Coerce numérique
data.forEach(function(d) {
  d.value0 = +d.value0;
  d.value1 = +d.value1;
});


//Format fr
let fr_FR = {
  "decimal":",",
  "thousands": "\u2009",
  "grouping":[3]
}

d3.formatDefaultLocale(fr_FR);

var format = d3.format(",");

//Création des échelles x et y
let x = d3.scaleBand();
let y = d3.scaleLinear();

//Mise à l'échelle de la plage de données et attribution de l'axe
let ymin = Math.min(d3.min(data, function(d){return d.value0}),d3.min(data, function(d){return d.value1}));
let ymax = Math.max(d3.max(data, function(d){return d.value0}),d3.max(data, function (d){return d.value1}));

//y commence à 0 si valeur positive
if(ymin>0){
  ymin = 0;
}


x.domain(data.map(function(d){return d.codzau;}))
.rangeRound([0, width])
.padding(0.1);

y.domain(d3.extent([ymin,ymax])).nice()
 .rangeRound([height, 0]);

 //Ajout de l'axe x
 g1.append("g")
     .attr("class", "axis x_axis")
     .attr("transform",`translate(0,${height})`)
     .call(d3.axisBottom(x));

 //Ajout de l'axe y
 g1.append("g")
     .attr("class", "axis y_axis")
     .attr("transform",`translate(10,0)`)
     .call(d3.axisLeft(y))




     //Ajout de la barre 1
     g1.selectAll(".bar1zau")
       .data(data)
       .enter().append("rect")
         .attr("class", "bar bar1zau")
         .attr("x", function(d) { return x(d.codzau) ; })
         .attr("width", x.bandwidth())
         .attr("y", function (d) {
           if (d.value1 >0){
           return y(d.value1);
         } else {
           return y(0);
         }
         })

         .attr("height",function(d){return Math.abs(y(d.value1) - y(0)); })
         .attr("fill",function(d){
            if (d.codzau === "111"){
              return colorZau[0]
            } else if (d.codzau === "112") {
              return colorZau[1]
            } else if (d.codzau === "120") {
              return colorZau[2]
            } else if (d.codzau === "211") {
              return colorZau[3]
            } else if (d.codzau === "212") {
              return colorZau[4]
            } else if (d.codzau === "221") {
              return colorZau[5]
            } else if (d.codzau === "222") {
              return colorZau[6]
            } else if (d.codzau === "300") {
              return colorZau[7]
            } else if (d.codzau === "400") {
              return colorZau[8]
            }
        })


       //Ajout de la barre 0
       g1.selectAll(".bar0zau")
         .data(data)
         .enter().append("rect")
           .attr("class", "bar bar0zau")
           .attr("x", function(d) { return x(d.codzau) + 10; })
           .attr("width", x.bandwidth() - 20)
           .attr("y", function (d) {
             if (d.value0 >0){
             return y(d.value0);
           } else {
             return y(0);
           }
           })
           .attr("height",function(d){return Math.abs(y(d.value0) - y(0)); });


       //Ajout texture pour year0
       let texture2 = textures.lines()
         .thicker()
         .stroke("#404040");
       svgZau.call(texture2);
       g1.selectAll(".bar0zau")
         .style("fill", texture2.url())
         .style("opacity", 0.6);

       //Création de la div pour le popup
       let popup = d3.select("body").append("div")
         .attr("class", "mon_popup_zau");


        //Création de la Légende
        let legend = svgZau.selectAll("g.legend_zau")
          .data(colorZau)
          .enter()
          .append("g")
          .attr("class","legend_zau")

        legend
          .append("rect")
          .attr("x", 30)
          .attr("y", function(d, i) {
              return 0 + i * 20;
           })
           .attr("width", 20)
           .attr("height", 10)
           .style("stroke", "black")
           .style("stroke-width", 0.1)
           .style("fill", function(d){return d;});


       /*Légende zau*/
       const valeurZau = ["111 : Grands pôles", "112 : Couronnes de grands pôles", "120 : Communes multipolarisées des grandes aires urbaines",
       "211 : Pôles moyens", "212 : Couronnes des pôles moyens","221 : Petits pôles","222 : Couronnes des petits pôles",
       "300 : Autres communes multipolarisées", "400 : Communes isolées, hors influence des pôles"];

       svgZau.selectAll("g.legend_zau")
        .exit()
        .data(valeurZau)
        .enter()
        .append('text')
        .attr("x", 55) //leave 5 pixel space after the <rect>
        .attr("y", function(d, i) {
          return 0 + i * 20;
        })
        .attr("dy", "0.8em") //place text one line *below* the x,y point
        .style("font-family","latomedium")
        .style("font-size","0.8em")
        .text(function(d){ return d})


        //Ajout du popup
        g1.selectAll(".bar")
        .on("mousemove", function(d){

              popup
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 80 + "px")
                .style("display", "inline-block")
                .style("text-align", "left")
                d3.select(this).style("cursor","crosshair");


            popup
              .html(`<div>${(d.libzau)}</div>
                     <div><span> ${(d.year0)} </span> : ${format(d.value0)} ${choixUnite} </div>
                     <div><span> ${(d.year1)} </span> : ${format(d.value1)} ${choixUnite}</div>`)
        })
        .on("mouseout", function(d){
           popup
             .style("display", "none");
           d3.select(this).style("cursor","none");
           });


         //Bouton Ajout année
         d3.select("#boutonzau0>span")
             .data(data)
             .html(function(d){return d.year0})
         d3.select("#boutonzau1>span")
             .data(data)
             .html(function(d){return d.year1})


         //Bouton tri selon year0
         d3.select("#boutonzau0")
         .on("click",function(d){

         //Style bouton
         d3.select("#boutonzau0")
           .style("padding","0.5em 1.3em 1.3em 1.3em")
         d3.select("#boutonzau1")
           .style("padding","0.2em 0.3em 0.3em 0.3em")

           data.sort(function(a,b){
               return d3.descending(a.value0,b.value0);
             })
             x.domain(data.map(function(d){
               return d.codzau;
             }));
               g1.selectAll(".bar0zau")
               .transition()
               .duration(500)
               .attr("x",function(d,i){ return x(d.codzau)+10; })
               g1.select(".x_axis")
               .transition()
               .duration(500)
               .call(d3.axisBottom(x))
               g1.selectAll(".bar1zau")
               .transition()
               .duration(500)
               .attr("x",function(d,i){ return x(d.codzau); })
           });


         //Bouton tri selon year1
         d3.select("#boutonzau1")
         .on("click",function(d){

         //Style bouton
         d3.select("#boutonzau1")
           .style("padding","0.5em 1.3em 1.3em 1.3em")
         d3.select("#boutonzau0")
           .style("padding","0.2em 0.3em 0.3em 0.3em")


           data.sort(function(a,b){
               return d3.descending(a.value1,b.value1);
             })
             x.domain(data.map(function(d){
               return d.codzau;
             }));
               g1.selectAll(".bar0zau")
               .transition()
               .duration(500)
               .attr("x",function(d,i){ return x(d.codzau)+10; })
               g1.select(".x_axis")
               .transition()
               .duration(500)
               .call(d3.axisBottom(x))
               g1.selectAll(".bar1zau")
               .transition()
               .duration(500)
               .attr("x",function(d,i){ return x(d.codzau); })
           });



         //Style bouton1
         d3.select("#boutonzau1")
             .style("background-color", maCouleurHisto)

/*
         //Ajout de l'animation barre0
         g1.selectAll(".bar0")
         .transition()
         .duration(1000)
         .delay(function(d,i){return i*100})
         .attr("height", function (d) {
           return d.value0;
       })

         //Ajout de l'animation barre1
         g1.selectAll(".bar1")
         .transition()
         .duration(800)
         .delay(function(d,i){return i*100})
         .attr("height", function (d) {
           return d.value1;
       })


*/




}); //d3 data



} //fonction afficher zau
