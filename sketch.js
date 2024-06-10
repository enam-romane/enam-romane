navigator.geolocation.getCurrentPosition(getposition);// on récupère la position gps de l'utilisateur 

let myMap; // on déclare une variable pour notre carte
const mappa = new Mappa('Leaflet'); // on fait appel à la librairie js Leaflet

// variables pour récupérer la position gps de l'utilisateur
var position;
let userLat;
let userLon;

let mousePos;

// coordonnées de la gare 
let sncf_lat = 47.21746567948939;
let sncf_lng = -1.5425937297598176;

//coordonnées du jardin des plantes 47.220252471078894, -1.5435832683297197
let jardin_lat = 47.220252471078894;
let jardin_lng = -1.5435832683297197;

//coordonnées du chateau eds ducs de bretagne 47.21644248058643, -1.5482987340391916
let chateau_lat = 47.21644248058643;
let chateau_lng = -1.5482987340391916;

//coordonnées du ruin bar 47.21491103508179, -1.5521733205454562
let bar_lat = 47.21491103508179;
let bar_lng = -1.5521733205454562;

//coordonnées de commerce 47.21431207932432, -1.5556824227036332
let commerce_lat = 47.21431207932432;
let commerce_lng = -1.5556824227036332;

// coordonnées des nefs/éléphant 47.206016990969324, -1.5644592312137044
let elephant_lat = 47.206016990969324;
let elephant_lng = -1.5644592312137044;

// coordonnées des trampo 47.20582555772586, -1.568439081334436
let trampo_lat = 47.20582555772586;
let trampo_lng = -1.568439081334436;

// coordonnées du hangar à banane 47.202293741391415, -1.5725778370322652
let hangar_lat = 47.202293741391415;
let hangar_lng = -1.5725778370322652;


let initial_lat = 47.21082489922847;// latitude de départ 
let initial_lng = -1.5536927705681556;// longitude de départ

// variables pour notre avatar
let avatarLat;
let avatarLng;
let avatarPos;
let avatarPosX;
let avatarPosY;

// Calcul des distances
let distance_sncf_avatar;
let distance_jardin_avatar;
let distance_chateau_avatar;
let distance_bar_avatar;
let distance_commerce_avatar;
let distance_elephant_avatar;
let distance_trampo_avatar;
let distance_hangar_avatar;

let distance_source1_avatar;

// variables qui vont nous permettre de dessiner les zones
let diametreSource1_lat = 47.199044159443524; 
let diametreSource1_lng = -1.561260223388672; 

//variables pour les sons ambiance
let gare;//sncf
let jardin;// jardin ambiance
let bouffay;// bouffay
let commerce;// commerce
let elephant;// elephant
let trampoline;// elephant
let hangar;// elephant

//variables pour les interviews
let elephantInt;// interview elephant
let jardinInt;// interview jardin des plantes
let hangarInt;// interview hangar à banane
let chateauInt;// interview chateau

function preload() {
// SONS AMBIANCE
gare= loadSound("ambiance/sncf.mp3")
jardin= loadSound("ambiance/jardin.mp3")
bouffay= loadSound("ambiance/bouffay.mp3")
commerce= loadSound("ambiance/commerce.mp3")
elephant= loadSound("ambiance/éléphant.mp3")
trampoline= loadSound("ambiance/trampoline.mp3")
hangar= loadSound("ambiance/hangar.mp3")
  
// INTERVIEW SONS
  elephantInt= loadSound("interview/elephantInt.mp3")
  jardinInt= loadSound("interview/jardinInt.mp3")
  hangarInt= loadSound("interview/hangarInt.mp3")
  chateauInt=loadSound("interview/chateauInt.mp3")
  
// IMAGES PICTO
  gareImage = loadImage('picto/gare.png');
  chateauImage = loadImage('picto/chateau.png');
  jardinImage = loadImage('picto/jardin.png');
  barImage = loadImage('picto/bar.png');
  hangarImage = loadImage('picto/hangar.png');
  commerceImage = loadImage('picto/commerce.png');
  trampoImage = loadImage('picto/trampo.png');
  elephantImage = loadImage('picto/éléphant.png');
  persoImage= loadImage('picto/perso.png');
}


