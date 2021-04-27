
var dog,sadDog,happyDog,feed,addfood,food,database;
var foodS,emptybottle;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  emptybottle=loadImage("images/milkImage.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  food=new Food();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addfood=createButton("Add food");
  addfood.position(800,95);
  addfood.mousePressed(addFood);
}

function draw() {
  background(46,139,87);
  food.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodStock=data.val();
  food.updateFoodStock(foodStock);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  food.deductFood(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock()
  })
}

//function to add food in stock
function addFood(){
  food.updateFoodStock(food.getFoodStock()+1);
  database.ref('/').update({
    Food: food.getFoodStock()
  })
}