// initialize the validator function
// validator.message['date'] = 'not a real date';

// validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':

var initForm = function(param_url){
  $('#send').click('submit').prop('disabled', false);	
  $('form')
    .on('blur', 'input[required], input.optional, select.required', validator.checkField)
    .on('change', 'select.required', validator.checkField)
    .on('keypress', 'input[required][pattern]', validator.keypress);
  $('.multi.required')
    .on('keyup blur', 'input', function() {
      validator.checkField.apply($(this).siblings().last()[0]);
  });


  $('form').submit(function(e) {
    e.preventDefault();
    var submit = true;
   // evaluate the form using generic validaing
    if (!validator.checkAll($(this))) {
      submit = false;
    }
    if (submit){
      var url = param_url;
      var redirectUrl = 'post-page.html';
      var jqxhr = $.post(url, $('form').serialize(), function(data) {
        console.log("Success! Data: " + data.statusText);
        $(location).attr('href',redirectUrl); 
        })
        .fail(function(data) {
        console.warn("Error! Data: " + data.statusText);
        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
          $(location).attr('href',redirectUrl);                
        }
      });       
    }
  });

  $('#vfields').change(function() {
    $('form').toggleClass('mode2');
  }).prop('checked', false);
  
  $('#alerts').change(function() {
    validator.defaults.alerts = (this.checked) ? false : true;
    if (this.checked)
  	  $('form .alert').remove();
  }).prop('checked', false);

};



// $('#send').click('submit').prop('disabled', true);


		/* FOR DEMO ONLY */

