$(document).ready(function () {
    var vu = $('#varData1').val();
    var start_from = 0;
    var limit_val = 9;
    var v = false;
    var lastFlag = false;
    var clastFlag = false;
   if(pflag == 1){
       getUserProfile(vu);
       getUserSocial(vu);
       getUserCourses(vu, 'box', start_from, limit_val,true);
   }
   if(pflag == 3){
       getUserProfile(vu);
       getUserSocial(vu);
       getUserCourses(vu, 'box', start_from, limit_val,true);
       getUserEnrollCourses(vu, 'box', start_from, limit_val);
   } 
   if(pflag == 2){
    getUserEnrollCourses(vu, 'box', start_from, limit_val);
   }
    //getUserFollowing(vu);
    //getUserFollowers(vu);

    $("#ancViewCourses").on('click', function () {
        $('html, body').animate({
            'scrollTop': $("#coursesDiv").position().top + 390
        });
    });
    $("#ancEnrollToggleList").on('click', function () {
        var ty = $(this).data('type');
        start_from = 0;
        lastFlag = false;
        $('#ancCourseMore').show();
        $("#ancCourseMore").data('type', ty);
        getUserEnrollCourses(vu, ty, start_from, limit_val);
    });
    $("#ancEnrollCourseMore").on('click', function () {
        var ty = $(this).data('type');
        start_from = start_from + limit_val;
        if (lastFlag == false) {
            getUserEnrollCourses(vu, ty, start_from, limit_val,true);
        }
    }); 
	$("#ancToggleList").on('click', function () {
        var ty = $(this).data('type');
        start_from = 0;
        lastFlag = false;
        $('#ancCourseMore').show();
        $("#ancCourseMore").data('type', ty);
        getUserCourses(vu, ty, start_from, limit_val);
    });
    $("#ancCourseMore").on('click', function () {
        var ty = $(this).data('type');
        start_from = start_from + limit_val;
        if (clastFlag == false) {
            getUserCourses(vu, ty, start_from, limit_val,true);
        }
    }); 
    $("#ancViewFollowing").on('click', function () {
        $('html, body').animate({
            'scrollTop': $("#followingDiv").position().top + 390
        });
    });
    $("#ancViewFollowers").on('click', function () {
        $('html, body').animate({
            'scrollTop': $("#followersDiv").position().top + 390
        });
    });
    function getUserProfile(vu) {
        $.ajax({
            url: videobaseurl + "/ajax/ajaxGetUserPersonal.php",
            method: "POST",
            data: {'vu': vu}
        }).done(function (returnData) {
            $('#personalDisplayDiv').html(returnData);
        });
    }

    function getUserSocial(vu) {
        $.ajax({
            url: videobaseurl + "/ajax/ajaxGetUserSocialList.php",
            method: "POST",
            data: {'vu': vu}
        }).done(function (returnData) {
            $('#socialDisplayDiv').html(returnData);
        });
    }
     $('#enrollDisplayDiv').on('click','.clsPage',function(){
      var st = $(this).data('start');
      var t = $(this).data('type');
      getUserEnrollCourses(vu, t, st, limit_val,true);   
   });
    function getUserEnrollCourses(vu, ty, start_from, limit_val,heightFlag=false) {
        $.ajax({
            url: videobaseurl + "/ajax/ajaxGetUserEnrollCourses.php",
            method: "POST",
            data: {'vu': vu, "type": ty, "start_from": start_from, "limit_val": limit_val}
        }).done(function (returnData) {
            if (returnData == '') {
                $('#ancEnrollCourseMore').hide();
                lastFlag = true;
                $('#enrollDisplayDiv').html("<div class='clear'></div>No more courses available!</div>");
                $('#divNoMore').fadeOut(5000);
            }
            if (start_from) {
                //if(ty == 'list'){
                //   $('#crsTable').append(returnData); 
                //  } else {
                $('#enrollDisplayDiv').html(returnData);
                //}   
                //$('#ancCourseMore').show();           
            } else {
                $('#enrollDisplayDiv').html(returnData);
                //$('#ancCourseMore').show();
            }
            if(heightFlag){
               if($('.content-wrapper').height() == 1596){
                  $('.content-wrapper').css("height", "auto");
               }
            }else{
               //$('.content-wrapper').css("height", "1596");
            }
            if (ty == 'list') {
                $("#ancEnrollToggleList").data('type', 'box');
                $("#ancEnrollToggleList").html('<i class="fa fa-th-large" aria-hidden="true"></i>');
            } else {
                $("#ancEnrollToggleList").data('type', 'list');
                $("#ancEnrollToggleList").html('<i class="fa fa-th-list" aria-hidden="true"></i>');
            }
        });
    }
   
   $('#coursesDisplayDiv').on('click','.clsPage',function(){
      var st = $(this).data('start');
      var t = $(this).data('type');
      getUserCourses(vu, t, st, limit_val,true);   
   });
	function getUserCourses(vu, ty, start_from, limit_val,heightFlag=false) {
        $.ajax({
            url: videobaseurl + "/ajax/ajaxGetUserCourses.php",
            method: "POST",
            data: {'vu': vu, "type": ty, "start_from": start_from, "limit_val": limit_val}
        }).done(function (returnData) {

            if (returnData == '') {
                clastFlag = true;
                $('#coursesDisplayDiv').html("<div class='clear'></div><div id='divNoMore' class='no-sales error-er'>No more courses available!</div>");
                $('#ancCourseMore').hide();
                $('#divNoMore').fadeOut(5000);
            }

            if (start_from) {
                //if(ty == 'list'){
                //   $('#crsTable').append(returnData); 
                //  } else {
                $('#coursesDisplayDiv').html(returnData);               
                //}   
                //$('#ancCourseMore').show();           
            } else {
                $('#coursesDisplayDiv').html(returnData);
                //$('#ancCourseMore').show();
            }
            if(heightFlag){
               if($('.content-wrapper').height() == 1596){
                  $('.content-wrapper').css("height", "auto");
               }
            }else{
               //$('.content-wrapper').css("height", "1596");
            }
            
            if (ty == 'list') {
                $("#ancToggleList").data('type', 'box');
                $("#ancToggleList").html('<i class="fa fa-th-large" aria-hidden="true"></i>');
            } else {
                $("#ancToggleList").data('type', 'list');
                $("#ancToggleList").html('<i class="fa fa-th-list" aria-hidden="true"></i>');
            }
        });
    }
    function getUserFollowing(vu) {
        $.ajax({
            url: videobaseurl + "/ajax/ajaxGetUserFollowing.php",
            method: "POST",
            data: {'vu': vu}
        }).done(function (returnData) {
            $('#followingDisplayDiv').html(returnData);
        });
    }
    function getUserFollowers(vu) {
        $.ajax({
            url: videobaseurl + "/ajax/ajaxGetUserFollowers.php",
            method: "POST",
            data: {'vu': vu}
        }).done(function (returnData) {
            $('#followersDisplayDiv').html(returnData);
        });
    }
});