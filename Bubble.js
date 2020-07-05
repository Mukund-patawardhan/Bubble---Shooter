class Bubble{

    constructor(){
        this.body=createSprite(random(width),random(650,900));
        this.colour=random(colours);
        this.body.visible=false;
        this.state=0;
    }

    display(){
        if(frameCount%5===0){
        this.body.setVelocity(random(-5,5),random(-7,2));
        }

        if(frameCount%100===0){
            this.colour=random(colours);
        }

        if(this.state===0){
            push();
            fill(this.colour);
            var pos=this.body;
            triangle(pos.x,pos.y-50,pos.x-30,pos.y+70,pos.x+30,pos.y+70);
            pop();
        }

        if(this.body.x<0){
            this.state=1;
        }
        drawSprites();
    }
}