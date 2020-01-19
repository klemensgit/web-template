$(document).ready(function(){
    // enter code here

    function getAjaxRespons(){
        $.ajax({
            url: "./utils/ajaxrespons.php?func=getData&limit=2",
            type: "GET",
            success: function(data){
                console.log(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown); 
			}
        });
    }
    getAjaxRespons();


    function getAjaxRespons1(){
        $.ajax({
            url: "./utils/ajaxrespons.php",
            type: "POST",
            data: {
                'func': 'getData',
                'limit': 1,
            },
            success: function(data){
                console.log(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown); 
			}
        });
    }
    getAjaxRespons1();
});