$(document).ready(function () {
    var regEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var regPhone = /^[0-9]{10}$/;
    var numberPattern = /^\d*$/;


    /* Login and Logout */
    $('#textEmail,#textPassword').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            userLogin();
        }
    });
    $('#submitLogin').on('click', function () {
        userLogin();
    });
    function userLogin() {

        var email = $('#textEmail').val();
        var pwd = $('#textPassword').val();
        var capchaReponse = $("#g-recaptcha-response").val();
        $("#empDivLogin input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
        });
        if (email == '')
        {
            $('.txtClass').next().html('');
            $('#textEmail').next().html('Please enter a email id');
            $('#textEmail').focus();
            $('#textEmail').css('border-color', 'red');
            grecaptcha.reset(recaptcha1);
            return false;
        } else if (!regEmail.test(email))
        {
            $('#textEmail').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textEmail').next().html('Please enter a valid email id');
            $('#textEmail').focus();
            $('#textEmail').css('border-color', 'red');
            grecaptcha.reset(recaptcha1);
            return false;
        } else if (pwd == '')
        {
            $('#textEmail').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textPassword').next().html('Please enter a password');
            ;
            $('#textPassword').focus();
            $('#textPassword').css('border-color', 'red');
            grecaptcha.reset(recaptcha1);
            return false;
        }

        email = $.trim(email);
        pwd = $.trim(pwd);

        $("#empDivLogin input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
        });

        $('.txtClass').next().html('');
        $('#errDivLogin').html('');
        $('.wrapLoader').show();

        $.ajax({
            url: baseurl + "ajax/ajaxUserSignIn.php",
            method: "POST",
            data: {"email": email, 'pwd': pwd, 'g-recaptcha-response': capchaReponse}
        }).done(function (msg) {

            if (msg == 0)
            {
                $('.wrapLoader').hide();
                $('#errDivLogin').html('<i class="fa-close"></i> Email or password you entered is incorrect!');
                return false;
            } else
            {
                var resObj = eval("(" + msg + ")");

                var usertype = resObj['usertype'];
                var flag = resObj['flag'];
                localStorage.flag = 1;
                if (flag == -1) {
                    grecaptcha.reset(recaptcha1);
                    $('.wrapLoader').hide();
                    $('#errDivLogin').html('<i class="fa-close">' + resObj['msg'] + '</i> ');
                    setTimeout(function () {
                        $('#errDivLogin').html('');
                    }, 3000);
                } else {
                    $('.wrapLoader').show();
                    $('#errDivLogin').html('');
                    if (usertype == 'admin') {
                        window.location.href = baseurl + 'admin_profile.php';
                    } else if (usertype == 'tutor') {
                        window.location.href = baseurl + 'online_tutor_profile.php#TutorBasic';
                    } else {
                        window.location.href = baseurl + 'online_user_profile.php#UserBasic';
                    }
                    // },1000);         
                }
            }
        });
    }
    $('#submitRegister').on('click', function () {
        var userType = $('#txthdType').val();
        var name = $('#textRegName').val();
        var email = $('#textRegEmail').val();
        var pwd = $('#textRegPassword').val();
        var phone = $('#textRegPhone').val();
        var countryCode = $('#selCountryCode').val();
        var cpwd = $('#textRegConfirmPassword').val();
        var capchaReponse;
        if (userType == 'tutor') {
            capchaReponse = $("#g-recaptcha-response").val();
        } else {
            capchaReponse = $("#g-recaptcha-response-1").val();
        }
        $("#empDivRegister input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
        });
        if (name == '')
        {
            $('.txtClass').next().html('');
            $('#textRegName').next().html('Please enter a name');
            $('#textRegName').focus();
            $('#textRegName').css('border-color', 'red');
            grecaptcha.reset(recaptcha2);
            return false;
        } else if (email == '')
        {
            $('#textRegName').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegEmail').next().html('Please enter a email id');
            $('#textRegEmail').focus();
            $('#textRegEmail').css('border-color', 'red');
            grecaptcha.reset(recaptcha2);
            return false;
        } else if (!regEmail.test(email))
        {
            $('#textRegEmail').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegEmail').next().html('Please enter a valid email id');
            $('#textRegEmail').focus();
            $('#textRegEmail').css('border-color', 'red');
            grecaptcha.reset(recaptcha2);
            return false;
        } else if (pwd == '')
        {
            $('#textRegEmail').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegPassword').next().html('Please enter a password');
            $('#textRegPassword').focus();
            $('#textRegPassword').css('border-color', 'red');
            grecaptcha.reset(recaptcha2);
            return false;
        } else if (cpwd == '')
        {
            $('#textRegPassword').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegConfirmPassword').next().html('Please enter a confirm password');
            $('#textRegConfirmPassword').focus();
            $('#textRegConfirmPassword').css('border-color', 'red');
            grecaptcha.reset(recaptcha2);
            return false;
        } else if (pwd != cpwd)
        {
            $('.txtClass').next().html('');
            $('#textRegConfirmPassword').next().html('Please enter a same password');
            $('#textRegConfirmPassword').focus();
            $('#textRegConfirmPassword').css('border-color', 'red');
            grecaptcha.reset(recaptcha2);
            return false;
        } else if (phone != '' && !numberPattern.test(phone))
        {
            $('#textRegPhone').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#textRegPhone').next().html('Please enter a valid mobile number');
            $('#textRegPhone').focus();
            $('#textRegPhone').css('border-color', 'red');
            grecaptcha.reset(recaptcha2);
            return false;
        } else if (phone != '' && countryCode == 91)
        {
            if (!regPhone.test(phone))
            {
                $('#textRegConfirmPassword').css('border-color', '#ccc');
                $('.txtClass').next().html('');
                $('#textRegPhone').next().html('Please enter a valid mobile number');
                $('#textRegPhone').focus();
                $('#textRegPhone').css('border-color', 'red');
                grecaptcha.reset(recaptcha2);
                return false;
            }
        }
        $("#empDivRegister input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
        });
        $('.txtClass').next().html('');
        $('#errDivRegister').html('');
        $('.wrapLoader').show();
        $.ajax({
            url: baseurl + "ajax/ajaxUserSignUp.php",
            method: "POST",
            data: {"email": email, 'pwd': pwd, "name": name, "phone": phone, "countrycode": countryCode, "type": userType, 'g-recaptcha-response': capchaReponse}
        }).done(function (msg) {
            var resObj = eval("(" + msg + ")");
            var flag = resObj['flag'];
            if (flag == -1)
            {
                grecaptcha.reset(recaptcha2);
                $('#errDivRegister').html('<i class="fa-close"></i> Email id is already exists.');
                $('#textRegEmail').focus();
                return false;
            }
            if (flag == -2) {
                grecaptcha.reset(recaptcha2);
                $('.wrapLoader').hide();
                $('#errDivRegister').html('<i class="fa-close">' + resObj['msg'] + '</i> ');
                setTimeout(function () {
                    $('#errDivRegister').html('');
                }, 3000);
                return false;
            }
            if (flag == 0)
            {
                grecaptcha.reset(recaptcha2);
                $('#errDivRegister').html('<i class="fa-close"></i> Some thing went wrong. Please try after some time.');
                return false;
            }
            if (flag == 1)
            {
                $('#errDivRegister').html('');
                if (userType == 'tutor') {
                    window.location.href = baseurl + 'user-resume.php?type=tutor';
                } else {
//                    window.location.href = baseurl + 'user-resume.php?type=user';
                    window.location.href = baseurl + 'online_user_profile.php#UserBasic';
                }
                $('.wrapLoader').hide();

            }

        });
    });

    $('#userLogout').click(function () {
        localStorage.flag = 0;
        $.ajax({
            url: baseurl + "ajax/ajaxUserLogout.php",
            method: "POST"
        }).done(function (msg) {
            window.location.href = baseurl + 'index.php';
        });
    });

    /* Menu navigation */
    $('#tutorLoaderDiv').hide();
    $('.menuLi').click(function () {
        $('#tutorLoaderDiv').show();
        $('#detailDiv').hide();
        $('.menuLi').parent().removeClass('active');
        $(this).parent().addClass('active');
        var pageurl = window.location.href;
        var pagename = pageurl.substr(pageurl.lastIndexOf('/') + 1);
        var hashflag = pagename.indexOf("#");

        if (hashflag == -1 && (pagename != 'online_tutor_profile.php' || pagename != 'online_user_profile.php')) {
            if (typeflag == 'user') {
                window.location.href = baseurl + 'online_user_profile.php#' + $(this).attr('data-opt');
            }
            if (typeflag == 'tutor') {
                window.location.href = baseurl + 'online_tutor_profile.php#' + $(this).attr('data-opt');
            }
        } else if (hashflag == -1 && (pagename == 'online_tutor_profile.php' || pagename == 'online_user_profile.php'))
        {
            if ($(this).attr('data-opt') != 'profile') {
                var url = baseurl + 'ajax/ajax' + $(this).attr('data-opt') + '.php';
                $.ajax({
                    url: url,
                    method: "POST"
                }).done(function (msg) {
                    if (msg == -99)
                    {
                        window.location.href = baseurl + 'index.php';
                    }
                    $('#tutorLoaderDiv').hide();
                    $('#detailDiv').html(msg);
                    $('#detailDiv').show();
                });
            }
        } else {
            if ($(this).attr('data-opt') != 'profile') {
                var url = baseurl + 'ajax/ajax' + $(this).attr('data-opt') + '.php';
                $.ajax({
                    url: url,
                    method: "POST"
                }).done(function (msg) {
                    if (msg == -99)
                    {
                        window.location.href = baseurl + 'index.php';
                    }
                    $('#tutorLoaderDiv').hide();
                    $('#detailDiv').html(msg);
                    $('#detailDiv').show();
                });
            }
        }


    });

    /* Pagination */
    $('#detailDiv').on('click', ".ancIndexPageNavigation", function () {
        $('#tutorLoaderDiv').show();
        $('#detailDiv').hide();

        var url = baseurl + 'ajax/ajaxIndexTutors.php';
        var page = $(this).attr('data-page');

        $.ajax({
            url: url,
            method: "POST",
            data: {"page": page}
        }).done(function (msg) {
            $('#tutorLoaderDiv').hide();
            $('#detailDiv').html(msg);
            $('#detailDiv').show();
            $('html, body').animate({
                'scrollTop': $('#detailDiv').position().top
            });
        });
    });
    $('#tutorLoaderDiv').hide();
    $('#detailDiv').on('click', ".ancPageNavigation", function () {
        $('#tutorLoaderDiv').show();
        $('#detailDiv').hide();

        var url = baseurl + 'ajax/ajaxViewRequirements.php';
        var page = $(this).attr('data-page');

        $.ajax({
            url: url,
            method: "POST",
            data: {"page": page}
        }).done(function (msg) {
            $('#tutorLoaderDiv').hide();
            $('#detailDiv').html(msg);
            $('#detailDiv').show();
            $('html, body').animate({
                'scrollTop': $('#detailDiv').position().top
            });
        });
    });

    /* search */
    $("#txtLocation").geocomplete({
        details: ".geo-details",
        detailsAttribute: "data-geo"
    });
    $("#txtSubjectSearch").keyup(function () {
        $.ajax({
            type: "POST",
            url: baseurl + "ajax/ajaxGetSubjects.php",
            data: {'keyword': $(this).val()},
            beforeSend: function () {
                $("#txtSubjectSearch").css("background", "#FFF url(" + baseurl + "images/tutorloader-small.gif) no-repeat 640px");
            },
            success: function (data) {
                $("#subjectsDiv").show();
                $("#subjectsDiv").html(data);
                $("#txtSubjectSearch").css("background", "#FFF");
            }
        });
    });

    /* profile common */
    $("#txtFilterLocation").geocomplete({
        details: ".geo-details",
        detailsAttribute: "data-geo"
    });

    $('#detailDiv').on('click', ".clsChatUser", function () {
        var thisObj = $(this);
        var receiverid = thisObj.attr('data-user');
        var receivername = thisObj.attr('data-name');
        var receiverphotoname = thisObj.attr('data-photo-name');
        var receiverphotofloder = thisObj.attr('data-photo-floder');
        var user_photo_url = '<i class="fa-user fa-user-chat"></i>';
        if (receiverphotoname != '') {
            user_photo_url = '<img src="' + baseurl + 'uploads/' + receiverphotofloder + '/profile/' + receiverphotoname + '" />';
        }
        $('#tutorLoaderDiv').show();
        $('#detailDiv').hide();
        $('.menuLi').parent().removeClass('active');
        $('#ancChatLounge').parent().addClass('active');

        var url = baseurl + 'ajax/ajaxChatLounge.php';
        $.ajax({
            url: url,
            method: "POST",
            data: {'receiverid': receiverid, 'remote_user_name': receivername, 'remote_user_photo_url': user_photo_url}
        }).done(function (msg) {
            if (msg == -99)
            {
                window.location.href = baseurl + 'index.php';
            }
            $('#tutorLoaderDiv').hide();
            $('#detailDiv').html(msg);
            $('#detailDiv').show();
            $('html, body').animate({
                'scrollTop': $('#detailDiv').position().top
            });
        });
    });

    $('#detailDiv').on('click', ".ancUserChat", function () {
        /* $('#chatLoaderDiv').show();
         var thisObj = $(this);
         var referenceid = thisObj.attr('data-referenceid');
         $.ajax({
         url: baseurl+"ajax/ajaxChatMessage.php",
         method:"POST",
         data: {"referenceid":referenceid}
         }).done(function(msg) {            
         if(msg == -99)
         {
         window.location.href = baseurl+'index.php';
         }
         $('#chatLoaderDiv').hide();
         $('.ancUserChat').removeClass('active-chat');
         thisObj.addClass('active-chat');
         $('#chatDivRight').html(msg);
         $('#chatDataRight').animate({
         'scrollTop' : $('#scrollDiv').offset().top
         });
         }); */
    });

    $('#detailDiv').on('click', ".clsChatTutor", function () {
        var thisObj = $(this);
        var receiverid = thisObj.attr('data-user');
        var receivername = thisObj.attr('data-name');
        var receiverphotoname = thisObj.attr('data-photo-name');
        var receiverphotofloder = thisObj.attr('data-photo-floder');
        var usertype = thisObj.attr('data-type');
        createCookie("tp_tutor_id", receiverid, 1);
        createCookie("tp_tutor_name", receivername, 1);
        createCookie("tp_tutor_photo_name", receiverphotoname, 1);
        createCookie("tp_tutor_photo_floder", receiverphotofloder, 1);
        if (usertype == '') {
            window.location.href = baseurl + 'user-login.php?type=signin';
            return false;
        } else {
            if (usertype == 'tutor') {
                window.location.href = baseurl + 'online_tutor_profile.php#TutorBasic';
            } else {
                window.location.href = baseurl + 'online_user_profile.php#UserBasic';
            }
        }
    });
    $('.clsChatIndividual').click(function (e) {
        var thisObj = $(this);
        var receiverid = thisObj.attr('data-user');
        var receivername = thisObj.attr('data-name');
        var receiverphotoname = thisObj.attr('data-photo-name');
        var receiverphotofloder = thisObj.attr('data-photo-floder');
        var usertype = thisObj.attr('data-type');
        createCookie("tp_tutor_id", receiverid, 1);
        createCookie("tp_tutor_name", receivername, 1);
        createCookie("tp_tutor_photo_name", receiverphotoname, 1);
        createCookie("tp_tutor_photo_floder", receiverphotofloder, 1);
        if (usertype == '') {
            window.location.href = baseurl + 'user-login.php?type=signin';
            return false;
        } else {
            if (usertype == 'tutor') {
                window.location.href = baseurl + 'online_tutor_profile.php#TutorBasic';
            } else {
                window.location.href = baseurl + 'online_user_profile.php#UserBasic';
            }
        }
    });
    $('.sendmsg').click(function (e) {
        if (typeflag == '') {
            createCookie("tp_tutor_send_type", $(this).data('type'), 1);
            createCookie("tp_tutor_send_user", $(this).data('user'), 1);
            createCookie("tp_tutor_send_name", $(this).data('name'), 1);
            $('.wrapLoader').show();
            setTimeout(function () {
                window.location.href = baseurl + 'user-login.php?type=signin';
            }, 1000);
            return false;
        } else {
            $(".sendmsg").colorbox({
                inline: true,
                opacity: 0.35,
                width: 600,
                onLoad: function () {
                    if (typeflag == '') {
                        window.location.href = baseurl + 'user-login.php?type=signin';
                        return false;
                    } else {
                        $('#divSendMessage').show();
                        $('#txtChatUserId').val($(this).data('user'));
                        $('#txtChatName').val($(this).data('name'));
                    }
                },
                onClosed: function () {
                    $('#divSendMessage').hide();
                    $('#txtChatMessage').val('');
                    createCookie("tp_tutor_send_user", "", -1);
                    createCookie("tp_tutor_send_name", "", -1);
                    createCookie("tp_tutor_send_type", "", -1);
                }
            });
        }
    });

    $('#btnSendMsg').click(function () {
        var chatMsg = $('#txtChatMessage').val();
        var chatSubject = $('#txtChatSubject').val();
        var userid = $('#txtChatUserId').val();
        $("#divSendMessage input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
        });
        if (chatSubject == '') {
            $('.txtClass').next().html('');
            $('#txtChatSubject').next().html('Please enter subject');
            $('#txtChatSubject').focus();
            $('#txtChatSubject').css('border-color', 'red');
            return false;
        } else if (chatMsg == '') {
            $('#txtChatSubject').css('border-color', '#ccc');
            $('.txtClass').next().html('');
            $('#txtChatMessage').next().html('Please enter message');
            $('#txtChatMessage').focus();
            $('#txtChatMessage').css('border-color', 'red');
            return false;
        }
        $('.txtClass').next().html('');
        $("#divSendMessage input,textarea,select").each(function () {
            $(this).css('border-color', '#ccc');
        });

        $.ajax({
            url: baseurl + "ajax/ajaxSendMessage.php",
            method: "POST",
            data: {'chatmsg': chatMsg, 'userid': userid, 'subject': chatSubject}
        }).done(function (msg) {
            if (msg == -99)
            {
                window.location.href = 'index.htm';
            } else if (msg === 0)
            {
                alert('Something went wrong! Please try after sometime.');
            } else if (msg == 2)
            {
                alert('You have already respond to this requirement.');
            } else {
                $('#txtChatSubject').val('');
                $('#txtChatMessage').val('');
                $.colorbox.close();
                createCookie("tp_tutor_send_user", "", -1);
                createCookie("tp_tutor_send_name", "", -1);
                createCookie("tp_tutor_send_type", "", -1);
                alert('Your message sent successfully!');
            }
        });
    });

});