// Lets put all our map options in a single object
// lat and lng are the starting point for the map.
const options = {
  lat: initial_lat,
  lng: initial_lng,
  zoom: 14,// zoom de départ
  style: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(640,640); 

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
  
} // fin de la fonction setup


function getposition(position) {
  userLat = position.coords.latitude
  userLon = position.coords.longitude
}

function draw(){
    
   // Clear the previous canvas on every frame
  clear();
  
  mousePos = myMap.fromPointToLatLng(mouseX,mouseY);// on convertit la position de la souris en coordonnées gps      
  let userPos = myMap.latLngToPixel(userLat, userLon); // idem
  let sncfPos = myMap.latLngToPixel(sncf_lat, sncf_lng); // on convertit la position gps en position XY
  let jardinPos = myMap.latLngToPixel(jardin_lat, jardin_lng); // idem
  let chateauPos = myMap.latLngToPixel(chateau_lat, chateau_lng); // idem
  let barPos = myMap.latLngToPixel(bar_lat, bar_lng); // idem
   let commercePos = myMap.latLngToPixel(commerce_lat, commerce_lng); // idem
  let elephantPos = myMap.latLngToPixel(elephant_lat, elephant_lng); // idem
  let trampoPos = myMap.latLngToPixel(trampo_lat, trampo_lng); // idem
  let hangarPos = myMap.latLngToPixel(hangar_lat, hangar_lng); // idem
 
  
  if(mouseIsPressed){
    avatarPos = myMap.latLngToPixel(mousePos.lat, mousePos.lng); // on récupère la position en pixels de la position gps de l'avatar
    avatarPosX = avatarPos.x;  // on met à jour avatarPosX
    avatarPosY = avatarPos.y; // on met à jour avatarPosY
    avatarLat = mousePos.lat; // on met à jour avatarLat
    avatarLng = mousePos.lng; // on met à jour avatarLng  
    //print("mousePos.lat = " + mousePos.lat);    
    //print("mousePos.lng = " + mousePos.lng);
    
    distance_sncf_avatar = abs(sncf_lat-avatarLat)+abs(sncf_lng-avatarLng);
    print("distance_sncf_avatar = " + distance_sncf_avatar);
    //
     distance_jardin_avatar = abs(jardin_lat-avatarLat)+abs(jardin_lng-avatarLng);
    print("distance_jardin_avatar = " + distance_jardin_avatar);
    //
     distance_chateau_avatar = abs(chateau_lat-avatarLat)+abs(chateau_lng-avatarLng);
    print("distance_chateau_avatar = " + distance_chateau_avatar);
    //
    distance_bar_avatar = abs(bar_lat-avatarLat)+abs(bar_lng-avatarLng);
    print("distance_bar_avatar = " + distance_bar_avatar);
    //
     distance_commerce_avatar = abs(commerce_lat-avatarLat)+abs(commerce_lng-avatarLng);
    print("distance_commerce_avatar = " + distance_commerce_avatar);
    //
     distance_elephant_avatar = abs(elephant_lat-avatarLat)+abs(elephant_lng-avatarLng);
    print("distance_elephant_avatar = " + distance_elephant_avatar);
    //
     distance_trampo_avatar = abs(trampo_lat-avatarLat)+abs(trampo_lng-avatarLng);
    print("distance_trampo_avatar = " + distance_trampo_avatar);
    //
     distance_hangar_avatar = abs(hangar_lat-avatarLat)+abs(hangar_lng-avatarLng);
    print("distance_hangar_avatar = " + distance_hangar_avatar);
    
    } //fin de mous pressed
    
        
  /*distance_hangar_avatar = map(dist(avatarPos.x,avatarPos.y,hangarPos.x,hangarPos.y),0,500,1,0);
  distance_hangar_avatar = constrain(distance_hangar_avatar,0,1)
    hangar.amp(distance_hangar_avatar);  
    //
    
     gare.amp(distance_sncf_avatar);// on contrôle le volume sonore en fonction de cette distance
      */
  
  
  /*
  if(abs(edna_lat-mousePos.lat)<0.005 && abs(edna_lng-mousePos.lng)<0.005){
    print("l'utilisateur est entré dans la zone de l'EDNA")
  }
  */

  /////////////////////////////
  // SNCF /////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_sncf_avatar<0.002 && !gare.isPlaying()){
    print("l'avatar est entré dans la Gare de Nantes")
    gare.play();
  }
  // si on sort de la zone
  if(distance_sncf_avatar>0.002 ){
    print("l'avatar est sorti de la Gare de Nantes")
    gare.stop();
  }
  
  /////////////////////////////
  // JARDIN/////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_jardin_avatar<0.003 && !jardin.isPlaying()){
    print("l'avatar est entré dans le Jardin des Plantes")
    jardin.play();
  }
  // si on sort de la zone
  if(distance_jardin_avatar>0.003 ){
    print("l'avatar est sorti du Jardin des Plantes")
    jardin.stop();
  }
  
  /////////////////////////////
  // JARDIN INT/////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_jardin_avatar<0.001 && !jardinInt.isPlaying()){
    print("l'avatar est entré dans le souvenir lié au Jardin des Plantes")
    jardinInt.play();
  }
  // si on sort de la zone
  if(distance_jardin_avatar>0.001 ){
    print("l'avatar est sorti du souvenir lié au Jardin des Plantes")
    jardinInt.stop();
  }
  
  /////////////////////////////
  // CHATEAU INT/////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_chateau_avatar<0.001 && !chateauInt.isPlaying()){
    print("l'avatar est entré dans le souvenir lié au Chateau des Ducs de Bretagne")
    chateauInt.play();
    image(chateauImage, chateauPos, chateauPos.y, 50, 50);
  }
  // si on sort de la zone
  if(distance_chateau_avatar>0.001 ){
    print("l'avatar est sorti du souvenir lié au Chateau des Ducs de Bretagne")
    chateauInt.stop();
  }
   /////////////////////////////
  // RUIN BAR /////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_bar_avatar<0.003 && !bouffay.isPlaying()){
    print("l'avatar est entré dans le Ruin Bar place Bouffay")
    bouffay.play();
  }
  // si on sort de la zone
  if(distance_bar_avatar>0.003 ){
    print("l'avatar est sorti du Ruin Bar place Bouffay")
    bouffay.stop();
  }
  
  /////////////////////////////
  //COMMERCE /////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_commerce_avatar<0.003 && !commerce.isPlaying()){
    print("l'avatar est arrivé à Commerce")
    commerce.play();
  }
  // si on sort de la zone
  if(distance_commerce_avatar>0.003 ){
    print("l'avatar est parti de Commerce")
    commerce.stop();
  }
  
 
