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
         name: 'Recipes',
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
              $("#list_group").html("");
              if(status = "SUCCESS") {
                $("#myModal").modal();
                $("#myModal h4").text("Recipes for " + text);
                if(data.length < 1){
                  var item = "<p>There are no recipes currently listed for this country, although you can add one <a id='modal_swap' href='#' onclick='modalSwap()'>here</a>!</p>";
                  $("#list_group").html(item);
                } else {
                    $.each(data, function(el, recipe){
                      if(!recipe.imageURL) {
                        recipe.imageURL = "/images/no_image.png";
                      }
                        var item = "";
                        item += "<div class='row'>";
                        item += "<div class='col-md-7'><a href='#'><img class='img-responsive' height='250px' width='250px' src='" + recipe.imageURL + "' alt></a></div>";
                        item += "<div class='col-md-5'><h3>" + recipe.name + "</h3><a class='btn btn-primary' href='#'>View Details<span> \></span></a></div>";
                        item += "</div><div style='clear:both'></div><hr>";
                        $(item).appendTo("#list_group");
                   });
                }
              }
            });
          },
        }
      }]
    });
});
});

 function addListItem(list) {
  var listItems = "";
  switch(list){
    case 'ingredients':
    listItems += "<div class='input-group'><input class='ingredients new-line-item form-control' placeholder='Ingredient'/>";
    listItems += "<span class='input-group-addon new-line-item'></span>";
    listItems += "<input class='quantity new-line-item form-control' placeholder='Amount'/></div>";
    break;
    case 'steps':
    listItems += "<input class='steps new-line-item form-control' placeholder='Add Step'/>";
    break;
  }
  $(listItems).appendTo('#' + list + '_list');
}
