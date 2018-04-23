

$(document).ready(function(){
  var month = $('#months').children('.mese:selected').val();
  var correntmonth=$('#months').children('.mese:selected').attr('id');
  console.log("correntmonth", correntmonth);
  var year = $('#years').children('.year:selected').val();

  var country = $('#countries').val();
  var numdays=moment(year + '-' + correntmonth).daysInMonth();
      //click sul bottone cerca
     $(document).on('click', '#btn', function(){
        $('.btndivs').show();
            newmonth();
        //pulsante che porta al mese successivo
        $('#btn3').click(function(){
            month=parseInt(month)+1;
            console.log('month', month);
            newmonth();
        });

        $('#btn2').click(function(){
            month=parseInt(month)-1;
            newmonth();

        });

  });
  //ISTRUZIONI PER ATTIVARE IL BOTTONE AVANTI
function newmonth(){
$.ajax({
    url: 'https://holidayapi.com/v1/holidays',
    method: 'GET',
    data: {
        key: '2c6965c6-0570-42d7-b76a-8e54095558ef',
        country: country,
        month: parseInt(month),
        year: year
    },
    success:function(data){
      $('.container').children('.monthContainer').children('.cell').remove();
      console.log("numdays", numdays);
      var dayOfWeek=[];
      for (var i = 1; i < (numdays+1); i++) {

            var giorno=moment(year+'-'+month+'-'+i);
            var giornosett=giorno.format('dddd');
            var nomeMese=giorno.format('MMMM');
            console.log('nome mese', nomeMese);
            dayOfWeek.push(giornosett);



          $('.container').children('.monthContainer').append("<div class=cell id="+i+" >"+'<p>'+i+" "+ nomeMese+'</p>'+'<br>'+dayOfWeek[i-1]+"</div>");
      }
        console.log(data);
        arrHoliday=[];
        namesHoliday=[];
        var c=0;
        for(var j = 0; j < data.holidays.length; j++){

            var dateOfHoliday = moment(data.holidays[j]['date']);
            arrHoliday.push(dateOfHoliday.format('D MMMM'));
            var nameOfHoliday = data.holidays[j]['name'];
            namesHoliday.push(nameOfHoliday);
              }
            thisDay=$('.monthContainer').children('.cell').children('p');

            thisDay.each(function(){
                correntDay=$(this);
                for(var i=0;i<arrHoliday.length;i++){
                  if(arrHoliday.includes(correntDay.text())){
                      correntDay.parent('.cell').addClass('colorRed');
                      correntDay.text(correntDay.text()+'-'+namesHoliday[c].toUpperCase());
                      c++;
                  }
                }
            });
},//finisce il primo success
error:function(){

    alert("errore");
  }
  });//qui finisce il prim ajax

}//fine della funzione

  });//fine dicument.ready
