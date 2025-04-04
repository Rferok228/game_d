let nick;

$("#go").click(function(){
    if (document.getElementById("nick").value.length <= 2 || document.getElementById("nick").value.length >= 16)
    {
        alert("Имя не введено или слишком велико");
        
    }
    else {
        nick = document.getElementById("nick").value;
        $("#block-start").css("display", "none");
        $("#game").css("display", "flex");
        $("#nickname").append(nick);
        play_game();
    }
});


function play_game () {
        
    let interv;
    let time = 30;
    
    function timer(status)
    {
        interv = setInterval(function() {
            time--;
            $("#timer").text(time);
            if(time == 0)
            {
                clearInterval(interv);
                game_over("Time's up");
            }
        },1000);
    }
    timer();


    $("#kol_d").text(0)
    $(document).off("keydown");
    $("main").empty();
    for (let i = 0; i < 260; i++)
    {
        $("<div class = 'koob"+ i+"'class='koob'></div>").appendTo("main");
        $(".koob"+i).addClass("koob");
       
    }
    
    let num_block = 0;

    for (let x = 0; x < 10; x++)
        {
            for (let y = 0; y < 26; y++)
            {
                $(".koob"+num_block).attr("id", "position_"+x+"_"+y);
                num_block++;
            }
        }

    function proverka_id_stone (mass, ran_n) {
        for(let i = 0; i < mass.length; i++)
        {
            if(mass[i] === ran_n)
            {
                return true;
            }
        }
        return false;
    }

    function proverka_id_dimond (mass, ran_n, mass_d) {
        for(let i = 0; i < mass.length; i++)
        {
            if(mass[i] === ran_n)
            {
                return true;
            }
        }
        for(let i = 0; i < mass_d.length; i++)
            {
                if(ran_n === mass_d[i])
                {
                    return true;
                }
            }
        return false;
    }


    let mass_s = [];
    let r_n_s;

    for (let i = 0; i < 10; i++)
    {
        r_n_s = Math.floor(Math.random() * (260 - 2 + 1)) + 2;
            do
            {
                r_n_s = Math.floor(Math.random() * (260 - 2 + 1)) + 2;
            }
            while(proverka_id_stone(mass_s, r_n_s));
            mass_s[i] = r_n_s;
            $(".koob"+ mass_s[i]).addClass("stone");
    }

    let r_n_d;  
    let mass_d = [];

    for (let i = 0; i < 10; i++)
        {  
            r_n_d = Math.floor(Math.random() * (260 - 2 + 1)) + 2;
            do
                {
                    r_n_d = Math.floor(Math.random() * (260 - 2 + 1)) + 2;
                }
                while(proverka_id_dimond(mass_s, r_n_d, mass_d));
                mass_d[i] = r_n_d;
                $(".koob"+ mass_d[i]).addClass("dimond");
        }



        let status = false;
        function game_over(wh_d) {
            console.log("died");
            $("#game_over").css("display", "flex");
            $("#why-die").text(wh_d+ "(");
            $("#h_dim").text(" "+kol_dimond);
            $("#h_nick").text(nick);
            $("#h_tim").text(" "+(30 - time));
            status = true;
            clearInterval(interv);
            
        }
        
        function game_win() {
            $("#game_win").css("display", "flex");
            status = true;
            clearInterval(interv);
        }

    $(".koob0").prepend('<div id = "miner"></div>');


function padenie(kordx, kordy, type)
{
    setTimeout(function(){
    let num_block_und = 0;
    let num_block_up = 1;
    if($("#position_"+(kordx - 1)+"_"+kordy).hasClass("broke"))
    {

    }
    else
    {
    for(;($("#position_"+(kordx + num_block_und)+"_"+kordy).hasClass("broke")); num_block_und++)
        {
            console.log(status);
            if(status) return;
            $("#position_"+(kordx-num_block_up)+"_"+kordy).removeClass(type).addClass("broke");
            $("#position_"+(kordx+num_block_und)+"_"+kordy).addClass(type).removeClass("broke");
            num_block_up--;
            console.log($("#position_"+(kordx+num_block_und)+"_"+kordy).attr("id"));
            if($("#miner").parent().hasClass("stone"))
                {
                    game_over("You died from a falling stone");
                }
            else if($("#miner").parent().hasClass("dimond"))
                {
                    game_over("You died from a falling dimond");
                }
        }
    }
    }, 1000);
    
       

}






// w - 87
// s - 83
// a - 65
// d - 68

let p_x = 0;
let p_y = 0;
let kol_dimond = 0;
let type;

//---------------------------------------------------------------------------------------------------------------------------------------
    $(document).keydown(function(event) {
        if(status) return;
        let num_key = event.keyCode;
        switch (num_key)
        {
            case 83:
                if(p_x < 9)
                {
                    if ($("#position_"+(p_x+1)+"_"+p_y).hasClass("stone"))
                    {
                    }
                    else {
                    p_x++;
                    
                    $("#position_"+p_x+"_"+p_y).prepend($("#miner"));
                    if ($("#position_"+p_x+"_"+p_y).hasClass("dimond")) 
                        {
                            kol_dimond++;
                            if(kol_dimond == 10)
                                {
                                    game_win();
                                }
                            $("#kol_d").text(kol_dimond);
                            $("#position_"+p_x+"_"+p_y).removeClass("dimond");
                        }
                    $("#position_"+p_x+"_"+p_y).addClass("broke");
                    }
                }
            break;
            case 87:
                if(p_x > 0)
                {
                    if ($("#position_"+(p_x-1)+"_"+p_y).hasClass("stone"))
                    {
                    }
                    else {
                    p_x--;
                        
                    $("#position_"+p_x+"_"+p_y).prepend($("#miner"));
                    if ($("#position_"+p_x+"_"+p_y).hasClass("dimond")) 
                        {
                            kol_dimond++;
                            if(kol_dimond == 10)
                                {
                                    game_win();
                                }
                            $("#kol_d").text(kol_dimond);
                            $("#position_"+p_x+"_"+p_y).removeClass("dimond");
                        }
                        $("#position_"+p_x+"_"+p_y).addClass("broke");
                    }
                }
                if($("#position_"+(p_x-1)+"_"+p_y).hasClass("dimond") || $("#position_"+(p_x-1)+"_"+p_y).hasClass("stone"))
                    {
                        if($("#position_"+(p_x-1)+"_"+p_y).hasClass("dimond"))
                            {
                                type = "dimond";
                            }
                            else{type = "stone";}
                            padenie(p_x, p_y, type);
                    }
            break;
            case 65:
                if(p_y > 0)
                {
                    if ($("#position_"+p_x+"_"+(p_y-1)).hasClass("stone"))
                    {
                    }
                    else {
                    p_y--;
                    
                    $("#position_"+p_x+"_"+p_y).prepend($("#miner"));
                    if ($("#position_"+p_x+"_"+p_y).hasClass("dimond")) 
                        {
                            kol_dimond++;
                            if(kol_dimond == 10)
                                {
                                    game_win();
                                }
                            $("#kol_d").text(kol_dimond);
                            $("#position_"+p_x+"_"+p_y).removeClass("dimond");
                        }
                        $("#position_"+p_x+"_"+p_y).addClass("broke");
                    }
                }
                if($("#position_"+(p_x-1)+"_"+p_y).hasClass("dimond") || $("#position_"+(p_x-1)+"_"+p_y).hasClass("stone"))
                    {
                        if($("#position_"+(p_x-1)+"_"+p_y).hasClass("dimond"))
                            {
                                type = "dimond";
                            }
                            else{type = "stone";}
                            padenie(p_x, p_y, type);
                    }
            break;
            case 68:
                if(p_y < 25)
                    {
                        if ($("#position_"+p_x+"_"+(p_y+1)).hasClass("stone"))
                        {
                        }
                        else {
                        p_y++;
                        
                        
                        $("#position_"+p_x+"_"+p_y).prepend($("#miner"));
                        if ($("#position_"+p_x+"_"+p_y).hasClass("dimond")) 
                            {
                                kol_dimond++;
                                if(kol_dimond == 10)
                                    {
                                        game_win();
                                    }
                                $("#kol_d").text(kol_dimond);
                                $("#position_"+p_x+"_"+p_y).removeClass("dimond");
                            }
                            $("#position_"+p_x+"_"+p_y).addClass("broke");
                        }
                    }
                    if($("#position_"+(p_x-1)+"_"+p_y).hasClass("dimond") || $("#position_"+(p_x-1)+"_"+p_y).hasClass("stone"))
                    {
                        if($("#position_"+(p_x-1)+"_"+p_y).hasClass("dimond"))
                        {
                            type = "dimond";
                        }
                        else{type = "stone";}
                        padenie(p_x, p_y, type);
                    }
            break;
            
        }
    });
    
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------   
    
$("#restart").click(function(){
    $("#game_over").css("display", "none");
    play_game();
})


