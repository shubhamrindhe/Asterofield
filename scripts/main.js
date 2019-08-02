	var canvas,ctx,box;
	var spaceship;
	var joystick;
	
	var egg = "";
	var title = "ASTEROFIELD";
	var title_msg = title;
	var msg = "Press Enter to Start !";
	var device;
        
    var stars = new Array();
    var fallout = new Array();
    var missiles = new Array();
    var astroides = new Array();
    var blastColor = ['orange','yellow','gray'];
	
	var max_astro = innerWidth< innerHeight ? 5 : 10 ;
        
    var g = {    x :    undefined,    y : undefined,    z : undefined,    };
    var mouse = {    x : undefined,    y : undefined,    };
    var key = [115,104,117,98,104,97,109,114,105,110,100,104,101];
	
	var animLoopReqID ;
        
	
	var bloodhounds = [];

	
    window.onload = function(){
		
		if(innerHeight>innerWidth)
			device = 'mob';
		else	
			device = 'mon';
		
        initiate.canvas(innerWidth,innerHeight);
		
		init();
		
		joystick = new Joystick();
		
		Star.init(device);
            
        if(initiate.verification())
            animLoopReqID = requestAnimationFrame(astrofield);
        else
            initiate.antiPiracyProtocol();
     
        setInterval(function(){ 
            HUD.FPS = HUD.Framecount ;
            HUD.Framecount = 0;
        },1000);
		
		
    };
	
	function init(){
		spaceship = new Spacecraft(canvas.width/2,canvas.height-100);
       
        game.start = false;
        game.paused = false;
        game.score = 0;
        game.sensitivity = 3;
        game.mode = 'hardcore';
		
		astroides = [];	
		bloodhounds = [];
		for(var i=0;i<5;++i){
			bloodhounds.push(new Vehical(random(0,innerWidth),random(0,innerHeight)));
		}
		
	}
	
	
	function generate( array ,r1,r2){
		var par;
		for(var i=0;i<1;++i){
            var rad = random(r1,r2);
            var x=random(rad,innerWidth);
            var y=random(-50,-10);
            if(i!=0){
                for(var j=0;j< array.length;++j){
					if( distance({x,y},array[j]).r-2*rad < 0){
						x=random(rad,innerWidth-rad);
						y=random(rad,innerHeight/2-rad);
						j=-1;
					}
					
				}
			}
			par =  new Particle(x,y,rad);
        }
		return par;
	}
	