$(document).on("pagecreate","#pageone",function(){


  $.mobile.loading( "hide" );
  $.mobile.loading().hide();

  var counter = 0
  var first = '.tatlilar'
  var max = 0


  $.list = function(filter){
      $(".menu-restaurant").fadeOut();
     setTimeout(function() {
        $(filter).slideDown();
      }, 300);
    }



  $.max = function(){

    const denem  = $('#qrmenu').find('.kategori')

    denem.each(function(data){
     max++
    })
    max--
  }


  $.topscrol = function(){
    $('body, html').animate({
      scrollTop: 0
    }, 1);
  }


    $.max()
    $.list(first)



  


  $('ul li a').click(function(){

    

    const selected = $(this).data("filter")
    const denem  = $('#qrmenu').find('.kategori')


    denem.each(function(data){

      var search = denem[data]
      var findFilter = $(search).data('filter')

      if(findFilter === selected){
        counter=data
        $('#qrmenu').animate({
          scrollLeft: `+=${$(search).position().left-13
          }`
        });
      }
    })

    $.list(selected)

    setTimeout(function(){
    $('#openmodal').modal('hide');
     }, 400);

     $.topscrol()

  });



          
  
  $("#pageone").on("swipeleft",function(){

   

    if(counter!=max){
      counter++

      const den = $('ul li').children()[counter];  



      if(typeof JSON.stringify(den) != 'undefined'){
  
        const lft = ($(den).offset().left)-13
  
        $('#qrmenu').animate({
          scrollLeft: `+=${lft}`
        });
    
  
        $.topscrol()
        $.list($(den).data('filter'))
      }
  

    }

   
  });  





  $("#pageone").on("swiperight",function(){


    if(counter!=0){
    counter--
    const den = $('ul li').children()[counter];

    const lft = $(den).position().left-13
    $('#qrmenu').animate({
      scrollLeft: `+=${lft}`
    });

    $.topscrol()
    $.list($(den).data('filter'))
    }

  }); 



  $('#allcategory').click(function(){
    $('#openmodal').modal('show');
  })


  $('#ktb').click(function(){
    $('#openmodal').modal('hide');
  })




});

  