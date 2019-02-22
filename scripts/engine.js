

		function game(){
            
            animLoopReqID = requestAnimationFrame(game);
            ++HUD.Framecount;
			
			
            
            if(!game.paused){
            
                    ctx.clearRect(0, 0, canvas.width, canvas.height); 
                    background(stars,innerHeight*innerWidth/10000);
					
					
                
                    if(astroides.length< max_astro && game.start )
                        initiate.particles(astroides,1,10,20);
                        
                    astroides.forEach(function(particle){
                        particle.update();
                    });
					
                    missiles.forEach(function(m){
                        m.render();
                    });
                    fallout.forEach(function(particle){
                        particle.explode();
                    });
                    
                    
                    
                    if(!spaceship.crashed){
                        spaceship.update();
                    }else{
                        if(!spaceship.exploded){
                            initiate.blast(fallout,20,spaceship.position.x,spaceship.position.y);
                            spaceship.exploded = true;
                        }
                    }
                    
                    // Render Title
                    if(!game.start){
                        glitch("BattleSpace",canvas.width/2 ,canvas.height/2-100,3 );
                    }
                    
                    if(spaceship.exploded){
                        //initiate.gameOver();
                        initiate.text('Game Over !',false);
                    }else if(!game.start){
                        //initiate.startGame();
                        
                        
                    }
                      
                    if(joystick.analogStick.on)
                        joystick.renderAnalogStick();
                    
                    //HUD.displayFPS();
                    //game.displayScore();
            }else{
                ctx.save();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
				initiate.background(stars,innerHeight*innerWidth/10000);
                ctx.restore();
                initiate.text('Game Paused');
            }  
        }
		
		
		function background(array,n){
						if(array.length<n){
								var x = 1 + Math.floor(Math.random()*canvas.width);
								var y = 1+Math.floor(Math.random()*canvas.height);
								var s = 1 + Math.floor(Math.random()*2);
								array.push( { "x":x , "y":y , "s":s} );
						}
						for( var i=0 ; i < array.length ; ++i ){
							ctx.fillStyle = 'rgba(255,255,255,.70)';
							ctx.beginPath();
							ctx.save();
							//ctx.shadowColor = 'white';
							//ctx.shadowBlur = 20;
							ctx.arc( array[i].x , array[i].y += array[i].s*.2 , array[i].s , 0 , Math.PI*2 , true );
							ctx.fill();
							ctx.closePath();
							ctx.restore();
							if( array[i].y > canvas.height ){
								array.splice(i,1);
							}
						}
		}				