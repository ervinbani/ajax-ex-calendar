
$(document).ready(function(){

      //click sul bottone cerca
     $(document).on('click', '#btn', function(){
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
            $('.container').children('.monthContainer').children('.cell').remove();

            console.log("numdays", numdays);
            var dayOfWeek=[];
            for (var i = 1; i < (numdays+1); i++) {
                //if(i<10){
                    //var giorno=moment(year+'-'+month+'-'+'0'+i);
                    //var giornosett=giorno.format('dddd');
                    //dayOfWeek.push(giornosett);
                //}
                //else{
                  var giorno=moment(year+'-'+month+'-'+i);
                  var giornosett=giorno.format('dddd');
                  dayOfWeek.push(giornosett);
                //}


                $('.container').children('.monthContainer').append("<div class=cell id="+i+" >"+'<p>'+i+" "+ $('#months').children('.mese:selected').text()+'</p>'+'<br>'+dayOfWeek[i-1]+"</div>");
            }
              console.log(data);
              arrHoliday=[];
              namesHoliday=[];
              var c=0;


              for(var j = 0; j < data.holidays.length; j++){

                  var dateOfHoliday = moment(data.holidays[j]['date']);
                  arrHoliday.push(dateOfHoliday.format('D MMMM'));
                  namesHoliday.push(nameOfHoliday)
                  var nameOfHoliday = data.holidays[j]['name'];
                    }
                  thisDay=$('.monthContainer').children('.cell').children('p');

                  thisDay.each(function(){
                      correntDay=$(this);

                    for(var i=0;i<arrHoliday.length;i++){

                        if(arrHoliday.includes(correntDay.text())){
                            correntDay.parent().addClass('colorRed');
                          

                            //correntDay.text(correntDay.text());
                        }
                      }
                  });


              console.log("arrHoliday", arrHoliday);
              console.log("namesHoliday", namesHoliday);
              console.log('selettore', $('.mese:selected').val());
              //ISTRUZIONI PER ATTIVARE IL BOTTONE AVANTI
              /*$(document).on('click', $('#btn3'), function(){
                  $('.container').children('.monthContainer').children('.cell').remove();
                  //month=month+1;
                  month=month+1;

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
                        $('.container').children('.monthContainer').children('.cell').remove();

                        console.log("numdays", numdays);
                        for (var i = 1; i < (numdays+1); i++) {
                            $('.container').children('.monthContainer').append("<p id="+i+">"+i+" "+ $('#months').children('.mese:selected::after').text()+"</p>");
                        }
                          console.log(data);
                          arrHoliday=[];
                          namesHoliday=[];
                          /*for (var i = 1; i < (numdays+1); i++) {
                              $('.container').children('.monthContainer').childrens('p').text(i+" "+ $('#months').children('.mese:selected').text());
                          }
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
                                  }
                              });

                          }

                      },//fine secondo success
                      error:function(){

                          alert("errore");
                      }


                    });//fine secondo ajax

        });///fine click btn3*/






      },//finisce il primo success
      error:function(){

          alert("errore");
      }
    });//qui finisce il prim ajax
  });
});
