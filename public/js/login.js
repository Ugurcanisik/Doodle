$(document).ready(function(){



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
  
  
      $.success= function(redirect){
        setTimeout(function(){
         window.location.href = redirect
         }, 2000);
      }
      

    
 
  
    
    });