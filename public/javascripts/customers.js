$(document).ready(function(){

  $('#addcustomer').on('click', function(){
    var customer = {
      name: $('#name').val(),
      phone: $('#phone').val()
    };


    $.post({
      url: '/customers/addCustomer',
      type: 'post',
      dataType: 'json',
      success: function(data) {
          if(data.statut == "OK" ){
            var row = '<tr><td>' + $('#name').val() + '</td><td>' + $('#phone').val() + '</td></tr>';
            $('#custlist table tbody').append(row);
            $('#name').val("");
            $('#phone').val("");
            $('#errmsg').empty();
          } else {
            $('#errmsg').empty().append(data.errmsg);
          }
      },
      data: customer
    });
  });

});
