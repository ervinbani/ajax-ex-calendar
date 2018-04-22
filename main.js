
$(document).ready(function(){

      //click sul bottone cerca
     $(document).on('click', $('#btn'), function(){
       $('.btndivs').show();
       var month = $('#months').children('.mese:selected').val();
       var correntmonth=$('#months').children('.mese:selected').attr('id');
       console.log("correntmonth", correntmonth);
       var year = $('#years').children('.year:selected').val();
       //var now=moment(year, month);

       var country = $('#countries').val();
       var numdays=moment(year + '-' + correntmonth).daysInMonth();


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
            $('.container').children('.monthContainer').children('p').remove();
            console.log("numdays", numdays);
            for (var i = 1; i < (numdays+1); i++) {
                $('.container').children('.monthContainer').append("<p id="+i+">"+i+" "+ $('#months').children('.mese:selected').text()+"</p>");
            }
              console.log(data);
              arrHoliday=[];
              namesHoliday=[];
              /*for (var i = 1; i < (numdays+1); i++) {
                  $('.container').children('.monthContainer').childrens('p').text(i+" "+ $('#months').children('.mese:selected').text());
              }*/
              for(var j = 0; j < data.holidays.length; j++){
                  var dateOfHoliday = moment(data.holidays[j]['date']);
                  arrHoliday.push(dateOfHoliday.format('D MMMM'));
                  namesHoliday.push(nameOfHoliday)
                  var nameOfHoliday = data.holidays[j]['name'];
                  thisDay=$('.monthContainer').children('p');
                  thisDay.each(function(){
                      correntDay=$(this);

                      if(arrHoliday.includes(correntDay.text())){
                          correntDay.addClass('colorRed');
                          //correntDay.text(correntDay.text());
                      }
                  });

              }
              console.log("arrHoliday", arrHoliday);
              console.log("namesHoliday", namesHoliday);


              for (var i = 0; i < data.holidays.length; i++) {
                  $('.container').children('.monthContainer').append(data.holidays[i]['date']);
              }



          },
          error:function(){

              alert("errore");
          }




        });
        //ciclo per fare funzionare il pulsante avanti
      /*  $(document).on('click', $('btn3'), function(){

              $.ajax({
                  url: 'https://holidayapi.com/v1/holidays',
                  method: 'GET',
                  data: {
                      key: '2c6965c6-0570-42d7-b76a-8e54095558ef',
                      country: country,
                      month: month+1,
                      year: year
                  },
                  success:function(data){
                      console.log(data);

                      for (var i = 1; i < (numdays+1); i++) {
                          //$('.container').children('.monthContainer').append("<p id="+i+">"+i+""+ $('#months').children('.mese:selected').text()+"</p>");
                          var thismoment=moment(year+'-'+'0'+month +'-'+'0'+i);
                          console.log("thismoment", thismoment);
                     }
                          arrHoliday=[];
                          for(var j = 0; j < data.holidays.length; j++){
                              var dateOfHoliday = moment(data.holidays[j]['date']);
                              arrHoliday.push(dateOfHoliday.format('D MMMM'));
                              console.log("arrHoliday", arrHoliday);

                              thisDay=$('.monthContainer').children('p');
                              thisDay.each(function(){
                                  correntDay=$(this);
                                  if(arrHoliday.includes(thisDay.text())){
                                      thisDay.css('color', 'red');
                                  }
                              });

                          }




                      for (var i = 0; i < data.holidays.length; i++) {


                                          $('.container').children('.monthContainer').append(data.holidays[i]['date']);


                                      }


                  },
                  error:function(){

                      alert("errore");
                  }




                });



        });*/





     });




});
/*for(var j = 0; j < data.holidays.length; j++){

    if(data.holidays[j].date==(year+'-'+month+'-'+i)){
          $('.container').children('.monthContainer').children().attr('i').addClass('colorRed')
    }
}


}*/
