//Create the variables here

var plane1,p40,ground,fire,soldier,cloud,bird,flame,para,skull,exp
var planeImage,flameImage,paraImage,skullImage,restart,restartImage,expimage
var cloudsGroup, birdGroup, plane1Group,paraGroup
var gameState = "start"
var score = 0;
var sound1, burst;


function preload(){
//Load all animation here
//trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
 
  planeImage = loadImage("plane1.png")
  p40Image = loadImage("p40.png")
  groundImage = loadImage("ground2.png")
  soldierImage = loadAnimation("s1.png","s2.png","s3.png","s4.png","s5.png","s6.png")
  birdImage = 
    loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png")
  fireImage = loadImage("fire.png")
  cloudImage = loadImage("cloud.png")
  flameImage = loadImage("flame.png")
  paraImage = loadImage("para.png")
  skullImage = loadImage("skull.png")
  startImage = loadImage("end.png")
  endImage = loadImage("start.png")
  restartImage = loadImage("restart.png")
  startButton = loadImage("start (1).png")
  sound1 = loadSound("sound.mp3")
  burst = loadSound("burst.wav")
  expAnim =
  loadAnimation("exp1.png","exp2.png","exp3.png","exp4.png","exp5.png","exp6.png","exp7.png","exp8.png","exp9.png","exp10.png")
}

function setup() {
  
  createCanvas(800, 600);
  sound1.loop();
   start = createSprite(400,300)
  start.addImage(startImage)
  startButtonS = createSprite(580,450)
  startButtonS.addImage(startButton)

 
  p40 = createSprite(150,400,30,5)
  p40.addImage(p40Image)
  p40.scale = 0.3
  p40.velocityX = 0.3


  ground = createSprite(400,550,800,5)
  ground.addImage(groundImage)
  ground.velocityX = -15
  
  soldier = createSprite(400,520,800,5)
  soldier.addAnimation("s",soldierImage)
  
  skull = createSprite(20,30,25,25)
  skull.addImage(skullImage)
  skull.scale = 0.1
 
  plane1Group = new Group()
   birdGroup= new Group()
   cloudGroup= new Group()
  paraGroup= new Group()
  
  end = createSprite(400,300)
    end.addImage(endImage)
  end.visible = false;
  
    restart = createSprite(400,400)
    restart.addImage(restartImage)
  restart.visible = false;
  
  
//Create all sprites here
}

function draw() {
  //trex.debug = true;
  background("rgb(73,116,121)")
  
  

if(gameState === "start"){
  start.visible = true
  p40.visible = false
  soldier.visible= false
  ground.visible = false
  skull.visible = false
  if(mousePressedOver(startButtonS)){
    start.visible = false
    gameState = "play"
  }
}
  
  if(gameState=="play"){
  fill("white")
  text("Score",50,20) 
  text(score,90,20)
    
  p40.visible = true
  soldier.visible= true
  ground.visible = true
  skull.visible = true
  startButtonS.visible = false

    
  if(ground.x<0){
    ground.x=ground.width/2
  }  
  if(keyDown(UP_ARROW)){
    p40.y-=5
  }
  if(keyDown(DOWN_ARROW)){
    p40.y+=5
  }
  if(keyDown(RIGHT_ARROW)){
    p40.x+=3
  }
  if(keyDown(LEFT_ARROW)){
    p40.x-=7
  }
    
  if(keyDown("SPACE")){
  fire = createSprite(p40.x +100,p40.y,50,50)
  fire.addImage(fireImage)
  fire.scale = 0.1  
  fire.velocityX= 40
     
  flame = createSprite(p40.x +80,p40.y,30,5)
  flame.addImage(flameImage)
  flame.scale = 0.07
  flame.lifetime = 5  
    
  }
  // Check for collision between fire and plane1
  if (fire && plane1 && fire.isTouching(plane1)) {
      
      score+=2
      plane1.destroy();
      fire.destroy();
    burst.play()
    exp = createSprite(200,200)
    exp.y= plane1.y
    exp.x=plane1.x
    exp.addAnimation("explosion",expAnim)
    exp.lifetime = 40
    exp.velocityX=-2
  }
 
    
  if (p40 && para && para.isTouching(p40)) {
      score+=5
      para.destroy() 
    }
   
  if(plane1&& plane1.isTouching(p40)||score<-100) {
     end.visible = true

      gameState = "end"
    
     paraGroup.destroyEach()
    cloudGroup.destroyEach()
    birdGroup.destroyEach()
    plane1Group.destroyEach()
    soldier.visible = false
    p40.visible = false
    ground.visible = false;
    skull.visible = false;
   
  
  }
      if(plane1 && plane1.x<=0){
      score-=1
    }
    
    // Check for collision between fire and soldier
    if (fire && soldier && fire.isTouching(soldier)) {
     
      soldier.destroy();
      fire.destroy();
     
    }
  spawnClouds()
  spawnObstacle()
  spawnPlane()
  spawnPara()
  
     
}
  if(gameState === "end"){
   
   end.visible = true;
  restart.visible = true;
   
    // paraGroup.destroyEach()
    // cloudGroup.destroyEach()
    // birdGroup.destroyEach()
    // plane1Group.destroyEach()

    
    if(mousePressedOver(restart)){
     gameState= "start"
      end.visible = false;
      // end.destroy()
     score = 0
      restart.visible = false;
      start.visible=true
     startButtonS.visible = true
     
     
    }
  
  }
 
  drawSprites();
}

  

//Create all the obstacles 
function spawnClouds(){
  
  if(frameCount%60===0){
    
    cloud = createSprite(800,300)
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(100,400));
    cloud.velocityX=-5
    cloud.depth = p40.depth
    p40.depth +=1
    cloudGroup.add(cloud)
   
  }
  }
  
  function spawnObstacle(){
     if(frameCount%100===0){
        bird = createSprite(800,400,10,10)
  bird.addAnimation("b",birdImage)
  bird.y = Math.round(random(100,500));
  bird.scale = 0.5
  bird.velocityX=-8
       birdGroup.add(bird)
  }
  }  

function spawnPlane(){
  if(frameCount%120===0){
  plane1 = createSprite(800,40);
  plane1.addImage(planeImage)
  plane1.scale = 0.2
  plane1.y = Math.round(random(40,400))
  plane1.velocityX = -10
  plane1Group.add(plane1)

}
  
}


 

function spawnPara(){
     if(frameCount%160===0){

para = createSprite(400,2)
  para.addImage(paraImage)
  para.scale = 0.3
  para.y= Math.round(random(40,100))
  para.x = Math.round(random(40,500))
       para.velocityX= Math.round(random(-2,6))
       para.velocityY=Math.round(random(1,6))
       paraGroup.add(para)
}
 }



