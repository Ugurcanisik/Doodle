$(document).ready(function(){



  $(window).load(function(){
    $.swit()
  })


$.swit= function(){
  setTimeout(function(){

    const swt = document.querySelectorAll('.isActive')
    swt.forEach(function(html) {
       new Switchery(html, {
        color: '#26B99A',
         size: 'large'
      });
    });

   }, 400);
}


  
    $.alerts = function(type,message){
  
        let a;
        switch(type){
    
          case 'success': 
    
          iziToast.success({
            title: 'Ok',
            message: message,
            position:'topCenter' 
           });
    
          break;
          case 'error': 
          iziToast.error({
          title: 'type error',
          message: message,
          position:'topCenter' 
         });
     
          break;
          case 'warning': 
          iziToast.warning({
            title: 'A',
            message: message,
            position:'topCenter' 
           });
          break;
          default:
          break
        }
    }



    $.errorMessage = function(message){


      $.each(message, function(key, value) {
        if(key=='responseJSON'){
          $.each(value, function(key,value){
            if(typeof value == 'object'){
            $.each(value, function(key, value){      
              $.alerts('error',value['message'])
            })
            }else{
              $.alerts('error',value)
            }
          })
        }
       });
    }
  
  
  
  
      $('#data-table').on("change", ".isActive", function(){
  
        const dataurl = $(this).data('url')
        const data = $(this).prop("checked");
        const id = $(this).data('id')
        $.post(dataurl, {data: data, id: id} , function(err, result){
          // alert(result)
         });
    });





    $(document).on("sortupdate", ".sortable", function(event, ui){ 


      const data = $(this).sortable("toArray");
      const data_url = $(this).data("url");


      $.ajax({
          type:'POST',
          url:data_url,
          data:{data: data},
          success :function(veri){
          }
      })
      .fail((err)=>{
          alert(JSON.stringify(err))
      })


   });







  
 
  
  
  
  
  });