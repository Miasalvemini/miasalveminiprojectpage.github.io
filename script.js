let API_key = "";
//if you have an API key, replace star in the following string with your key and uncomment the next line// 
//let API_key = "?registrationkey=*"//

let supersector = {
"00":	"Total nonfarm",
"05":	"Total private",
"06":	"Goods-producing",
"07":	"Service-providing",
"08":	"Private service-providing",
"10":	"Mining and logging",
"20":	"Construction",
"30":	"Manufacturing",
"31":	"Durable Goods",
"32":	"Nondurable Goods",
"40":	"Trade, transportation, and utilities",
"41":	"Wholesale trade",
"42":	"Retail trade",
"43":	"Transportation and warehousing",
"44":	"Utilities",
"50":	"Information",
"55":	"Financial activities",
"60":	"Professional and business services",
"65":	"Education and health services",
"70":	"Leisure and hospitality",
"80":	"Other services",
"90":	"Government"
}
let firstTime = 0;
    const labels =[];
//    console.log("labels");
//    console.log(labels);

// These are colors from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      black: 'rgb(0, 0, 0)',
      pink: 'rgb(233, 84, 215)',
      turquoise: 'rgb(50, 223, 221)',
      mustard: 'rgb(226, 194, 122)',
      dark_blue: 'rgb(0, 96, 116)',
      light_green: 'rgb(126, 175, 116)',
      dark_purple: 'rgb(126, 96, 116)',
      baby_blue: 'rgb(126, 175, 207)',
      light_orange: 'rgb(255, 181, 0)',
      peach: 'rgb(255, 181, 140)',
      lime: 'rgb(210, 209, 55)',
      auburn: 'rgb(210, 97, 9)',
      neon: 'rgb(210, 255, 14)',
      navy: 'rgb(50, 47, 94)'
    };
    
//    console.dir(CHART_COLORS);
let CHART_COLORS_array= Object.keys(CHART_COLORS);
    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      black: 'rgb(0, 0, 0, 0.5)',
      pink: 'rgb(233, 84, 215, 0.5)',
      turquoise: 'rgb(50, 223, 221, 0.5)',
      mustard: 'rgb(226, 194, 122, 0.5)',
      dark_blue: 'rgb(0, 96, 116, 0.5)',
      light_green: 'rgb(126, 175, 116, 0.5)',
      dark_purple: 'rgb(126, 96, 116, 0.5)',
      baby_blue: 'rgb(126, 175, 207, 0.5)',
      light_orange: 'rgb(255, 181, 0, 0.5)',
      peach: 'rgb(255, 181, 140, 0.5)',
      lime: 'rgb(210, 209, 55, 0.5)',
      auburn: 'rgb(210, 97, 9, 0.5)',
      neon: 'rgb(210, 255, 14, 0.5)',
      navy: 'rgb(50, 47, 94, 0.5)'
    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: labels,
      datasets: []
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);
function drawChart(){

    const myChart = new Chart(
      document.getElementById('myChart'),
        config);
//    console.dir(myChart);
//    console.log("Ending");

    }
function responseReceivedHandler() {
  if (this.status == 200) {
    console.log(this.response);
    let sectorLine = {
      label: 'Sample Label',
      data: [],
      borderColor: CHART_COLORS[CHART_COLORS_array[firstTime]],
      backgroundColor: CHART_COLORS_50_Percent[CHART_COLORS_array[firstTime]],
      hidden: true
    }
    console.log("here");
    console.log(this.response.Results);
    let seriesID= this.response.Results.series[0].seriesID;
    sectorLine.label = supersector[seriesID.substring(3,5)];
    let dataArray= this.response.Results.series[0].data;
    for (let i = dataArray.length - 1; i >= 0; i--) {
      if (firstTime ==0){
      labels.push(dataArray[i].periodName + "/" + dataArray[i].year);
    }
      sectorLine.data.push(dataArray[i].value);
    }
    firstTime = firstTime + 1;
    data.datasets.push(sectorLine);
    if (firstTime== Object.keys(supersector).length){
      drawChart ();
    }

console.log(this.response);
  } else {
console.log ("error");
  }
}

for (let sector in supersector) {
let xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.addEventListener("load", responseReceivedHandler);
let requestStart = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
let requestEnd = "00000001"+API_key;
xhr.open("GET", requestStart + sector + requestEnd);
console.log (requestStart + sector + requestEnd);
xhr.send();
}