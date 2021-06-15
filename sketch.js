var bg_img,tile_img,ball_img,sound;
var soundPlay = 0;
var count = 0,tileCount = 0;
var tile,ball,ground1,ground2;
var line1,line2,line3,line4,line5,line6,line7;
var gameState = 1;

var tileGroup;

function preload(){
bg_img = loadImage("images/BG 6.jpg");
tile_img = loadImage("images/TILE.png");
ball_img = loadImage("images/BALL.png");
sound = loadSound("BUTTER.mp3");
line1 = loadImage("images/LINE1.png");
line2 = loadImage("images/LINE2.png");
line3 = loadImage("images/LINE3.png");
line4 = loadImage("images/LINE4.png");
line5 = loadImage("images/LINE5.png");
line6 = loadImage("images/LINE6.png");
line7 = loadImage("images/LINE7.png");


}

function setup(){
    createCanvas(500,700);

    ball = createSprite(width/2,600);
    ball.addImage(ball_img);
    ball.scale = 0.25;
    ball.velocityY = -16.3;
    ball.debug = true;
    ball.setCollider('circle',0,0,50);

    ground1 = createSprite(width/2,650,width,10);
    ground2 = createSprite(width/2,240,width,10);

    ground1.visible = false;
    ground2.visible = false;

    tileGroup = new Group();

    
    

}

function draw(){
    background(bg_img);

    if (count<100){
        image(line1,0,15,width,50)
    }
    if (gameState == 1){
        ball.x = mouseX;
        drawTile();
        ball.bounceOff(ground1);
        ball.bounceOff(ground2);

       /* for(var i = 0; i<tileGroup.length; i++){
            ball.bounce
        }*/
        for(var s = 0;s<tileGroup.length; s++){
                
                if ( ball.y<610 || tileGroup.get(s).isTouching (ball)){
                    if (soundPlay == 0){
                    sound.play();
                    soundPlay = 1;
                    }
                    if(tileGroup.get(s).y>580 && tileGroup.get(s).isTouching (ball)){
                    ball.velocityY = 16.3;
                    }
                    ball.bounceOff(ground2);
                    count += 1;
                    
                }
                else{
                    if(frameCount>150){
                        gameState = 0;
                    }
                    
                }
        }
    }

    else if(gameState == 0){
        sound.stop();
        ball.velocityY = 0;
        tileGroup.setLifetimeEach(-1);
        tileGroup.setVelocityYEach(0);

        
        
    }

    //console.log (count);

    drawSprites();
}


function drawTile(){
    if(frameCount%50 == 0){
        tile = createSprite(250,340);
        tile.addImage("tile_image",tile_img);
        tile.scale = 0.1;
        tile.x = random(230,260);
        tile.velocityY = 3;
        tileGroup.add(tile);
        ball.depth = tile.depth+1;

        tile.lifeTime = 500;

        tileCount += 1;

        tile.debug = true;
        tile.setCollider ('rectangle',0,80,200,30);
        
    }

    for(var i = 0;i<tileGroup.length; i++){

        for(var j = 340; j<680; j = j+5){
            if(tileGroup.get(i).y>= j){
                tileGroup.get(i).scale = 0.1+(j-325)/500;
               
            }

            if(tileGroup.get(i).x<240){
                tileGroup.get(i).x-= 0.005;
            }

            if(tileGroup.get(i).x>240){
                tileGroup.get(i).x+= 0.005;
            }
        }

    }
    
}
