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
}
