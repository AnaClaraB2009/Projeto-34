
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bkImg;
var catImg;
var sweetImg;
var trampolineImg;
var hatImg;

var sweet;
var button;
var plataforma;
var cat;
var trampoline;
var hat;
var hat2;
var rope;
var sweetOptions;
var con;
var heart;
var heartImg;

function preload() {
  bkImg = loadImage('bk.png');
  catImg = loadImage('cat.png');
  sweetImg = loadImage('sweet.png');
  trampolineImg = loadImage('trampoline.png');
  hatImg = loadImage('hat.png');
  heartImg = loadImage('heart.png')
}

function setup() {
  createCanvas(600, 700);

  engine = Engine.create();
  world = engine.world;

  plataforma = createSprite(300, 300, 130, 5);
  plataforma.shapeColor = 'black';

  cat = createSprite(310, 250, 50, 50);
  cat.addImage('cat', catImg);
  cat.scale = 0.2;

  button = createImg('cut_btn.png');
  button.position(460, 200);
  button.size(50, 50);
  button.mouseClicked(drop);

  trampoline = createSprite(470, 600, 100, 40);
  trampoline.addImage(trampolineImg);
  trampoline.scale = 0.3;

  hat = createSprite(130, 500, 100, 40);
  hat.addImage(hatImg);
  hat.scale = 0.2;
  hat.rotation = 285;

  hat2 = createSprite(300, 50, 100, 40);
  hat2.addImage(hatImg);
  hat2.scale = 0.2;
  hat2.rotation = 375;

  sweetOptions = {
    isStatic: false
  }

  sweet = Bodies.circle(100, 400, 15, sweetOptions);
  World.add(world, sweet)

  rope = new Rope(4, { x: 490, y: 210 });

  con = new Link(rope, sweet);

  heart = createSprite(350, 180, 30, 30);
  heart.addImage(heartImg)
  heart.visible = false
  heart.scale = 0.1


}


function draw() {
  background(bkImg);

  rope.show()

  Engine.update(engine);

   push();
   imageMode(CENTER);
  if (sweet != null) {
    image(sweetImg, sweet.position.x, sweet.position.y, 70, 70);
   }
   pop();

  //ellipse(sweet.position.x, sweet.position.y, 20)

  if (collide(sweet, trampoline, 100)) {
    Body.setVelocity(sweet, { x: -20, y: -5 })
  }

  if (collide(sweet, cat, 20)) {
    heart.visible = true
    sweet = null
  }

  if (collide(sweet, hat, 80)) {
    sweet.position.x = hat2.position.x
    sweet.position.y = hat2.position.y - 5
    Body.setVelocity(sweet, { x: 0, y: 5 })
  }
  drawSprites()
}

function drop() {
  rope.break()
  con.dettach()
  con = null

}

function collide(body, sprite, x) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x) {

      return true;
    }
    else {
      return false;
    }
  }
}

