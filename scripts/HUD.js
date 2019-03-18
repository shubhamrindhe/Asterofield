        
        var game = {
            start : false,
            paused : false,
            score : 0,
            sensitivity : 3,
            mode : 'hardcore',
            displayScore : function(){
                ctx.beginPath()
                ctx.strokeStyle = 'lightblue';
                ctx.fillStyle = 'lightblue'; 
                ctx.font = "20px Arial";
                ctx.textAlign = 'end';
                ctx.textBaseline = 'top'; 
                ctx.fillText("Score : "+this.score ,canvas.width,0);
                ctx.closePath();
            
            }
        };
        var HUD = {
            Framecount : 0,
            FPS : 0,
            displayFPS : function(){
                ctx.beginPath()
                ctx.strokeStyle = 'red';
                ctx.fillStyle = '#76b900'; //<- NVIDIA green
                ctx.font = "20px Arial";
                ctx.textAlign = 'start';
                ctx.textBaseline = 'top'; 
                ctx.fillText(this.FPS,0,0);
                ctx.closePath();
            },
        };