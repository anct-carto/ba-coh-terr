

//Création des marges externes du graphique
let margin = {top: 20, right: 20, bottom: 20, left: 20}
//Création des dimensions internes du graphique
let width =  600 - margin.left - margin.right
let height =  350 - margin.top - margin.bottom;


//Sélection de l'élément html
let svgZau = d3.select(".zau")
    .attr("width","100%")
    .attr("preserveAspectRatio","xMidYMid meet")
    .attr("viewBox","0 0 600 550");

//Création de l'élément g crée dans l'élément svg, centre les éléments
let g1 = svgZau.append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

//Chargement des données
d3.csv("data/csv/zau_1_5.csv").then(function(data) {
  console.log(data);
;

//Coerce numérique
data.forEach(function(d) {
  d.value0 = +d.value0;
  d.value1 = +d.value1;
});

//Création des échelles x et y
let x = d3.scaleBand();
let y = d3.scaleLinear();

//Mise à l'échelle de la plage de données et attribution de l'axe
let ymin = Math.min(d3.min(data, function(d){return d.value0}),d3.min(data, function(d){return d.value1}));
let ymax = Math.max(d3.max(data, function(d){return d.value0}),d3.max(data, function (d){return d.value1}));

x.domain(data.map(function(d){return d.codzau;}))
.rangeRound([0, width])
.padding(0.1);

y.domain(d3.extent([ymin,ymax])).nice()
 .rangeRound([0, height]);

 //Ajout de l'axe x
 g1.append("g")
     .attr("class", "axis x_axis")

     .call(d3.axisBottom(x));

 //Ajout de l'axe y
 g1.append("g")
     .attr("class", "axis y_axis")
     .attr("transform",`translate(0,${height})`)
     .call(d3.axisLeft(y))


     //Ajout de la barre 0
     g1.selectAll(".bar0")
       .data(data)
       .enter().append("rect")
         .attr("class", "bar bar0")
         .attr("y", function (d) {
         return y(Math.min(0, d.value0));
     })
         .attr("x", function(d) { return x(d.codzau) + 10; })
         .attr("height", 0)
         .attr("width", x.bandwidth() - 20);

     //Ajout de la barre 1
     g1.selectAll(".bar1")
       .data(data)
       .enter().append("rect")
         .attr("class", "bar bar1")
         .attr("y", function (d) {
         return y(Math.min(0, d.value1));
     })
         .attr("x", function(d) { return x(d.codzau); })
         .attr("height", 0)
         .attr("width", x.bandwidth());


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







}); //d3 data
