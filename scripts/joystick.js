

	function Joystick (){
            this.on = false;
            this.analogStick = {
                on : false,
                phase : 0+Math.PI/2,
                
                X : undefined,
                Y : undefined,
                R : 50,
                x : undefined,
                y : undefined,
                r : 30,
                
                
            };
			this.renderAnalogStick = function(){
                
                        ctx.beginPath();
                        ctx.strokeStyle = 'white';
                        ctx.fillStyle = 'blue';
                        ctx.lineWidth = 2;
                        ctx.arc(this.analogStick.X,this.analogStick.Y,this.analogStick.R,0,Math.PI*2,true);
                        ctx.stroke();
                        //ctx.fill();
                        ctx.closePath();
            
                        ctx.beginPath();
                        ctx.strokeStyle = 'white';
                        ctx.fillStyle = 'red';
                        ctx.lineWidth = 2;
                        ctx.arc(this.analogStick.x,this.analogStick.y,this.analogStick.r,0,Math.PI*2,true);
                        ctx.stroke();
                        //ctx.fill();
                        ctx.closePath();
            }
            
        
        
        };



// Mouse controls
        document.onmousedown = function(e){
            joystick.analogStick.on = true;
            
            joystick.analogStick.X = joystick.analogStick.x = e.x;
            joystick.analogStick.Y = joystick.analogStick.y = e.y;
        
        };
        document.onmousemove = function(e){
        
            if( r( joystick.analogStick.X , joystick.analogStick.Y , e.x , e.y ) < joystick.analogStick.R  ){
                joystick.analogStick.x = e.x;
                joystick.analogStick.y = e.y;
                spaceship.thruster.main = false;
            }else if(joystick.analogStick.on){
                spaceship.thruster.main = true;
                joystick.analogStick.x = joystick.analogStick.X + Math.cos(joystick.analogStick.phase-Math.PI)*joystick.analogStick.R;
                joystick.analogStick.y = joystick.analogStick.Y + Math.sin(joystick.analogStick.phase-Math.PI)*joystick.analogStick.R;
            }
            
            if(joystick.analogStick.on)
            joystick.analogStick.phase =  Math.atan2( (e.y - joystick.analogStick.Y) , (e.x - joystick.analogStick.X) ) +Math.PI  ;
            
            spaceship.angle = joystick.analogStick.phase - Math.PI/2;
            
            
        };
        
        document.onmouseup = function(){
            joystick.analogStick.on = false;
            
            joystick.analogStick.X = joystick.analogStick.x = undefined;
            joystick.analogStick.Y = joystick.analogStick.y = undefined;
            //joystick.analogStick.phase = undefined;
            
            spaceship.thruster.main = false;
        };
        
        
        
        
        
        // Touch Controls
		/*
        ondevicemotion = function(e){
            g.x = -e.accelerationIncludingGravity.x;
            g.y = e.accelerationIncludingGravity.y;
            g.z = e.accelerationIncludingGravity.z;
            
            if( Math.abs(g.x)>1/game.sensitivity ){
                spaceship.position.x += g.x;   
            }
        
        };
		*/
		
		
		
		window.ontouchmove = function(e){
			
			//console.log('move');
			
			//alert('mov');
			
			if( r( joystick.analogStick.X , joystick.analogStick.Y ,  e.touches[0].clientY , canvas.height - e.touches[0].clientX ) < joystick.analogStick.R  ){
                joystick.analogStick.x =  e.touches[0].clientY;
                joystick.analogStick.y = canvas.height - e.touches[0].clientX;
                spaceship.thruster.main = false;
            }else if(joystick.analogStick.on){
                spaceship.thruster.main = true;
                joystick.analogStick.x = joystick.analogStick.X + Math.cos(joystick.analogStick.phase-Math.PI)*joystick.analogStick.R;
                joystick.analogStick.y = joystick.analogStick.Y + Math.sin(joystick.analogStick.phase-Math.PI)*joystick.analogStick.R;
            }
            
            if(joystick.analogStick.on)
				joystick.analogStick.phase =  Math.atan2( (canvas.height - e.touches[0].clientX - joystick.analogStick.Y) , ( e.touches[0].clientY - joystick.analogStick.X) ) +Math.PI  ;
            
            spaceship.angle = joystick.analogStick.phase - Math.PI/2 ;
			
			
		}
		
		
        window.ontouchstart = function(e){
			
			//console.log('start');
			
			//alert('mov');
			
			if(!spaceship.crashed){
				initiate.canvas(innerWidth,innerHeight);
				setFullscreen(canvas);
				
				window.cancelAnimationFrame(animLoopReqID);
				game.start = true;
				animLoopReqID = requestAnimationFrame(game);
				
				//setFullscreen(canvas);
				
			}else{
				window.cancelAnimationFrame(animLoopReqID);
                animLoopReqID = requestAnimationFrame(astrofield);
				
				//exitFullscreen();
				
				init();
			}
			
			
			if(e.touches[0].clientY > canvas.width/2){
				if(!spaceship.crashed && game.start)
					missiles.push(new Missile(spaceship.position.x,spaceship.position.y,spaceship.angle));
            }else{
				joystick.analogStick.on = true;
            
				joystick.analogStick.X = joystick.analogStick.x =  e.touches[0].clientY;
				joystick.analogStick.Y = joystick.analogStick.y = canvas.height - e.touches[0].clientX;
			}
            
        }
		window.ontouchend =function(){
			
			//console.log('end');
			
			//alert('mov');
			
			joystick.analogStick.on = false;
            
            joystick.analogStick.X = joystick.analogStick.x = undefined;
            joystick.analogStick.Y = joystick.analogStick.y = undefined;
            //joystick.analogStick.phase = undefined;
            
            spaceship.thruster.main = false;
		}
		
		
		
		
		
		
		
		
		
		
		
		
		        
        // keyboard controls
        onkeyup = function (event){
            //alert(event.keyCode);
            switch(event.keyCode){
                case 37:
                    // Left Arrow key
                    spaceship.thruster.right = false;
                    break;
                case 39:
                    // Right Arrow key
                    spaceship.thruster.left = false;
                    break;
                case 38:
                    // Up Arrow key
                    spaceship.thruster.main = false;
                    spaceship.thruster.flame = 7;
                    //spaceship.engineOn = false;
                    break;
            }
        }
        onkeydown = function(event){
            //alert(event.keyCode);
            switch(event.keyCode){
                case 13:
					initiate.canvas(innerWidth,innerHeight);
					setFullscreen(canvas);
					if(!spaceship.crashed){
						window.cancelAnimationFrame(animLoopReqID);
						game.start = true;
						animLoopReqID = requestAnimationFrame(game);
					}
                    else{
						window.cancelAnimationFrame(animLoopReqID);
                        animLoopReqID = requestAnimationFrame(astrofield);
						init();
						//setFullscreen(canvas);
					}	
                    break;
                    
                case 27:
                    game.paused = !game.paused;
                    break;
                
                case 16:
                    // Left Arrow key
                    spaceship.engineOn = !spaceship.engineOn;
                    break;
                case 37:
                    // Left Arrow key
                    spaceship.thruster.right = true;
                    break;
                case 39:
                    // Right Arrow key
                    spaceship.thruster.left = true;
                    break;
                case 38:
                    // Up Arrow key
                    spaceship.thruster.main = true;
                    spaceship.thruster.flame = 20;
                    break;
                case 32:
                    if(!spaceship.crashed && spaceship.power ==25 ){
                        //missiles.push(new Missile(spaceship.position.x,spaceship.position.y,spaceship.angle));
						
						bloodhounds.push(new Vehical(spaceship.position.x,spaceship.position.y));
						spaceship.power = 0;
					}	
                    break;
            }
        }
        
        
        
		
		function setFullscreen(element) {
			if(element.requestFullscreen)
				element.requestFullscreen();
			else if(element.mozRequestFullScreen)
				element.mozRequestFullScreen();
			else if(element.webkitRequestFullscreen)
				element.webkitRequestFullscreen();
			else if(element.msRequestFullscreen)
				element.msRequestFullscreen();
		}
		function exitFullscreen() {
			if(document.exitFullscreen)
				document.exitFullscreen();
			else if(document.mozCancelFullScreen)
				document.mozCancelFullScreen();
			else if(document.webkitExitFullscreen)
				document.webkitExitFullscreen();
			else if(document.msExitFullscreen)
				document.msExitFullscreen();
		}
		function IsFullScreenCurrently() {
			var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
			if(full_screen_element === null)
				return false;
			else
				return true;
		}
        
        
        
        
        
        
        