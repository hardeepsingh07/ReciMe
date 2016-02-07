function submitForm() {
  var data = {};
  var name = $('#title').val();
  var country = $('#country').val();
  var ingredient = $('.ingredients');
  var ingredient_array = [];
  var amount = $('.quantity');
  var step = $('.steps');
  var step_array = [];
  var image = $('#image').val();
  var count = 0;
  $.each(ingredient, function(){
    ingredient_array.push({name: $(ingredient[count]).val(), quantity: $(amount[count]).val()});
    count++;
  });
  count = 0;
  $.each(step, function(){
    step_array.push($(step[count]).val());
    count++;
  });
  var data = {
    name: name,
    country: country,
    ingredients: ingredient_array,
    steps: step_array,
    timers: [0],
    imageURL: image,
    originalURL: image
  };
  console.log(data);

  var formValidated = true;
  $('#recipe_form').validator('validate');
  $('.form-group').each(function() {
    if($(this).hasClass('has-error')) {
      formValidated = false;
    }
  });

  if(formValidated) {
    $.ajax({
      type: "POST",
      url: "/recipes?country=" + country,
      data: data,
      success: function(e, a) {
        $('#add_recipe_modal').modal('toggle');
      },
      dataType: "json"
    });
  }
}

function resetForm() {
  $('#title').val("");
  $('#country').val("");
  $('.new-line-item').each(function() {
    $(this).remove();
  });
  $('#ingredients').val("");
  $('#quantity').val("");
  $('#step').val("");
  $('#image').val("");
  $('.has-error').each(function() {
    $(this).removeClass('has-error');
  });


  $('#countries').select2({
    ajax:{
      url: "/data/countries.json",
      dataType: "json",
      delay: 250,
      data: function(params) {
        console.log(params);
        return {
          q: params.term,
          page: params.page
        };
      },
      processResults: function(data, params) {
        params.page = params.page || 1;

        console.log(data);
        return {
          results: data,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true,
    },
    escapeMarkup: function(markup){ return markup; },
    placeholder: "Select a country",
    templateResult: formatCountry,
    templateSelection: formatCountryName,
    minimumResultsForSearch: Infinity
  });
}

function formatCountry(country) {
  var markup = "<div class='select2-result-country clearfix'><div class='select2-result-country__name'>" + country.name + "</div></div>";
  return markup;
}

function formatCountryName(country) {
  return country.name || "Select a country";
}

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
