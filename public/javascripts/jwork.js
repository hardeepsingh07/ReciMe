 $(function () {
  
   $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=world-population-density.json&callback=?', function (data) {

       // Initiate the chart
       $('#container').highcharts('Map', {

        title : {
          text : 'ReciMe'
        },

        mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true
        },

        colorAxis: {
          stops: [
          [0, 'rgba(154,255,204,0.37)'],
          [0.25, 'rgba(128,255,192,0.37)'],
          [0.5, 'rgba(103, 255, 179, 0.37)'],
          [0.75, 'rgba(52, 255, 153, 0.37)'],
          [1, 'rgba(0, 255, 128, 0.37)'],
          ],
          min: 0,
          max: 1000
        },

        chart: {  
         plotBackgroundImage:'http://www.ucreative.com/wp-content/uploads/2014/10/Food-photography-eastern-europe-city-illustrations-banner1.jpg'
       },


       plotOptions: {
         series: {
           borderColor: '#000000 ',
           borderWidth: '1.5'
         }
       },

       series : [{
         data : data,
         mapData: Highcharts.maps['custom/world'],
         joinBy: ['iso-a2', 'code'],
         name: 'Population density',
         states: {
           hover: {
             color: '#0f770b '
           }
         },
         tooltip: {
           pointFormat: '{point.name}'
         },
         events: {
           click: function (e) {
            var text = e.point.name;
            var url = "/recipes?country=" + text;
            $.get(url, function(data, status){
              alert("Data: " + data + "\nStatus: " + status);
            });

          },
        }
      }]
    });
});
});