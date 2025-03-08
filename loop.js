let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

let arr = []; //push points here

document.addEventListener("click", function(e){

    let x = e.clientX;
    let y = e.clientY;
    
    let point = new Vec2d(x,y)
    arr.push(point)
})


let show = false

document.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        show = !show
    }
})


function Loop(){

    animationID = requestAnimationFrame(Loop);
    
         //=======handle timing===================//
        let msNow = window.performance.now();
        let dt = msNow - msPrev;
    
        if(dt < msPerFrame) return
        let excessTime = dt % msPerFrame
        msPrev = msNow - excessTime
        msPrev = msNow;
        dt=dt/1000;
       
       //==========================================//
        
       
        //clear screen
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,canvas.width ,canvas.height);
            //make_checkerboard();
    

        //====================================================================================================
        

        if(show){
            for (let i=0; i<arr.length; i++){
                DrawLine(arr[i], arr[(i+1)%arr.length], "black")
            }
        }
        
        for (let i = 0; i < arr.length; i++){
            // DrawCircle(arr[i], 5, "red")
            FillCircle(arr[i], 5, "red")
        }

        
     
    }
    //=======================================================================================     
    
    
    Loop();
    