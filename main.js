$(document).ready(function(){


    /*$('.year').each(function(){
       //prendo il div associato a questa iterazione
       var thisYear = $(this);
       //2018-04-19 11:32:00
       var now = moment();
       var year = $(this).attr('id');
       var month = now.format('M');
       var day = now.format('D');
       var date = moment(year + '-' + month + '-' + day);
    });
     console.log(now);*/
     //var now=moment();


     $(document).on('click', $('#btn'), function(){
          var month = $('#months').children('.mese:selected').val();

          var year = $('#years').children('.year:selected').val();
          //var now=moment(year, month);



          var country = $('#countries').val();
          var numdays=moment('year-month', "YYYY-MM").daysInMonth();
          console.log("numdays", numdays);

      $.ajax({
          url: 'https://holidayapi.com/v1/holidays',
          method: 'GET',
          data: {
              key: '2c6965c6-0570-42d7-b76a-8e54095558ef',
              country: country,
              month: month,
              year: year
          },
          success:function(data){
            for (var i = 0; i < 30; i++) {
              $('.container').append("<p>"+i+$('#months').children('.mese:selected').text()+"</p>");

            }

              //alert('ciao');


          },
          error:function(){

              alert("errore");
          }




        });





     });




});
