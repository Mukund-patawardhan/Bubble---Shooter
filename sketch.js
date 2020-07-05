var a,ball;
var block1;
var rotation=0;
var turn=0;
var PosX=1230/2,PosY=490;
var bubbles=[];
var colours=['red','blue','green','yellow','purple','white','cyan'];
var colour;
var score=0,time=0;

function setup(){
  createCanvas(1230,550);

  a=createSprite(width/2,480,150,150);
  a.visible=false;

  ball=createSprite(width/2,480,20,20);
  ball.visible=false;

  bubbles.push(new Bubble());

  colour=random(colours);
}

function draw(){
  background("black");

  ball.restitution=3;

  if(frameCount%20===0 && frameCount>500){
    bubbles.push(new Bubble());
  }

  if(frameCount>500){
  for(var i=0; i<bubbles.length; i++){
    bubbles[i].display();
    a.displace(bubbles[i].body);
    if(ball.isTouching(bubbles[i].body)){
      if(colour===bubbles[i].colour){
      bubbles[i].body.destroy();
      bubbles[i].state=1;
      ball.x=-100
      score+=1;
      }else{
        bubbles[i].body.bounce(ball);
        bubbles[i].body.destroy();
        bubbles[i].state=1;
        score-=1;
      }
    }
  }
}

  if(ball.x>1400 || ball.x<0 || ball.y>650 || ball.y<0){
    ball.x=a.x;
    ball.y=a.y;
    ball.setVelocity(0,0);
    colour=random(colours);
  }else if(ball.velocityX===0 && ball.velocityY===0){
    ball.x=a.x;
    ball.y=a.y;
    if(frameCount>500){
    time+=1;
    }
  }
  if(time>300 ){
    score-=1;
    time=0;
  }

  rotation=rotation+turn;

  a.x=PosX;
  a.y=PosY;

  push();
  translate(PosX,PosY);
  angleMode(DEGREES);
  rotate(rotation);
  rectMode(CENTER);
  rect(0,0,70,130);
  pop();

  push();
  fill(colour);
  noStroke();
  ellipse(ball.x,ball.y,40,40);
  pop();

  if(rotation>90){
    rotation=90;
  }
  if(rotation<-90){
    rotation=-90;
  }

  drawSprites();

  if(frameCount<500){
  textSize(20)
  text("Use Arrow Keys to Aim the Cannon And Press Space To SHOOT",400,50);
  text("Hit The Obstacle with the Ball of the Same Colour to get a Point",400,100);
  text("WATCH OUT, Keeping the ball with yourself or Shooting the Wrong Obstacle will lose Points",400,150);
  text("WARNING !! The Obstacles Are SNEAKY and Can Change Colour",400,200);
  }

  textSize(70);
  text("Score : "+score,0,50)
}

function keyReleased(){
  turn=0;
}

function keyPressed(){
  if(keyCode===RIGHT_ARROW){
    turn=3;
    }
  if(keyCode===LEFT_ARROW){
    turn=-3;
    }
  if(keyCode===32){
    time=0;
    if(rotation<0){
      var ang=map(rotation,90,180,90,180);
      ball.setSpeed(20,ang-90);
    }
    if(rotation>0){
      var ang=map(rotation,0,90,0,90);
      console.log(-ang);
      ball.setSpeed(20,-90+ang);
    }
  }
}


