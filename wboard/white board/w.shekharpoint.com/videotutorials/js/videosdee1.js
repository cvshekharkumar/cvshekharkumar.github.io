$(document).ready(function(){    
              
 // js for categories dropdown on header 
   $('.pdfCat').hover(function(e){
      e.stopPropagation();
      $('.pdfShow').show();
   });
   $(document).on('click', function(e) {
      $el = $(".pdfShow");
      if ($el.is(":visible")) {
         $el.hide();         
      }
   });
// end of js for categories dropdown on header 
});
function loginPopup() {   
    window.location.href = videobaseurl + '/login.php';
}

$(window).scroll(function() {     
   var scroll = $(window).scrollTop();
   if (scroll > 0) {
     $("#header").addClass("scroll-top");
   }
   else {
     $("#header").removeClass("scroll-top");
   }
});

$(document).ready(function () {
   
   //bookmark and unbookmark video lectures
    $('#video_play').on('click','.lecture_actions', function (e) {
        var vc = $('#vc').val();
        var vl = $('#vl').val();
        var vu = $('#vu').val();
        var vs = $('#vs').val();
        var flag = $(this).attr('data-flag');
        $(".wrap_loader").show();
        $.ajax({
            type: 'POST',
            url: videobaseurl + '/ajax/ajaxSetLectureActions.php',
            dataType: 'json',
            data: {'vc': vc, 'vl': vl, 'vu': vu, 'vs': vs, 'flag': flag},
            success: function (data) {
                if (data.flag == -99)
                {
                    $(".wrap_loader").hide();
                    window.location.href = videobaseurl + '/login.php';
                }
                if (data.flag == 1)
                {
                    $('.alert-success span').html(data.msg);
                    $(".wrap_loader").hide();
                    $('.alert-success').show();
                    setTimeout(function () {
                        $('.alert-success').hide();
                    }, 5000);
                    if (data.flag_n == 'N')
                    {
                        $("#toggle_cls").removeClass("tp-bookmark-active");
                        return true;
                    } else {
                        $("#toggle_cls").addClass("tp-bookmark-active");
                        return true;
                    }
                } else if (data.flag == 0)
                {
                    $(".wrap_loader").hide();
                    $('.alert-danger span').html(data.msg);
                    $('.alert-danger').show();
                    setTimeout(function () {
                        $('.alert-danger').hide();
                    }, 5000);
                    return false;
                }
            },
            error: function (data) {
                $(".wrap_loader").hide();
                console.log(data);
            }
        });
    });

    $('#video_play').on('click','#save_lecture_notes', function (e) {
        var vc = $('#vc').val();
        var vl = $('#vl').val();
        var vu = $('#vu').val();
        var vs = $('#vs').val();
        var user_lecture_notes = $('#user_lecture_notes').val();

        if (user_lecture_notes == '') {
            $('.alert-danger span').html('Please add your notes');
            $('.alert-danger').show();    
            setTimeout(function() {
            $('.alert-danger').hide();
             }, 5000); 
            return false;
        }
         $(".wrap_loader").show();
        $.ajax({
            type: 'POST',
            url: videobaseurl + '/ajax/ajaxSetUserLectureNotes.php',
            dataType: 'json',
            data: {'vc': vc, 'vl': vl, 'vu': vu, 'vs': vs, 'user_lecture_notes': user_lecture_notes},
            success: function (data) {
                if (data.flag == -99)
                {
                     $(".wrap_loader").hide();
                    window.location.href = videobaseurl + '/login.php';
                }
                if (data.flag == 1)
                {
                    $('.alert-success span').html(data.msg);
                    $('.alert-success').show();
                    setTimeout(function () {
                        $('.alert-success').hide();
                    }, 5000);
                    $('.tp-video-notes').hide();
                    $(".wrap_loader").hide();
                    return true;

                } else if (data.flag == 0)
                {
                    $('.alert-danger span').html(data.msg);
                    $('.alert-danger').show();
                    setTimeout(function () {
                        $('.alert-danger').hide();
                    }, 5000);
                    $(".wrap_loader").hide();
                    return false;
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    $('#save_lecture_feedback').click(function (e) {
        var vc = $('#vc').val();
        var vu = $('#vu').val();
        var user_lecture_feedback = $('#user_lecture_feedback').val();
        if (user_lecture_feedback == '') {
            $('.alert-danger span').html("Please add your message");
            $('.alert-danger').show();    
            setTimeout(function() {
            $('.alert-danger').hide();
             }, 5000); 
                    
            return false;
        }
        if ($("input[name=reviewRating]").is(':checked')) {
            reviewRating = $("input[name=reviewRating]:checked").val();
        } else {
            $('.alert-danger span').html("Please select your rating");
            $('.alert-danger').show();    
            setTimeout(function() {
            $('.alert-danger').hide();
             }, 5000); 
            return false;
        }
       $(".wrap_loader").show();
        $.ajax({
            type: 'POST',
            url: videobaseurl + '/ajax/ajaxSetUserFeedbacks.php',
            dataType: 'json',
            data: {'vc': vc, 'vu': vu, 'user_lecture_feedback': user_lecture_feedback, 'reviewRating': reviewRating},
            success: function (data) {
                if (data.flag == -99)
                {
                    $(".wrap_loader").hide();
                    window.location.href = videobaseurl + '/login.php';
                }
                if (data.flag == 1)
                {
                    $('.alert-success span').html(data.msg);
                    $(".wrap_loader").hide();
                    $('.alert-success').show();
                    setTimeout(function () {
                        $('.alert-success').hide();
                    }, 5000);
                    $('.tp-video-feedback').hide();
                    $('#user_lecture_feedback').val("");
                    $("input[name=reviewRating]").attr('checked', false);
                    return false;
                } else if (data.flag == 0)
                {
                    $('.alert-danger span').html(data.msg);
                    $(".wrap_loader").hide();
                    $('.alert-danger').show();
                    setTimeout(function () {
                        $('.alert-danger').hide();
                    }, 5000);
                    return false;
                }
            },
            error: function (data) {
                $(".wrap_loader").hide();
                console.log(data);
            }
        });
    });
    
    //reporting video 
    $('#video_play').on('click','#report_issue', function (e) {
        var vc = $('#vc').val();
        var vl = $('#vl').val();
        var vu = $('#vu').val();
        var vs = $('#vs').val();
        var vln = $('#vln').val();
        var vcn = $('#vcn').val();
        var reportMsg = $('#issue_text').val();
         if (reportMsg == '') {
            $('.alert-danger span').html("Please add your issues description");
            $('.alert-danger').show();    
            setTimeout(function() {
            $('.alert-danger').hide();
             }, 5000); 
            return false;
        }
        var formdata = new FormData();
        formdata.append("vc", vc);
        formdata.append("vl", vl);        
        formdata.append("vu", vu);        
        formdata.append("vs", vs);        
        formdata.append("vln", vln);        
        formdata.append("vcn", vcn);        
        formdata.append("rmsg", reportMsg);
        if ($('#attachment_report').val() != '')
        {
            formdata.append("file", $('#attachment_report')[0].files[0]);
        }
        $(".wrap_loader").show();
        $.ajax({
            url: videobaseurl + '/ajax/ajaxAddVideosReport.php',
            method: "POST",
            dataType: "json",
            cache: false,
            data: formdata,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.flag == -99)
                {
                     $(".wrap_loader").hide();
                    window.location.href = videobaseurl + '/login.php';
                }
                if (data.flag == 1)
                {

                    $('#issue_text').val('');
                    $('.tp-copyright-issue').hide();
                    $('.alert-success span').html(data.msg);
                    $('.alert-success').show();
                    $(".wrap_loader").hide();
                    setTimeout(function () {
                        $('.alert-success').hide();
                    }, 5000);
                    return true;
                } else if (data.flag == 0)
                {
                    $(".wrap_loader").hide();
                    $('#issue_text').val('');
                    $('.tp-copyright-issue').hide();
                    $('.alert-danger span').html(data.msg);
                    $('.alert-danger').show();
                    setTimeout(function () {
                        $('.alert-danger').hide();
                    }, 5000);
                    return false;
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
// Remove a report 
    $(".clsRemoveReport").on('click', function () {
        var rid = $(this).data('rid');
        if (confirm("Are sure you want to remove the report")) {
            $.ajax({
                url: videobaseurl + "/ajax/ajaxRemoveVideoReport.php",
                method: "POST",
                data: {
                    "rid": rid
                },
                dataType: 'json',
                success: function (returnData) {
                    if (returnData.flag == 1) {
                        //window.location.reload(true);
                        $("div").remove("#divReported_" + rid);
                        $('.alert-success span').html('Report Removed');
                        $('.alert-success').show();
                        setTimeout(function () {
                            $('.alert-success').hide();
                        }, 5000);
                    } else if (returnData.flag == 0) {
                        $('.alert-danger span').html(returnData.msg);
                        $('.alert-danger').show();
                        setTimeout(function () {
                            $('.alert-danger').hide();
                        }, 5000);
                        return false;
                    }
                },
                error: function (returnData) {

                }
            });
        }
    });

    // update a report 
    $("#btnUpdateReport").on('click', function () {
        var r_msg = $("#txtReport").val();
        var r_id = $("#r_id").val();
        var r_status = $("#selReportStatus").val();
        if (r_msg == '') {
            $('#txtReport').next().html('Please add your description');
            $('#txtReport').focus();
            $('#txtReport').css('border-color', 'red');
            return false;
        } else if (r_status == '') {
            $('#selReportStatus').next().html('Please select status');
            $('#selReportStatus').focus();
            $('#selReportStatus').css('border-color', 'red');
            return false;
        }
        if (confirm("Are sure you want to submit the report")) {
            $.ajax({
                url: videobaseurl + "/ajax/ajaxUpdateVideoReport.php",
                method: "POST",
                data: {
                    "r_msg": r_msg,
                    "r_id": r_id,
                    "r_status": r_status
                },
                dataType: 'json',
                success: function (returnData) {
                    if (returnData.flag == 1) {
                        $('.alert-success span').html(returnData.msg);
                        $('.alert-success').show();
                        setTimeout(function () {
                            $('.alert-success').hide();
                        }, 5000);
                        window.location = videobaseurl + "/admin_reported_videos.php";
                    } else if (returnData.flag == 0) {
                        $('.alert-danger span').html(returnData.msg);
                        $('.alert-danger').show();
                        setTimeout(function () {
                            $('.alert-danger').hide();
                        }, 5000);
                        window.location = videobaseurl + "/admin_reported_videos.php";
                        //return false;
                    }
                },
                error: function (returnData) {

                }
            });
        }
    });

   
   //adding to Cart
    $('#center, #coursesDisplayDiv').on('click','.add-to-cart-form', function () {
        var cart_type = $(this).data("cart_type");
        var id = $(this).find('#course_id').val();
        $('.wrap_loader').show();
        $.ajax({
            url: videobaseurl + "/ajax/ajaxAddCartItem.php",
            method: "POST",
            data: {'id': id, 'cart_type': cart_type},
            dataType: "json",
        }).done(function (data) {
            $('.wrap_loader').hide();
            if (data.flag == -99) {                
                $('#mui_main_modal').html('<div id="mui_popup_modal" class="modal-dialog"></div>');
                loginPopup($(this).data('type'));               
                return false;
            }
            if (data.flag == 1) {
                $('.total_cart_count').text(data.cart_count);
                $('.alert-success span').html(data.msg);
                $('.alert-success').show();    
                setTimeout(function() {
                  $('.alert-success').hide();
                }, 5000);   
                //window.location.href = videobaseurl + "/view_cart.php";
            } else if (data.flag == 2) {
                $('.total_cart_count').text(data.cart_count);
                $('.alert-warning span').html(data.msg);
                $('.alert-warning').show();    
                setTimeout(function() {
                  $('.alert-warning').hide();
                }, 5000);   
                //window.location.href = videobaseurl + "/view_cart.php";
            } else {
              $('.alert-danger span').html('Unable to add to cart ');
              $('.alert-danger').show();
              setTimeout(function () {
                  $('.alert-danger').hide();
              }, 5000);
              return false;
            }
           /*  if (data.flag == 0) {
                window.location.href = videobaseurl + "/view_cart.php";
            } */
        });

    });

    //removing Cart Item
    //removing Cart Item
    $('.remove_cart_item').on('click', function () {
        var r = confirm("Are you sure to delete this item from cart!");
        if (r == true) {
            var vc = $(this).data('course');
            var vt = $(this).data('type');
            var formdata = new FormData();
            formdata.append("vc", vc);
            formdata.append("vt", vt);
            $('.wrap_loader').show();
            $.ajax({
                url: baseurl + "/ajax/ajaxDeleteCartItem.php",
                method: "POST",
                cache: false,
                dataType: "json",
                data: formdata,
                processData: false,
                contentType: false,
            }).done(function (data) {
                window.location.reload(true);                
                if (data.flag === 1)
                {
                    $('.alert-success span').html(data.msg);
                    $('.alert-success').show();
                    setTimeout(function () {
                        $('.alert-success').hide();   
                        $('.wrap_loader').hide();
                    }, 5000);
                    $('#divCourse' + data.vs).remove();
                    if (data.cart_count != 0) {
                        $('#hdnCartCount').val($('#hdnCartCount').val()-1);
                        $('.total_cart_count').text(data.cart_count);
                        $('#final_checkout_price_inr').html("<i class='fa fa-rupee-sign'></i> " + data.final_checkout_price_inr);
                        $('#final_checkout_price_usd').html("<i class='fa fa-dollar-sign'></i> " + data.final_checkout_price_usd);
                        $('#num_of_count').text(data.cart_count);
                        $("#fcpinr").val(data.total_inr_en);
                        $("#fcpusd").val(data.total_usd_en);
                    } else {
                        $('#empty-message').show();
                        $('.total_cart_count').text('');
                        $('.billing_addr').hide();
                        $('#show-cart').hide();
                        $('#show-cart1').hide();
                        $('#courseCartContine').show();
                        $('#courseCartDiv').hide();
                    }
                } else
                {
                    $('.wrap_loader').hide();
                    $('.alert-danger span').html(data.msg);
                    $('.alert-danger').show();
                    setTimeout(function () {
                        $('.alert-danger').hide();
                    }, 5000);
                    return false;
                    }

            });
        }
    });
   //enroll       
   $('.btnEnroll').click(function(){
      if (var_auth != '') {
         var vc = $(this).data('vc'); 
         $.ajax({
            url: videobaseurl + "/ajax/ajaxEnrollCourse.php",
            method: "POST",
            dataType: 'json',
            data : {'vc':vc},
            success: function (data) {          
               if(data.flag == 1){
                        $('.alert-success span').html(data.msg);
                        $('.alert-success').show();    
                        setTimeout(function() {
                         $('.alert-success').hide();
                         window.location.href = data.course_url;
                         }, 5000);   
                        
                       
                     } else {     
                        $('.alert-danger span').html(data.msg);
                        $('.alert-danger').show();    
                        setTimeout(function() {
                        $('.alert-danger').hide();
                         }, 5000);   
                        return false;          
                     }
            }
         });
      } else {
         loginPopup();
      }
   });
   
   
   //header
   $('input[name="q"]').keydown(function(event){
      if(event.keyCode == 13) {
            event.preventDefault();
            return false;
      }
      });
   
   
   
   $('#divMask').on("click", function () {      
      $(this).hide();
      $(".qa-search-box").hide();
      $(".qa-search-icon").hide();
      $("#txtQuestion").val('');             
   });
   
   $('.clsCategories').mouseover(function(){
      $(".clsCategories").removeClass("vmenuactive");
   });
   $('.vMenuDesc').mouseleave(function(){        
      $(this).removeClass('vmenuactive');
      $(".clsCategories").first().addClass("vmenuactive");
   });
   $("#ancSearch").click(function(a){
        a.stopPropagation();
      $(".library_cont").hide();
      $(".video_cont").hide();
      $(".profile_cont").hide();
   });
      
   
         
   
   $('#ancSearch').click(function(){
      var searchKey = $('#txtSearchKey').val();
      searchKey = $.trim(searchKey);
      if(searchKey == ''){
         //$('#txtSearchKey').css('border-color', '#f00');
         //return false;
      }
      $('#txtSearchKey').css('border-color', '#5ab155');
      window.location.href = videobaseurl + "/search.php?key="+searchKey;     
   });
  
   
    // change password
   
    $('#btnUpdatePwd').click(function () {
        var old_password = $('#txtOldPwd').val();
        var new_password = $('#txtNewPwd').val();
        var confirm_password = $('#txtConfirmPwd').val();
        var error_msg = '';
      
        $("#profileForm input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
      });
        if (old_password == '')
        {
            error_msg = 'Please enter old password';
            $('#txtOldPwd').focus();
            $('#txtOldPwd').css('border-color', 'red');
      } else if (new_password == '')
        {
            error_msg = 'Please enter new password';
            $('#txtNewPwd').focus();
            $('#txtNewPwd').css('border-color', 'red');
      } else if (confirm_password == '')
        {
            error_msg = 'Please re enter new password';
            $('#txtConfirmPwd').focus();
            $('#txtConfirmPwd').css('border-color', 'red');
      } else if (confirm_password != new_password)
        {
            error_msg = 'Please enter same new password';
            $('#txtConfirmPwd').focus();
            $('#txtConfirmPwd').css('border-color', 'red');
      }
      
        if (error_msg != '') {
            $('#profileAlert').html(error_msg);
            $('#profileAlert').show();
            setTimeout(function () {
                $("#profileAlert").hide();
         }, 5000);
            return false;
      }
      
        old_password = $.trim(old_password);
        new_password = $.trim(new_password);
      
        $("#profileForm input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
      });
      
        $('#profileAlert').html('');
        $('#profileAlert').hide();
      
        $.ajax({
            url: videobaseurl + "/ajax/ajaxChangeUserPassword.php",
            dataType: 'json',
            method: "POST",
            data: {"old_password": old_password, "new_password": new_password},
            beforeSend: function () {
                $('.wrap_loader').show();
         },
            success: function (data) {
                if (data.flag == 0) {
                    window.location.href = videobaseurl + '/index.php';
               } else if (data.flag == 1) {
                    $('.wrap_loader').hide();
                    $('.alert-success span').html(data.msg);
                    $('.alert-success').show(); 
                    setTimeout(function() {
                    $('.alert-success').hide();
                     }, 5000);
               window.location.href = videobaseurl + '/login.php';
               } else {
                    $('.wrap_loader').hide();
                    $('.alert-danger span').html(data.msg);
                    $('.alert-danger').show();    
                    setTimeout(function() {
                    $('.alert-danger').hide();
                     }, 5000); 
            }
         }
      });
   });
   
      
    $('#personalDisplayDiv').on('click','#cropImg',function () {
        var vu = $('#varData1').val();
        $.ajax({
            url: videobaseurl + "/ajax/ajaxProfileImageCrop.php",
            method: "POST",
            data: {'vu': vu}
         }).done(function (returnData) {
            $('#popupDivContent').html(returnData);
            $('#popupDiv').show();
      });
   });
    $('#popupDivClose').click(function () {
        $('#popupDivContent').html('');
        $('#popupDiv').hide();
   });
   
   
    
    
    // Delete Feedback
   
    $('#divUserProfile').on('click', '.clsDeleteFeedback', function () {
        var r = confirm("Are you sure to delete this course feedback");
        if (r == true) {
            var feedback_id = $(this).data('feedback');
         
            var formdata = new FormData();
            formdata.append("feedback_id", feedback_id);
         
            $.ajax({
                url: videobaseurl + "/ajax/ajaxAdminDeleteFeedback.php",
                method: "POST",
                cache: false,
                dataType: "json",
                data: formdata,
                processData: false,
                contentType: false,
            }).done(function (data) {
                if (data.flag == -99)
                {
                    window.location.href = videobaseurl + '/login.php';
            }
                if (data.flag === 1)
                {
                    $('#trFeed' + feedback_id).remove();
                    $('.alert-success span').html(data.msg);
                $('.alert-success').show(); 
                setTimeout(function() {
                $('.alert-success').hide();
                 }, 5000);
                window.location.reload(true);
            } else
                {
                    $('.alert-danger span').html("Some thing went wrong");
                $('.alert-danger').show();    
                setTimeout(function() {
                $('.alert-danger').hide();
                 }, 5000);   
                    return false;
            }
         });
      }
   });
   
   
    
   $('#divFilter').click(function (e) {
        // e.preventDefault();
        e.stopPropagation();
   });
    $('#ancAddFilter').click(function (e) {
        e.stopPropagation();
        var $el = $("#divFilter");
        if ($el.is(":visible")) {
            $('#divFilter').hide();
         } else {
            $('#divFilter').show();
      }
   });
    $(document).on('click', function (e) {
        var $el = $("#divFilter");
        if ($el.is(":visible")) {
            $el.hide();
      }
   });
    //feedback 
    $('.feedshow').hide();
    $('.feedshide').click(function () {
        if (var_auth != '') {
            $('.feedshow').toggle();
            $('.feedshide').hide();
         } else {
            loginPopup();
      }
   });
    $('.courseRating').click(function () {
        if (var_auth == '') {
            loginPopup();
      }
   });
   
   
    $('.tog_open').click(function () {
        $('.toggle-desc').toggle();
        $(this).removeClass('fa fa-caret-right').addClass('fa fa-caret-down');
        $('fa fa-caret-right').hide();
   });
    $('#btnCancelFeedback').click(function () {
      $('.feedshow').toggle();
        $('.feedshide').show();
   });
    $('#btnSubmitFeedback').click(function () {
        if (var_auth != '') {
            var vc = $(this).data('vc');
            var courseRating = 0;
            var feedbackContent = $('#txtCourseFeedback').val();
            if ($("input[name=courseRating]").is(':checked')) {
                courseRating = $("input[name=courseRating]:checked").val();
         }
         
            $('#feedbackErrmsg').html('');
            if (courseRating == 0)
            {
                $('.txtClass').next().html('');
                $('#feedbackErrmsg').html('Please select rating');
                $('#starRating').focus();
                $('#starRating').css('border-color', 'red');
                return false;
            } else if (feedbackContent == '') {
                $('.txtClass').next().html('');
                $('#feedbackErrmsg').html('Please enter course feedback message');
                $('#txtCourseFeedback').focus();
                $('#txtCourseFeedback').css('border-color', 'red');
                return false;
         }
         
            $.ajax({
                url: videobaseurl + "/ajax/ajaxAddCourseFeedback.php",
                method: "POST",
                dataType: "json",
                cache: false,
                data: {'vc': vc, 'courseRating': courseRating, 'feedbackContent': feedbackContent}
            }).done(function (data) {
                if (data.flag == -99) {
                    window.location = videobaseurl + "/login.php";
            } else if (data.flag == 1)
                {
                    $('#feedbackErrmsg').html(data.msg);
                    setTimeout(function () {
                        $('#divFeedback').hide('slow');
               }, 5000);
            } else
                {
                    $('#feedbackErrmsg').html(data.msg);
            }
         });
         } else {
            loginPopup();
      }
   });
});
function entityView(entity_var, entity_type) {
    if (entity_var != '') {      
        $.ajax({
            url: videobaseurl + "/ajax/ajaxUpdateViews.php",
            method: "POST",
            data: {'entity_var':entity_var,'entity_type':entity_type}         
         }).done(function (returnData) {
      });
   }
}
// added by prashanth
function show_menu() {
    var menu = document.getElementById('dropdown_menu');
    if (menu.style.display == 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
   }
}
/* toggle full screen*/
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
         } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
         } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
      }
   }
}
/*
   function toggleMenu(){
   var menu = document.getElementById('left-bar');
   if(menu.style.display == 'block'){
   menu.style.display = 'none';
   }else {
   menu.style.display = 'block';                    
   }
   }
   
   function toggleProfile(){
   var menu = document.getElementById('dpdwnRmenu');
   if(menu.style.display == 'block'){
   menu.style.display = 'none';
   }else {
   menu.style.display = 'block';
   }
   }
   
   function toggleSearch(){
   var menu = document.getElementById('searchMenu');
   if(menu.style.display == 'block'){
   menu.style.display = 'none';
   }else {
   menu.style.display = 'block';
   }
   }
*/
function toggleRmenu() {
    var menu = document.getElementById('dpdwnRmenu');
    if (menu.style.display == 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
   }
}
function expandRight() {
    var menu = document.getElementById('left-bar');
    if (menu.style.display == 'block') {
        document.getElementById('center').style.marginLeft = '0px';
        menu.style.display = 'none';
      } else {
        document.getElementById('center').style.marginLeft = '270px';
        menu.style.display = 'block';
   }
}

$(document).ready(function () {
    $('#topSearch').click(function () {
        $('#dpdwnRmenu').toggle();
   });
    $('#topMenu').click(function () {
        $('#left-bar').toggle();
   });
    $('.nav_search').click(function () {
        $('.librarybox').hide();
        $('.searchbox').toggle();
   });
    $('.dropdown-library').click(function () {
        $('.librarybox').toggle();
        $('.searchbox').hide();
   });
   
});

$(document).on("click", ".cclose", function (b) {
    $(".librarybox").hide();
});

/* side-drawer js */
jQuery(function($) {
   var $bodyEl = $('body'),
   $sidedrawerEl = $('#sidedrawer');
      function showSidedrawer() {
      // show overlay
      var options = {
         onclose: function() {
         $sidedrawerEl
         .removeClass('active')
         .appendTo(document.body);
         }
      };
      var $overlayEl = $(mui.overlay('on', options));
      // show element
      $sidedrawerEl.appendTo($overlayEl);
      setTimeout(function() {
         $sidedrawerEl.addClass('active');
         }, 20);
      }
      function hideSidedrawer() {
         $bodyEl.toggleClass('hide-sidedrawer');
         $('#graph_data_filter').trigger('change');
         $('#revenue_graph_filter').trigger('change');
      }
      $('.js-show-sidedrawer').on('click', showSidedrawer);
      $('.js-hide-sidedrawer').on('click', hideSidedrawer);
  
      var $titleEls = $('strong', $sidedrawerEl);
         $titleEls
         .next()
         .hide();
      $titleEls.on('click', function() {
         $(this).next().slideToggle(200);
      });
});
/* end of side-drawer js */