/////////////////////////////
  // ELEPHANT /////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_elephant_avatar<0.003 && !elephant.isPlaying()){
    print("l'avatar est entré dans la zone de l'Éléphant")
    elephant.play();
  }
  // si on sort de la zone
  if(distance_elephant_avatar>0.003 ){
    print("l'avatar est sorti de la zone de l'Éléphant")
    elephant.stop();
  }
  
  /////////////////////////////
  // ELEPHANT INTERVIEW /////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_elephant_avatar<0.001 && !elephantInt.isPlaying()){
    print("l'avatar est entré dans le souvenir lié à l'Éléphant")
    elephantInt.play();
  }
  // si on sort de la zone
  if(distance_elephant_avatar>0.001 ){
    print("l'avatar est sorti du souvenir lié à l'Éléphant")
    elephantInt.stop();
  }
  
 /////////////////////////////
  // TRAMPO /////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_trampo_avatar<0.003 && !trampoline.isPlaying()){
    print("l'avatar est arrivé aux trampolines du parc 'On va marcher sur la Lune' ")
    trampoline.play();
  }
  // si on sort de la zone
  if(distance_trampo_avatar>0.003 ){
    print("l'avatar est parti des trampolines du parc 'On va marcher sur la Lune'")
    trampoline.stop();
  }
  
  /////////////////////////////
  // HANGAR/////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_hangar_avatar<0.003 && !hangar.isPlaying()){
    print("l'avatar est arrivé au Hangar à Banane")
    hangar.play();
  }
  // si on sort de la zone
  if(distance_hangar_avatar>0.003 ){
    print("l'avatar est parti du Hangar à Banane")
    hangar.stop();
  }
  
  /////////////////////////////
  // HANGAR INT/////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris 
  if(distance_hangar_avatar<0.001 && !hangarInt.isPlaying()){
    print("l'avatar est entré dans le souvenir lié au Hangar à Banane")
    hangarInt.play();
  }
  // si on sort de la zone
  if(distance_hangar_avatar>0.001 ){
    print("l'avatar est sorti du souvenir lié au Hangar à Banane")
    hangarInt.stop();
  }
    
  
  
  textAlign(CENTER);
  imageMode(CENTER);
   
  
   //perso
  image(persoImage, avatarPosX, avatarPosY, 20, 40);
 
  
  noStroke();
  
  //GARE
  fill(100,150);
  circle(sncfPos.x,sncfPos.y,27);
  fill(255);
  //text("GARE",sncfPos.x, sncfPos.y); // on dessine le centre de la zone 1
  image(gareImage, sncfPos.x, sncfPos.y, 40, 40);
  
  //JARDIN 
  fill(0,80,0,150);
  circle(jardinPos.x,jardinPos.y,27);
  fill(255);
  //text("JARDIN",jardinPos.x, jardinPos.y); // on dessine le centre de la zone 1
  image(jardinImage, jardinPos.x, jardinPos.y, 40, 40);
  
  //CHATEAU
  fill(0,0,231,120);
  circle(chateauPos.x,chateauPos.y,27);
  fill(255);
  //text("Chateau",chateauPos.x, chateauPos.y); // on dessine le centre de la zone 1
  image(chateauImage, chateauPos.x, chateauPos.y, 40, 40);
   
  
  //RUIN BAR
  fill(180,0,255,150);
  circle(barPos.x,barPos.y,27);
  fill(0);
  //text("RUIN BAR",barPos.x, barPos.y);
  image(barImage, barPos.x, barPos.y, 40, 40);
  
  //COMMERCE
  fill(120,215,50,150);
  circle(commercePos.x,commercePos.y,27);
  fill(255);
  //text("COMMERCE",commercePos.x, commercePos.y);
  image(commerceImage, commercePos.x, commercePos.y, 40, 40);
  
  //ELEPHANT
  fill(255,100,0,150);
  circle(elephantPos.x,elephantPos.y,27);
  fill(0);
  //text("ELEPHANT",elephantPos.x, elephantPos.y);
  image(elephantImage, elephantPos.x, elephantPos.y, 40, 40);
  
  //trampo
  fill(255,0,0,150);
  circle(trampoPos.x,trampoPos.y,27);
  fill(0);
  //text("TRAMPO",trampoPos.x, trampoPos.y);
  image(trampoImage, trampoPos.x, trampoPos.y, 40, 40);
  
  //HANGAR
  fill(255,205,84,150);
  circle(hangarPos.x,hangarPos.y,27);
  fill(0);
  //text("HANGAR",hangarPos.x, hangarPos.y);
  image(hangarImage, hangarPos.x, hangarPos.y, 40, 40);
  
 
  
 
  
} // fin de la fonction draw

function keyPressed(){
  
  if(key == 'i'){
    print("distance lat edna-souris = " + abs(edna_lat-mousePos.lat)); 
    print("distance lng edna-souris = " + abs(edna_lng-mousePos.lng));
  }
  
}






