$(document).ready(function() {

    function loginPopup() {
        window.location.href = videobaseurl + '/login.php';
    }
    //Hide elements 
    $('#forgotOTPMail').hide();
    $('#divforgotOTPForm').hide();

    // user registration

    $('#divSignup').bind('keydown', function(e) {
        if (e.keyCode == 13) {
            userSingup();
        }
    });
    $('#submitRegister').on('click', function() {
        userSingup();
    });
    $('#popupDiv').on('click', '#submitRegister', function() {
        userSingup();
    });
    $('#forgot_pwd').on('click', function() {
        forgotMail();
    });
    $('#submit_otp').on('click', function() {
        sendOTP();
    });
    $('#checkOTP').on('click', function() {
        checkOTP();
    });
    $("#divSignup input,textarea,select").keydown(function() {
        $(this).css('border-color', '#ccc');
        // $(this).next().html('');
    });
    $('#verifyOTP').on('click', function() {
        verifyOTP();
    });
    $('#validateOtp').on('click', function() {
        validateOtp();
    });
    
    function userSingup() {

        var full_name = $('#textRegName').val();
        var email_id = $('#textSRegEmail').val();
        var pwd = $('#textSRegPwd').val();
        var repwd = $('#textRegRePwd').val();
        var otp = $('#txtValidateOTP').val();
        var error_msg = '';

        if (full_name == '') {
            $('.txtClass').next().html('');
            $('#textRegName').next().html('Please enter a full name');
            $('#textRegName').focus();
            $('#textRegName').css('border-color', 'red');
            return false;
        } else if (!emailPattern.test(email_id)) {
            $('#textRegName').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textSRegEmail').next().html('Please enter a valid email id');
            $('#textSRegEmail').focus();
            $('#textSRegEmail').css('border-color', 'red');
            return false;
        } else if (pwd == '') {
            $('#textSRegEmail').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textSRegPwd').next().html('Please enter password');
            $('#textSRegPwd').focus();
            $('#textSRegPwd').css('border-color', 'red');
            return false;
        } else if (repwd == '') {
            $('#textSRegPwd').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegRePwd').next().html('Please re enter password');
            $('#textRegRePwd').focus();
            $('#textRegRePwd').css('border-color', 'red');
            return false;
        } else if (repwd != pwd) {
            $('#textSRegPwd').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegRePwd').next().html('Passwords are not matching!');
            $('#textRegRePwd').focus();
            $('#textRegRePwd').css('border-color', 'red');
            return false;
        } else if ($("#chkTerms").prop('checked') == false) {
            error_msg = 'Please read and accept the terms of use';
            $('#chkTerms').next().next().html(error_msg);
            $('#chkTerms').focus();
            $('#chkTerms').css('border-color', 'red');
            return false;
        }

        full_name = $.trim(full_name);
        email_id = $.trim(email_id);
        pwd = $.trim(pwd);
        otp = $.trim(otp);

        $("#textSRegPwd, #textRegRePwd").each(function() {
            $(this).css('border-color', '#ccc');
        });
        $('.error').html('');
        $('#errDivRegister').html('');
        $(".wrap_loader").show();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfxXKUUAAAAAMqQTDGX62mrrHGZ7HasGVdhvf9h', {
                action: 'homepage'
            }).then(function(token) {
                $.ajax({
                    url: videobaseurl + "/ajax/ajaxUserRegistartion.php",
                    dataType: 'json',
                    method: "POST",
                    data: {
                        "email_id": email_id,
                        'pwd': pwd,
                        'otp': otp,
                        "full_name": full_name,
                        "token": token
                    },
                    success: function(data) {
                        if (data.flag == 1) {
                            $(".wrap_loader").show();
                            createCookie('subscription_purchased', 0, 1);
                            window.location.href = data.rurl;
                        } else {
                            $(".wrap_loader").hide();
                            $('#errDivRegister').html(data.msg);
                            setTimeout(function() {
                                $('#errDivRegister').html('');
                            }, 5000);
                        }
                    }
                });
            });
        });

    } // end userSingup function



    $("#divLogin input,textarea,select").keydown(function() {
        $(this).css('border-color', '#ccc');
        //$(this).next().html('');
    });

    $('#submitLogin').on('click', function() {
        userLogin();
    });
    function createCookie(name, value, days) {
       if (days) {
           var date = new Date();
           date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
           var expires = "; expires=" + date.toGMTString();
       }
       else var expires = "";
       document.cookie = name + "=" + value + expires + "; path=/";        
    }
    function userLogin() {

        $(".wrap_loader").show();
        var email = $('#textRegEmail').val();
        var pwd = $('#textRegPwd').val();
        //var capchaReponse = $("#g-recaptcha-response").val();

        $("#divLogin input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });
        if (email == '') {
            $('.txtClass').next().html('');
            $('#textRegEmail').next().html('Please enter a email id');
            $('#textRegEmail').focus();
            $('#textRegEmail').css('border-color', 'red');
            $(".wrap_loader").hide();
            return false;
        } else if (!emailPattern.test(email)) {
            $('#textRegEmail').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegEmail').next().html('Please enter a valid email id');
            $('#textRegEmail').focus();
            $('#textRegEmail').css('border-color', 'red');
            $(".wrap_loader").hide();
            return false;
        } else if (pwd == '') {
            $('#textRegEmail').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegPwd').next().html('Please enter a password');
            $('#textRegPwd').focus();
            $('#textRegPwd').css('border-color', 'red');
            $(".wrap_loader").hide();
            return false;
        }

        $("#divLogin input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });
        $('.txtClass').next().html('');
        $('#errDivLogin').html('');
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfxXKUUAAAAAMqQTDGX62mrrHGZ7HasGVdhvf9h', {
                action: 'homepage'
            }).then(function(token) {
                $.ajax({
                    url: videobaseurl + "/ajax/ajaxUserSignIn.php",
                    method: "POST",
                    async: true,
                    cache: false,
                    dataType: 'json',
                    data: {
                        "email": email,
                        'pwd': pwd,
                        'token': token
                    },
                    success: function(data) {
                        if (data.flag == 1) {
                            $(".wrap_loader").show();
                            createCookie('subscription_purchased', data.subscription_purchased, 1);
                            window.location.href = data.rurl;
                        } else {
                            $(".wrap_loader").hide();
                            $('#errDivLogin').next().html(data.msg);
                            // grecaptcha.reset(recaptcha1);
                            setTimeout(function() {
                                $('#errDivLogin').next().html('');
                            }, 5000);
                        }

                    }
                });
            });
        });
    } // end userSingin function

    if (localStorage.chkbx && localStorage.chkbx != '') {
        $('#remember_me').attr('checked', 'checked');
        $('#textRegEmail').val(localStorage.useremail);
        $('#textRegPwd').val(localStorage.pwd);
    } else {
        $('#remember_me').removeAttr('checked');
        $('#textRegEmail').val('');
        $('#textRegPwd').val('');
    }

    $('#remember_me').click(function() {

        if ($('#remember_me').is(':checked')) {
            localStorage.useremail = $('#textRegEmail').val();
            localStorage.pwd = $('#textRegPwd').val();
            localStorage.chkbx = $('#remember_me').val();
        } else {
            localStorage.useremail = '';
            localStorage.pwd = '';
            localStorage.chkbx = '';
        }
    });

    function forgotMail() {
        var email_id = $('#txtForgotEmailId').val();
        var error_msg = '';
        //var capchaReponse = $("#g-recaptcha-response-2").val();
        $("#forgotOTPMail input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });

        if (email_id == '' || !emailPattern.test(email_id)) {
            error_msg = 'Please enter a valid email id';
            $('#txtForgotEmailId').next().html(error_msg);
            $("#txtForgotEmailId").next().show();
            $('#txtForgotEmailId').focus();
            $('#txtForgotEmailId').css('border-color', 'red');
            setTimeout(function() {
                $("#txtForgotEmailId").next().hide();
                $('#txtForgotEmailId').css('border-color', '#ccc');
            }, 5000);
            return false;
        }
        /*else if (capchaReponse == '') {
                  $('#txtForgotEmailId').css('border-color', '#ccc');
                    $('.txtClass').next().html('');
                    $('#errDivForgot').html('Please select captcha');
                    $('#recaptcha-anchor').focus();
                    $('#recaptcha-anchor').css('border-color', 'red');
                    $(".wrap_loader").hide();
                return false;
           }*/

        email_id = $.trim(email_id);

        $("#forgotOTPMail input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });

        $('#forgotMailAlert').html('');
        $('#forgotMailAlert').hide();
        $('.wrap_loader').show();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfxXKUUAAAAAMqQTDGX62mrrHGZ7HasGVdhvf9h', {
                action: 'homepage'
            }).then(function(token) {
                $.ajax({
                    url: videobaseurl + "/ajax/ajaxSendForgotOTP.php",
                    dataType: 'json',
                    method: "POST",
                    data: {
                        "email_id": email_id,
                        'token': token
                    },
                    success: function(data) {
                        if (data.flag == 1) {
                            $('#divForgot').hide();
                            $('#forgotOTPForm').show();
                            $('#forgotOTPAlert').html(data.msg);
                            $('#forgotOTPAlert').show();
                            $('#txtForgotOTP').focus();
                            $('.wrap_loader').hide();
                            setTimeout(function() {
                                $("#forgotOTPforgotOTP").hide();
                            }, 5000);
                        } else {
                            $('#forgotOTP').html(data.msg);
                            $('#forgotOTP').show();
                            $('.wrap_loader').hide();
                            //grecaptcha.reset(recaptcha3);
                            setTimeout(function() {
                                $("#forgotOTP").hide();
                            }, 5000);
                        }
                    }
                });
            });
        });
    }

    function sendOTP() {
        var email_id = $('#txtForgotEmailId').val();
        var otp = $('#txtForgotOTP').val();
        // var capchaReponse = $("#g-recaptcha-response-3").val();
        var error_msg = '';
        $("#forgotOTPForm input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });
        if (otp == '') {
            error_msg = 'Please enter OTP which is sent to your email id';
            $('#txtForgotOTP').next().html(error_msg);
            $("#txtForgotOTP").next().show();
            $('#txtForgotOTP').focus();
            $('#txtForgotOTP').css('border-color', 'red');
            setTimeout(function() {
                $("#forgotOTPAlert").hide();
                $('#txtForgotOTP').css('border-color', '#ccc');
                $('#txtForgotOTP').css('border-color', '#ccc');
            }, 5000);
            return false;
        }
        /*else if (capchaReponse == '') {
                  $('#txtForgotOTP').css('border-color', '#ccc');
                    $('.txtClass').next().html('');
                    $('#errDivotp').html('Please select captcha');
                    $('#recaptcha-anchor').focus();
                    $('#recaptcha-anchor').css('border-color', 'red');
                    $(".wrap_loader").hide();
                return false;
           }*/
        if (error_msg != '') {
            $('#forgotOTPAlert').html(error_msg);
            $('#forgotOTPAlert').show();
            // grecaptcha.reset(recaptcha4);
            setTimeout(function() {
                $("#forgotOTPAlert").hide();
                $('#txtForgotOTP').css('border-color', '#ccc');
                $('#txtForgotOTP').css('border-color', '#ccc');
            }, 5000);
            return false;
        }
        email_id = $.trim(email_id);
        otp = $.trim(otp);
        $("#forgotOTPForm input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });
        $('#forgotOTPAlert').html('');
        $('#forgotOTPAlert').hide();
        $('.wrap_loader').show();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfxXKUUAAAAAMqQTDGX62mrrHGZ7HasGVdhvf9h', {
                action: 'homepage'
            }).then(function(token) {
                $.ajax({
                    url: videobaseurl + "/ajax/ajaxCheckForgotOTP.php",
                    dataType: 'json',
                    method: "POST",
                    data: {
                        "email_id": email_id,
                        "otp": otp,
                        'token': token

                    },
                    success: function(data) {

                        if (data.flag == 1) {
                            $('#forgotOTPMail').hide();
                            $('#forgotOTPForm').hide();
                            $('#forgotOTPSubmit').show();
                            $('#forgotOTPAlert').html(data.msg);
                            $('#forgotOTPAlert').show();
                            $('.wrap_loader').hide();
                            $('#forgotOTPAlert').removeClass('error');
                            $('#forgotOTPAlert').addClass('success-otp');
                            setTimeout(function() {
                                $("#forgotOTPAlert").hide();
                                $('#txtForgotOTP').focus();
                            }, 5000);
                        }
                        if (data.flag == 2) {
                            $('#forgotOTPAlert').html(data.msg);
                            $('#forgotOTPAlert').show();
                            $('#forgotOTPAlert').removeClass('success-otp');
                            $('#forgotOTPAlert').addClass('error');
                            $('.wrap_loader').hide();
                            setTimeout(function() {
                                $("#forgotOTPAlert").hide();
                            }, 5000);
                        } else {
                            $('#forgotOTPAlert').html(data.msg);
                            $('#forgotOTPAlert').show();
                            $('.wrap_loader').hide();
                            $('#forgotOTPAlert').removeClass('success-otp');
                            $('#forgotOTPAlert').addClass('error');
                            setTimeout(function() {
                                $("#forgotOTPAlert").hide();
                            }, 5000);
                        }
                    }
                });
            });
        });
    }

    function checkOTP() {
        var email_id = $('#txtForgotEmailId').val();
        var otp = $('#txtForgotOTP').val();
        var new_password = $('#txtNewPassword').val();
        var confirm_password = $('#txtConfirmPassword').val();
        var error_msg = '';
        $("#forgotOTPSubmit input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });
        if (new_password == '') {
            error_msg = 'Please enter new password';
            $('#txtNewPassword').focus();
            $('#txtNewPassword').css('border-color', 'red');
        } else if (confirm_password == '') {
            error_msg = 'Please re enter new password';
            $('#txtConfirmPassword').focus();
            $('#txtConfirmPassword').css('border-color', 'red');
        } else if (confirm_password != new_password) {
            error_msg = 'Passwords are not matching!';
            $('#txtConfirmPassword').focus();
            $('#txtConfirmPassword').css('border-color', 'red');
        }
       
        if (error_msg != '') {
            $('#forgotOTPAlertPwd').html(error_msg);
            $('#forgotOTPAlertPwd').show();
            setTimeout(function() {
                $("#forgotOTPAlertPwd").hide();
                $('#txtNewPassword').css('border-color', '#ccc');
                $('#txtConfirmPassword').css('border-color', '#ccc');
            }, 5000);
            return false;
        }
        email_id = $.trim(email_id);
        otp = $.trim(otp);
        new_password = $.trim(new_password);
        $("#forgotOTPSubmit input,textarea,select").each(function() {
            $(this).css('border-color', '#ccc');
        });
        $('#forgotOTPAlertPwd').html('');
        $('#forgotOTPAlertPwd').hide();
        $('.wrap_loader').show();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfxXKUUAAAAAMqQTDGX62mrrHGZ7HasGVdhvf9h', {
                action: 'homepage'
            }).then(function(token) {
            $.ajax({
               url: videobaseurl + "/ajax/ajaxChangePasswordOTP.php",
               dataType: 'json',
               method: "POST",
               data: {
                   "email_id": email_id,
                   "otp": otp,
                   "new_password": new_password,
                   "token": token
               },
               success: function(data) {
                   if (data.flag == 1) {
                       $('.wrap_loader').hide();
                       $('#forgotOTPAlertPwd').html(data.msg);
                       $('#forgotOTPAlertPwd').show();
                       setTimeout(function() {
                           $("#forgotOTPSubmitAlert").hide();
                           $("#spanSignIn").addClass('signup_active');
                           $('#spanSignUp').removeClass('signup_active');
                           $('#spanForgot').removeClass('signup_active');
                           $('#divLogin').show();
                           $('#registerForm').hide();
                           $('#forgotOTPMail').hide();
                           $('#txtForgotEmailId').val('');
                           $('#forgotOTPMail').hide();
                           $('#forgotOTPForm').hide();
                           $('#forgotOTPSubmit').hide();

                       }, 1000);
                   } else {
                       $('#forgotOTPAlert').html(data.msg);
                       $('#forgotOTPAlert').show();
                       $('.wrap_loader').hide();
                       setTimeout(function() {
                           $("#forgotOTPAlert").hide();
                       }, 5000);
                   }
               }
           });
         });
      });
    }
    
    function verifyOTP(){
        var full_name = $('#textRegName').val();
        var email_id = $('#textSRegEmail').val();
        var error_msg = '';
        
        if (full_name == '') {
            $('.txtClass').next().html('');
            $('#textRegName').next().html('Please enter a full name');
            $('#textRegName').focus();
            $('#textRegName').css('border-color', 'red');
            return false;
        } else if (email_id == '' || !emailPattern.test(email_id)) {
            error_msg = 'Please enter a valid email id';
            $('#textSRegEmail').next().html(error_msg);
            $("#textSRegEmail").next().show();
            $('#textSRegEmail').focus();
            $('#textSRegEmail').css('border-color', 'red');
            setTimeout(function() {
                $("#textSRegEmail").next().hide();
                $('#textSRegEmail').css('border-color', '#ccc');
            }, 5000);
            return false;
        }
        email_id = $.trim(email_id);

        $("#textRegName, #textSRegEmail").each(function() {
            $(this).css('border-color', '#ccc');
        });
        
        $('#verifyOTPAlert').html('');
        $('#verifyOTPAlert').hide();
        $('.wrap_loader').show();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfxXKUUAAAAAMqQTDGX62mrrHGZ7HasGVdhvf9h', {
                action: 'homepage'
            }).then(function(token) {
                $.ajax({
                    url: videobaseurl + "/ajax/ajaxSendVerifyOTP.php",
                    dataType: 'json',
                    method: "POST",
                    data: {
                        "email_id": email_id,
                        "full_name": full_name,
                        'token': token
                    },
                    success: function(data) {
                        if (data.flag == 1) {
                            $('#divSignup').hide();
                            $('#divSignup-2').show();
                            $('#verifyOTPAlert').html(data.msg);
                            $('#verifyOTPAlert').show();
                            $('#txtVerifyOTP').focus();
                            $('.wrap_loader').hide();
                            setTimeout(function() {
                                $("#forgotOTPforgotOTP").hide();
                            }, 5000);
                        } else {
                            $('#verifyOTPError').html(data.msg);
                            $('#verifyOTPError').show();
                            $('.wrap_loader').hide();
                            //grecaptcha.reset(recaptcha3);
                            setTimeout(function() {
                                $("#verifyOTPError").hide();
                            }, 5000);
                        }
                    }
                });
            });
        });
    }
    
    function validateOtp() {
        var email_id = $('#textSRegEmail').val();
        var otp = $('#txtValidateOTP').val();
        // var capchaReponse = $("#g-recaptcha-response-3").val();
        var error_msg = '';
        if (otp == '') {
            error_msg = 'Please enter OTP which is sent to your email id';
            $('#txtValidateOTP').next().html(error_msg);
            $("#txtValidateOTP").next().show();
            $('#txtValidateOTP').focus();
            $('#txtValidateOTP').css('border-color', 'red');
            setTimeout(function() {
                $("#verifyOTPAlert").hide();
                $('#txtValidateOTP').css('border-color', '#ccc');
                $('#txtValidateOTP').css('border-color', '#ccc');
            }, 5000);
            return false;
        }
        
        email_id = $.trim(email_id);
        otp = $.trim(otp);
        $("#txtValidateOTP").each(function() {
            $(this).css('border-color', '#ccc');
        });
        $('#verifyOTPAlert').html('');
        $('#verifyOTPAlert').hide();
        $('.wrap_loader').show();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfxXKUUAAAAAMqQTDGX62mrrHGZ7HasGVdhvf9h', {
                action: 'homepage'
            }).then(function(token) {
                $.ajax({
                    url: videobaseurl + "/ajax/ajaxCheckValidateOTP.php",
                    dataType: 'json',
                    method: "POST",
                    data: {
                        "email_id": email_id,
                        "otp": otp,
                        'token': token

                    },
                    success: function(data) {

                        if (data.flag == 1) {
                            $('#divSignup-2').hide();
                            $('#divSignup-3').show();
                            $('#registerOTPAlert').html(data.msg);
                            $('#registerOTPAlert').show();
                            $('.wrap_loader').hide();
                            $('#registerOTPAlert').removeClass('error');
                            $('#registerOTPAlert').addClass('success-otp');
                            setTimeout(function() {
                                $("#registerOTPAlert").hide();
                                $('#textSRegPwd').focus();
                            }, 5000);
                        } else {
                            $('#verifyOTPAlert').html(data.msg);
                            $('#verifyOTPAlert').show();
                            $('.wrap_loader').hide();
                            $('#verifyOTPAlert').removeClass('success-otp');
                            $('#verifyOTPAlert').addClass('error');
                            setTimeout(function() {
                                $("#verifyOTPAlert").hide();
                            }, 5000);
                        }
                    }
                });
            });
        });
    }
});