

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
            if((0<month)&&(month<13)){//controllo se il numero del mese sia fra 1e 12
                newmonth();
            }
            else if(month>12){//se il numero del mese e' maggiore di 12, setto il val month=1
                month=1;
                year=parseInt(year)+1;//e il valore dell'anno aumenta di 1 per passare da dic a gennaio
                newmonth();
            }
        });
        //attivo il pulsante per andare nei mesi preccedeti
        $('#btn2').click(function(){
            month=parseInt(month)-1;
            if((1<month)&&(month<13)){//se il month ha un num fra 1 e 12, genero il mese precceddente
                newmonth();
            }
            else if(month<1){//se month-1 ha un val<1, setto month=12, e decremento di 1 il vall di year
                month=12;
                year=parseInt(year)-1;//decremento di 1 il vall di year per passare a dicembre dell'anno precedente
                newmonth();
            }
        });

  });
  //Funzione che genera un mese al click
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
