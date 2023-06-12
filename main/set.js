const $ = require('jquery')



$('.tc_li').click(function (e) {    
    $(this).css({color:"red"})    
    $('.tc_tit').siblings(".tc_ol").hide()
});


$('.tc_tit').click(function (e) {  
    $('.tc_tit').siblings(".tc_ol").hide()
    $(this).siblings(".tc_ol").show()
});

var tomeIs = false;
$('.tc_ol').on("mouseenter", function() {
    tomeIs = false;
    
    $('.tc_ol').on("mouseleave", function() {
        tomeIs = true;
    setTimeout(() => {
            if(tomeIs){
                $('.tc_ol').fadeOut()  
            }
        }, 2100);
    })
})

var pylShowed = false;
$('.btnToShowPyl').click(function(){
    if(!pylShowed){
        $('.pyl_cont').css({
            right:'0'
        })

        $('.plyArrow_img').css({
            transform: 'rotate(-180deg)'
        })

        pylShowed = !pylShowed
    }else{
        $(this).data("is-click", 'false')
        $('.pyl_cont').css({
            right:'-560px'
        })
        
        $('.plyArrow_img').css({
            transform: 'rotate(0)'
        })
        pylShowed = !pylShowed
    }
})

setInterval(() => {
    var dt = new Date();
    var dtm = dt.getMinutes();
    var dts = dt.getSeconds();
    var dth = dt.getHours();
    if (dtm < 10) { dtm = "0"+dtm; }
    if (dts < 10) { dts = "0"+dts; }
    if (dth < 10) { dth = "0"+dth; }
    $('.ni_cs').text(dts);  
    $('.nic_mm').text(dtm);
    $('.nic_mc').text(dth);
}, 1000);


$(document).on('click', '.tcd_r', function() {

    var isClicked = $(this).data('is-clicked');
    
    $(this).css({
        transform: 'scale(75%)'
    });
    setTimeout(() => {
        $(this).css({
            transform: 'scale(100%)'
        });
    }, 100);
    if (isClicked === 'false') {
        $(this).attr('src', './images/inr.png');
        $(this).data('is-clicked', 'true');
    } else {
        $(this).data('is-clicked', 'false');
        $(this).attr('src', './images/inre.png');
    }
});


$('.tcd_add').click(() => {
    $('.tcd_l_i_adt').hide();
    $('.tcd_lin').val(" ");
    $('.tcd_ul').empty();

})

var btnadtcli = false;
$('.btn_addTask').click(function (e) { 
    if(!btnadtcli){
        btnadtcli = !btnadtcli
        $('.tcd_l_i_adt').css({display:'flex'})
    }else{
        btnadtcli = !btnadtcli
        $('.tcd_l_i_adt').hide()
    }
});



dayOfWeek();
function dayOfWeek(){
    var dt = new Date();
    var days = [ 'Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    
    $('.ni_d').text(days[dt.getDay()]);
}

