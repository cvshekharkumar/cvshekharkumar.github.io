var	base_url = "";
$(document).ready(() => {
	base_url = $("body").attr('data-host');
	$(".login_form").submit(function (event) {
		form = $(this).attr('id');
		event.preventDefault();
		formData = $(this).serialize();
		console.log(formData);
		// csrf = $('input[name="csrfmiddlewaretoken"]').val();
		// console.log(csrf);
		// $.ajaxSetup({
		//     beforeSend: function(xhr, settings) {
		//         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		//             xhr.setRequestHeader("X-CSRFToken", csrf);
		//         }
		//     }
		// });
		$.ajax({                                                                                                                           
		    type:"POST",                                                                                                                    
		    url: "/login/",
		    data: formData,

		    beforeSend: function() {
		    	console.log(form);
		    	$("#"+form+'_loader').show();
		    	$("#"+form+'_btn').attr('disabled', true);
		    },                                                                               
		    success: function(response){ 
		        console.log(response);
		        $("#"+form+'_loader').hide();
		        $("#"+form+'_btn').attr('disabled', false);
		        $("#"+form+'_error_area').hide();

		        if(response.status == "OK") {

		        	console.log("success");
		        	window.location.href = base_url+form.replace('_login', '')+"/dashboard";
		        }                                                                                                  
		    }, 
		    error: function(response) {

		        var error = response.responseJSON;
		        if(response.status == 422){
		            var error_msg = error.errors;
		            for(err in error_msg){
		                // console.log(error_msg[err]);
						showError("#"+form+'_error_area', error_msg[err]);
		                break;
		            }
		        }else{
					showError("#"+form+'_error_area', error.message);
		        }
		        $("#"+form+'_loader').hide();
		        $("#"+form+'_btn').attr('disabled', false);
		    }                                                                                                                            
		});
	})
});

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


function showError(area, error) {
	console.log(area);
	var html = '<div class="alert alert-danger alert-dismissible">'+
			     '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
			     '<strong>Danger! </strong><span>'+error+'</span>'+
			    '</div>';
	$(area).html(html);
	$(area).show();
	toastr.error(error);
}