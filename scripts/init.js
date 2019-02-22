        
        var initiate = {
            
            verification : function(){
                var author = document.getElementById('author').content;
                for(var i=0 ; i < author.length ; ++i){
                    if( author.charCodeAt(i) != key[i] ){
                        return false;
                    }
                }    
                return true;
            },
            
            antiPiracyProtocol : function(){                
                    for(var i=0;i<10;++i){
                        ctx.beginPath();
                        ctx.strokeStyle = 'red';
                        ctx.fillStyle = 'red';
                        ctx.font = "50px Arial";
                        ctx.textAlign = 'center';
                        ctx.fillText('you are a pirate !',random(0,innerWidth),random(0,innerHeight));
                        ctx.closePath();
                        
                    }
                
            },
            
            canvas : function(w,h){
                canvas = document.getElementById('canvas');
                //canvas = document.createElement('canvas');
                //document.body.appendChild(canvas);
				
				if(innerWidth>innerHeight){
					canvas.style.position = 'absolute';
					canvas.style.left = '50%';
					canvas.style.top = '50%';
					canvas.style.transform = 'translate(-50%,-50%)';
					canvas.width = innerWidth;//w;
					canvas.height = innerHeight;//h;
				}else{
					canvas.style.position = 'absolute';
					canvas.style.left = '50%';
					canvas.style.top = '50%';
					canvas.style.transform = 'translate(-50%,-50%) rotateZ(90deg)';
					canvas.width = innerHeight;//w;
					canvas.height = innerWidth;//h;
				}	
                
                /*
                canvas.width = innerWidth;//w;
                canvas.height = innerHeight;//h;
				*/
				
				canvas.oncontextmenu = function (e) {
					e.preventDefault();
				};
				
				
                ctx = canvas.getContext('2d');
                box = canvas.getBoundingClientRect();
            },
            
            background : function(array,n){
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
            
            },
            blast : function(array,n,x,y){
                        for(var i=0;i<n;++i){
                                var rad = random(10,20);    
                                array.push( new Particle(x,y,rad));
                                array[i].color = blastColor[Math.floor(Math.random()*blastColor.length)]; 
                                
                        }
            },
            
            particles : function ( array , n ,r1,r2){
                            for(var i=0;i<n;++i){
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
                                array.push( new Particle(x,y,rad));
                            }
            },
            
                        
                        gameOver : function(){
                            ctx.beginPath();
                            ctx.strokeStyle = 'red';
                            ctx.fillStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
                            ctx.font = "30px Arial";
                            ctx.textAlign = 'center';
                            ctx.fillText("Game Over !",innerWidth/2,innerHeight/2);
                            ctx.closePath();
                        },
                        startGame : function(){
                            ctx.beginPath();
                            ctx.strokeStyle = 'red';
                            ctx.fillStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
                            ctx.font = "30px HACKED";
                            ctx.textAlign = 'center';
                            ctx.fillText("Press Enter !",innerWidth/2,innerHeight/2);
                            ctx.closePath();
                        },
                        gamePause : function(){
                            ctx.beginPath();
                            ctx.strokeStyle = 'red';
                            ctx.fillStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
                            ctx.font = "30px Arial";
                            ctx.textAlign = 'center';
                            ctx.fillText("Paused",innerWidth/2,innerHeight/2);
                            ctx.closePath();
                        },
                        
                        text : function(string,stability){
                            ctx.beginPath()
                            ctx.strokeStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
                            ctx.fillStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
                            ctx.font = "20px HACKED";
                            ctx.textAlign = 'center';
                            if(!stability)
                                ctx.fillText(string,canvas.width/2 - random(1,3),canvas.height/2 - random(1,3));
                            else
                                ctx.fillText(string,canvas.width/2 ,canvas.height/2 + 50 );
                            ctx.closePath();
                        },
        };