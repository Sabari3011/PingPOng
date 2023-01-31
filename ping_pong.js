const countdown=document.getElementById('countdown')
const gameBoard=document.getElementById("gameBoard");
const ctx=gameBoard.getContext("2d");
const scoreText=document.getElementById("scoreText");
const resetBtn=document.getElementById("resetBtn");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const boardBackGround="green";
const paddle1Color="lightblue";
const paddle2Color="pink";
const paddleBoder="black";
const ballColor="yellow";
const ballBorder="black";
const ballRadius=12.5;
const paddleSpeed=50;
let intervalID;
let countID;
let ballX=gameWidth/2;
let ballY=gameHeight/2;
let ballXDirection=0;
let ballYDirection=0;
let player1Score=0;
let player2Score=0;
let running = false;
let text;
var i=0;
let typeSpeed=300;
let ballSpeed;
let totalpoint;
let paddle1={
    width:25,
    height:100,
    x:0,
    y:0
};
let paddle2={
    width:25,
    height:100,
    x:gameWidth-25,
    y:gameHeight-100
};

let count=6;
window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);

let colors=["green","blue","orange","yellow","red"];



//countDown();
//gameStart();
function countDown(){
        running=true;
        count-=1
        countdown.textContent=count;
        document.getElementById('round').style.backgroundColor=colors[count-1];
        document.getElementById('start').style.backgroundColor=colors[count-1];
        countID= setTimeout(countDown,1000);

        if (count==0){
            clearTimeout(countID);
           document.getElementById('gameinform').style.visibility="hidden";
//           document.getElementById("winner").style.visibility="visible";
            gameStart();
        }
}


function gameStart(){
    if(running){
    createball();
    nextTic();
    setpoint();
    console.log(totalpoint);
    }
    //document.getElementById('gameinform').style.ba
  

};
function nextTic(){
    if(running){
    intervalID=setTimeout(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        nextTic();
    },10)
}
};
function clearBoard(){
    ctx.fillStyle=boardBackGround;
    ctx.fillRect(0,0,gameWidth,gameHeight)
};
function drawPaddles(){
    ctx.strokeStyle=paddleBoder;
   //to get player 1 board
    ctx.fillStyle=paddle1Color;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);

    //to get player 1 board
    ctx.fillStyle=paddle2Color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
};
function createball(){
    ballSpeed=1;
    if(Math.round(Math.random())== 1){
        ballXDirection=1;
    }
    else{
        ballXDirection=-1;
    }
    
    if(Math.round(Math.random())== 1){
        ballYDirection=1;
    }
    else{
        ballYDirection=-1;
    }
    ballX=gameWidth/2;
    ballY=gameHeight/2;
    drawBall(ballX,ballY);


};
function moveBall(){
    ballX+=(ballSpeed * ballXDirection);
    ballY+=(ballSpeed * ballYDirection);
};
function drawBall(ballX,ballY){
    ctx.fillStyle=ballColor;
    ctx.strokeStyle=ballBorder;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,2 * Math.PI);
    ctx.stroke();
    ctx.fill();

};
function checkCollision(){
    if(ballY <= 0+ballRadius){
        ballYDirection *=-1;
    }
    if(ballY >= gameHeight -ballRadius){
        ballYDirection *=-1;
    }
    if(ballX <=0){
        player2Score+=1;
        updateScore();  
        createball();
        return; 
    }
    if(ballX >= gameWidth ){
        player1Score+=1;
        updateScore();  
        createball();
        return; 
    }
    if(ballX <= (paddle1.x + paddle1.width +ballRadius)){
        if(ballY > paddle1.y && ballY <paddle1.y +paddle1.height){
            ballX=(paddle1.x + paddle1.width) +ballRadius;
            ballXDirection *= -1;
            ballSpeed+=0.3
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY <paddle2.y +paddle2.height){
            ballX=paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed+=0.3
        }
    }




};
function changeDirection(event){
    keypressed=event.keyCode;
    const up1=87;
    const down1=83;

    const up2=38;
    const down2=40;

    switch(keypressed){
        case(up1):{
            if(paddle1.y>0)
                paddle1.y-=paddleSpeed;
            break;
        }
        case(down1):{
            if(paddle1.y < gameHeight-paddle1.height)
                paddle1.y+=paddleSpeed;
            break;
        }
        case(up2):{
            if(paddle2.y>0)
                paddle2.y-=paddleSpeed;
            break;
        }
        case(down2):{
            if(paddle2.y < gameHeight-paddle2.height)
                paddle2.y+=paddleSpeed;
            break;
        }



    }
};
function updateScore(){
    scoreText.textContent=`${player1Score} : ${player2Score}`;
    if(player1Score >= totalpoint){
    text="PLAYER 1 WIN";
    type();
    document.getElementById("winner").style.visibility="visible";
    document.getElementById("resetBtn").style.backgroundColor="gold";
    document.getElementById("my-canvas").style.visibility="visible";
    running=false;
    //document.getElementById("im").style.visibility="visible";
    }
    if(player2Score>=totalpoint){
        text="PLAYER 2 WIN";
        type();
        document.getElementById("winner").style.visibility="visible";
        document.getElementById("resetBtn").style.backgroundColor="gold";
        document.getElementById("my-canvas").style.visibility="visible";
        running=false;
        }


};
function resetGame(){
    
   /* player1Score=0;
    player2Score=0;
    paddle1={
        width:25,
        height:100,
        x:0,
        y:0
    };
     paddle2={
        width:25,
        height:100,
        x:gameWidth-25,
        y:gameHeight-100
    };
    ballSpeed=1;
    ballX=0;
    ballY=0;
    ballXDirection=0;
    ballYDirection=0;
    running=true;
    updateScore();
    clearInterval(intervalID);
    countDown()*/
    location.reload();

};
function setpoint(){
    if(document.getElementById('p25').checked)
        totalpoint=25;
    else  if(document.getElementById('p15').checked)
        totalpoint=15;
    else  if(document.getElementById('p10').checked)
        totalpoint=10;
    else  if(document.getElementById('p5').checked)
        totalpoint=1;
          
    else
        totalpoint=15
}

function type(){
    document.getElementById("win").textContent+=text.charAt(i);
    i++
    setTimeout(type,typeSpeed)

}





/*  document.getElementById("win").style.visibility="visible";
    document.getElementById("im").style.visibility="visible";*/