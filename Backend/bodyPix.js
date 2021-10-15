let outputStride = 16;
let segmentationThreshold = 0.5;

let imageElement = document.getElementById('person');
let description = document.getElementById('display');
let originalImage = document.getElementById('originalImage');
let shirtImage = document.getElementById('shirtImage');
let pantImage = document.getElementById('pantImage');
let watchImage = document.getElementById('wristImage');
let shoesImage = document.getElementById('shoesImage');
let sungImage = document.getElementById('sungImage');
let combinationID = document.getElementById('combination');
let personSegmentation;
let partSegmentation;
let img;
let imgPerson;
let to_save;
let clothes;
let cnv;
let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let box3 = document.getElementById('box3');
let box4 = document.getElementById('box4');
let showskelton =false;


let combination = 0 ;
let trail=0;
let mode = 0;

let shirt = 0;
let pant = 0;
let watch = 0;
let shoes = 0;
let sung = 0;

let shirtImg = 0;
let pantImg = 0;
let watchImg = 0;
let shoesImg = 0;
let sungImg = 0;
// box1.style.left = "100px"; //x
// box1.style.top = "200px"; //y


bodyPix.load().then(function(net){
  return net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold)
}).then(function(segmentation){
  console.log("here is segmentation:"+segmentation);
  personSegmentation = segmentation;
})

bodyPix.load().then(function(net){
  return net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold)
}).then(function(segmentation){
  console.log("here is segmentation:"+segmentation);
  partSegmentation = segmentation;
})

const colors = [
  [110, 64, 170, 255], [106, 72, 183, 255], [100, 81, 196, 255], [92, 91, 206, 255],
  [84, 101, 214, 255], [75, 113, 221, 255], [66, 125, 224, 255], [56, 138, 226, 255],
  [48, 150, 224, 255], [40, 163, 220, 255], [33, 176, 214, 255], [29, 188, 205, 255],
  [26, 199, 194, 255], [26, 210, 182, 255], [28, 219, 169, 255], [33, 227, 155, 255],
  [41, 234, 141, 255], [51, 240, 128, 255], [64, 243, 116, 255], [79, 246, 105, 255],
  [96, 247, 97, 255],  [115, 246, 91, 255], [134, 245, 88, 255], [155, 243, 88, 255]
];

function drawMask() {
  const maskBackground = true;
  const backgroundDarkeningMask = bodyPix.toMaskImageData(personSegmentation, maskBackground);
  const coloredPartImageData = bodyPix.toColoredPartImageData(partSegmentation, colors);
  const opacity = 0.7;
  bodyPix.drawMask(canvas, imageElement, coloredPartImageData, opacity);
}

function preload() {
  imgPerson = loadImage('img/per1.jpg');
  clothes = loadImage('img/suit.png');
 shirtImg = loadImage('img/suit.png');
 pantImg =  loadImage('img/halfpant.png');
 watchImg = loadImage('img/watch.png'); 
 shoesImg =  loadImage('img/shoes.png');
 sungImg =  loadImage('img/sunglass.png');
}

function setup() {
 cnv = createCanvas(300, 585);
  centerCanvas();
  //cnv.parent('person');
  background(200);

  img = createImage(300, 585);

  clothes = loadImage('img/suit.jpg');


}





function TrailButton(key){
  console.log(key);
  if (key === 1){
    imgPerson = loadImage('img/per1.jpg');
    //clothes = loadImage('img/suit.png'); 
    shirtImg = loadImage('img/suit.png');
    
    
    shirt=1;

    if(combination == 0){
    pant = 0;
    watch = 0;
    shoes = 0;
    sung = 0;
    }

    description.innerHTML = "Navy black wool formal suit featuring notched lapels with a regular length.";

  }


  if (key === 2){
    shirtImg = loadImage('img/sh1.png');
   
    shirt=1;

    if(combination == 0){
      pant = 0;
      watch = 0;
      shoes = 0;
      sung = 0;
      }

    description.innerHTML = "This men's blue slim fit casual shirt is a closet staple, every man needs. Tuck this pure linen shirt into a pair of well-fitted pants, complete the smart-casual look with wayfarers and loafers.";
    
  }

  if (key === 3){
    imgPerson = loadImage('img/per1.jpg');
    watchImg = loadImage('img/watch.png');
    // clothes = loadImage('img/shoes.png');
    
    watch = 01;

   if(combination == 0){
     
    shirt=0;
    pant = 0;
    shoes = 0;
    sung = 0;

    }




    description.innerHTML = "Let your entry to special occasions be as vibrant as this red shirt that is tailored in a slim fit to take your styling game to the next level. Its solid pattern gives out a sophisticated vibe while long sleeves keep you moving through the day in ease.";
   
  }
  if (key === 4){
  
    imgPerson = loadImage('img/per1.jpg');
    pantImg = loadImage('img/halfpant1.png');
    // clothes = loadImage('img/shoes.png');
   
    
    pant = 1;
  if(combination == 0){
      shirt=0;
      watch = 0;
      shoes = 0;
      sung = 0;
      }



    bodyPix.load().then(function(net){
      return net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      personSegmentation = segmentation;
    })
    
    bodyPix.load().then(function(net){
      return net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      partSegmentation = segmentation;
    })



    description.innerHTML = "Navy blue wool formal suit featuring notched lapels with a regular length.";
   
  }

   if (key === 5){
    clothes = loadImage('img/a.png');
    
    shirt=1;
    
    pant = 0;
    watch = 0;
    shoes = 0;
    
    sung = 0;
    description.innerHTML = "Expertly constructed from supple calf leather and a soft cotton-blend, the jacket features a cropped length, cropped sleeves, a zip fastening, three front pockets.";
   
  }

  if (key === 6){
    imgPerson = loadImage('img/per1.jpg');
    shoesImg = loadImage('img/shoes.png');
    
    
    shoes = 1;

    if(combination == 0){
    shirt =0;
    pant = 0;
    watch = 0;
    sung = 0;

    }


    bodyPix.load().then(function(net){
      return net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      personSegmentation = segmentation;
    })
    
    bodyPix.load().then(function(net){
      return net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      partSegmentation = segmentation;
    })
    

    description.innerHTML = "Expertly constructed from supple calf leather and a soft cotton-blend, the jacket features a cropped length, cropped sleeves, a zip fastening, three front pockets.";
    
  }


  if (key === 7){
    imgPerson = loadImage('img/per1.jpg');
    pantImg = loadImage('img/pant61.png');
    // clothes = loadImage('img/shoes.png');
   
    
    pant = 1;
  if(combination == 0){
      shirt=0;
      watch = 0;
      shoes = 0;
      sung = 0;
      }



    bodyPix.load().then(function(net){
      return net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      personSegmentation = segmentation;
    })
    
    bodyPix.load().then(function(net){
      return net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      partSegmentation = segmentation;
    })


    
    description.innerHTML = "Expertly constructed from supple calf leather and a soft cotton-blend, the jacket features a cropped length, cropped sleeves, a zip fastening, three front pockets.";
    
    
  }

  if (key === 8){
    imgPerson = loadImage('img/per1.jpg');
    //clothes = loadImage('img/suit.png'); 
    pantImg = loadImage('img/pant61.png');
    
     
    pant = 1;
    if(combination == 0){
        shirt=0;
        watch = 0;
        shoes = 0;
        sung = 0;
        }



    bodyPix.load().then(function(net){
      return net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      personSegmentation = segmentation;
    })
    
    bodyPix.load().then(function(net){
      return net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      partSegmentation = segmentation;
    })

  }
  
  if (key === 11){
    imgPerson = loadImage('img/per1.jpg');
    //clothes = loadImage('img/suit.png'); 
    pantImg = loadImage('img/pant71.png');
    
     
    pant = 1;
  if(combination == 0){
      shirt=0;
      watch = 0;
      shoes = 0;
      sung = 0;
      }



    bodyPix.load().then(function(net){
      return net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      personSegmentation = segmentation;
    })
    
    bodyPix.load().then(function(net){
      return net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      partSegmentation = segmentation;
    })
  }

  if (key === 10){
    imgPerson = loadImage('img/per1.jpg');
    //clothes = loadImage('img/suit.png'); 
    shirtImg = loadImage('img/shirt81.png');
    
    
    shirt=1;

    if(combination == 0){
    pant = 0;
    watch = 0;
    shoes = 0;
    sung = 0;
    }

    description.innerHTML = "Let your entry to special occasions be as vibrant as this red shirt that is tailored in a slim fit to take your styling game to the next level. Its solid pattern gives out a sophisticated vibe while long sleeves keep you moving through the day in ease.";
    
  }
  if (key === 9){
    imgPerson = loadImage('img/per1.jpg');
    //clothes = loadImage('img/suit.png'); 
    shirtImg = loadImage('img/shirt41.png');
    
    
    shirt=1;

    if(combination == 0){
    pant = 0;
    watch = 0;
    shoes = 0;
    }

    description.innerHTML = "This Wildcraft T-Shirt is designed to empower you with the following Features & Benefits: An all-season Waffle Knit Polo T-shift for Men for comfort fit and ease of movement in the shade Navy Blue. It is 100% Cotton. Comfort fit for ease of movement.";
    
  }

  if(key == 12){
    imgPerson = loadImage('img/per1.jpg');
    sungImg = loadImage('img/sunglass.png');
    
    
    sung =1;

    if(combination == 0){
    shirt =0;
    pant = 0;
    watch = 0; 
    shoes = 0;

    }


    bodyPix.load().then(function(net){
      return net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      personSegmentation = segmentation;
    })
    
    bodyPix.load().then(function(net){
      return net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold)
    }).then(function(segmentation){
      console.log("here is segmentation:"+segmentation);
      partSegmentation = segmentation;
    })
    

    description.innerHTML = "Expertly constructed from supple calf leather and a soft cotton-blend, the jacket features a cropped length, cropped sleeves, a zip fastening, three front pockets.";
    
  }


}




function draw() {
  background(220); // w, a

  image(imgPerson, 0, 0);


// if(combination){}
// else{}


  if (personSegmentation != null && partSegmentation != null && trail == 0) {
    //clothes = loadImage('img/suit.png');
    imgPerson.loadPixels();
    img.loadPixels();
    let xMins = img.width;
    let xMaxs= 0;
    let yMins = img.height;
    let yMaxs = 0;

    let xMinp = img.width;
    let xMaxp = 0;
    let yMinp = img.height;
    let yMaxp = 0;
   
    let xMinw = img.width;
    let xMaxw = 0;
    let yMinw = img.height;
    let yMaxw = 0;
    
    let xMinsh = img.width;
    let xMaxsh = 0;
    let yMinsh = img.height;
    let yMaxsh = 0;

    let xMinsun = img.width;
    let xMaxsun= 0;
    let yMinsun = img.height;
    let yMaxsun = 0;
    

    for (let y=0; y<img.height; y++) {
      for (let x=0; x<img.width; x++) {
        let index = x + y * img.width;
        let partIndex = partSegmentation.data[index];
        //console.log("partindex"+partIndex);
       
        if (partIndex ==12 && shirt == 1) {
          //let c = colors[partIndex];
          //img.set(x, y, c);

          let r = imgPerson.pixels[index*4 + 0];
          let g = imgPerson.pixels[index*4 + 1];
          let b = imgPerson.pixels[index*4 + 2];
          let a = imgPerson.pixels[index*4 + 3];
          img.set(x, y, [r,g,b,a]);

          // x
          if (xMins > x) {
            xMins = x;
          }
          if (xMaxs < x) {
            xMaxs = x;
          }
          // y
          if (yMins > y) {
            yMins = y;
          }
          if (yMaxs < y) {
            yMaxs = y;
          }
        }

        if (partIndex ==2 && pant == 1) {
          //let c = colors[partIndex];
          //img.set(x, y, c);
  
          let r = imgPerson.pixels[index*4 + 0];
          let g = imgPerson.pixels[index*4 + 1];
          let b = imgPerson.pixels[index*4 + 2];
          let a = imgPerson.pixels[index*4 + 3];
          img.set(x, y, [r,g,b,a]);
  
          // x
          if (xMinp > x) {
            xMinp = x;
          }
          if (xMaxp < x) {
            xMaxp = x;
          }
          // y
          if (yMinp > y) {
            yMinp = y;
          }
          if (yMaxp < y) {
            yMaxp = y;
          }
        }
        if (partIndex ==22 && watch == 1) {
          //let c = colors[partIndex];
          //img.set(x, y, c);
  
          let r = imgPerson.pixels[index*4 + 0];
          let g = imgPerson.pixels[index*4 + 1];
          let b = imgPerson.pixels[index*4 + 2];
          let a = imgPerson.pixels[index*4 + 3];
          img.set(x, y, [r,g,b,a]);
  
          // x
          if (xMinw > x) {
            xMinw = x;
          }
          if (xMaxw < x) {
            xMaxw = x;
          }
          // y
          if (yMinw > y) {
            yMinw = y;
          }
          if (yMaxw < y) {
            yMaxw = y;
          }
        }

        if (partIndex ==9 && shoes == 1) {
          //let c = colors[partIndex];
          //img.set(x, y, c);
  
          let r = imgPerson.pixels[index*4 + 0];
          let g = imgPerson.pixels[index*4 + 1];
          let b = imgPerson.pixels[index*4 + 2];
          let a = imgPerson.pixels[index*4 + 3];
          img.set(x, y, [r,g,b,a]);
  
          // x
          if (xMinsh > x) {
            xMinsh = x;
          }
          if (xMaxsh < x) {
            xMaxsh = x;
          }
          // y
          if (yMinsh > y) {
            yMinsh = y;
          }
          if (yMaxsh < y) {
            yMaxsh = y;
          }
        }
        if (partIndex ==1 && sung == 1) {
          //let c = colors[partIndex];
          //img.set(x, y, c);
  
          let r = imgPerson.pixels[index*4 + 0];
          let g = imgPerson.pixels[index*4 + 1];
          let b = imgPerson.pixels[index*4 + 2];
          let a = imgPerson.pixels[index*4 + 3];
          img.set(x, y, [r,g,b,a]);
  
          // x
          if (xMinsun > x) {
            xMinsun = x;
          }
          if (xMaxsun < x) {
            xMaxsun = x;
          }
          // y
          if (yMinsun > y) {
            yMinsun = y;
          }
          if (yMaxsun < y) {
            yMaxsun = y;
          }
        }
       
        else {
          img.set(x, y, [0,0,0,0]);
        }
      }
    }
    img.updatePixels();
   image(img, 0, 0, img.width, img.height);

    stroke(0,255,0);
    // line(xMin, 0, xMin, height);
    // line(xMax, 0, xMax, height);
    // line(0, yMin, width, yMin);
    // line(0, yMax, width, yMax);
   
    if(shirt == 1)
   image(shirtImg, xMins -7 , yMins + 90, (xMaxs- xMins +25), (yMaxs - yMins -180));
   
   if(pant ==1)
   image(pantImg, xMinp -15 , yMinp -10 , (xMaxp - xMinp ) +110 , (yMaxp - yMinp)+30 );
   
   if(watch ==1)
   image(watchImg, xMinw -20  , yMinw +30 , (xMaxw - xMinw ) +15, (yMaxw - yMinw)  );
   
   if(shoes ==1){
   image(shoesImg, xMinsh -25 , yMinsh  -20 , (xMaxsh - xMinsh )+70 , (yMaxsh - yMinsh)+50  );
   image(shoesImg, xMinsh + 40 , yMinsh  -20 , (xMaxsh - xMinsh )+70 , (yMaxsh - yMinsh)+50  );
   }

   if(sung ==1)
   image(sungImg, xMinsun  +9  , yMinsun +35  , (xMaxsun- xMinsun ) +35, (yMaxsun - yMinsun) -73  );
   

     //ellipse(xMin,yMax,55);
    // ellipse(xMin,yMin,55);
    // ellipse(xMin,yMin,55);
    // ellipse(xMin,yMin,55);
   
  }

}

function trailchange(){
  if(trail == 0){
    trail = 1;
    originalImage.innerHTML="Trail Image";
  }
  
    else{ 
      trail =0;originalImage.innerHTML="Original Image ";
    }    

}


function shirtchange(){
  
  
  if(shirt == 0){
  shirt = 1;
  shirtImage.innerHTML="Trail Image";
}

  else{ 
    shirt =0;shirtImage.innerHTML="Add shirt ";
  }    
  
  }

function pantchange(){
     
  if(pant == 0){
    pant = 1;
    pantImage.innerHTML="Trail pant Image";
  }
  
    else{ 
      pant =0;
      pantImage.innerHTML="Add pant ";
    }    
  }

function watchchange(){
      if(watch == 0){
      watch = 1;
      watchImage.innerHTML="Trail  Wrist Image";}

      else
      { watch =0;
        watchImage.innerHTML="Add Watch ";
      }
}
      
 function shoeschange(){
  if(shoes == 0){
    shoes = 1;
    shoes.innerHTML="Trail shoes Image";
  }
  
    else{ 
      shoes =0;
      shoesImage.innerHTML="Add shoes ";
    }  
 }            

      
 function sungchange(){
  if(sung == 0){
    sung = 1;
    sung.innerHTML="Trail sSunglass Image";
  }
  
    else{ 
      sung =0;
      sungImage.innerHTML="Add Sunglass";
    }  
 } 
function changeCombinations(){
  console.log("comininations");
  if(combination == 0){
    combination = 1;
    combinationID.innerHTML="Combinations ON";
  }
  
    else{ 
      combination =0;
      combinationID.innerHTML="Try Combinations ";
      shirt = 0;
      pant = 0;
      watch = 0;
      shoes = 0;
      sung = 0;
    }    
 }

function centerCanvas() {
  cnv.position(610, 160);
}

function AddToCart(){
  alert("Item is moved to Cart !");
}

  // function mousePressed(){
  //   to_save = get(xMin, yMin, (xMax-xMin), (yMax-yMin) ); // Grab an image of a 100x200 rectangle at (20,30).
  //   to_save.save("segmentation.jpg");
  // }















  
//   if (personSegmentation != null && partSegmentation != null && trail == 0 && pant ==1) {
//     //clothes = loadImage('img/halfpant.png');
//     imgPerson.loadPixels();
//     img.loadPixels();
//     let xMinp = img.width;
//     let xMaxp = 0;
//     let yMinp = img.height;
//     let yMaxp = 0;
//     // let xMin1 = img.width;
//     // let xMax1 = 0;
//     // let yMin1 = img.height;
//     // let yMax1 = 0;
//     for (let y=0; y<img.height; y++) {
//       for (let x=0; x<img.width; x++) {
//         let index = x + y * img.width;
//         let partIndex = partSegmentation.data[index];
//         //console.log("partindex"+partIndex);
//         if (partIndex ==2) {
//           //let c = colors[partIndex];
//           //img.set(x, y, c);
  
//           let r = imgPerson.pixels[index*4 + 0];
//           let g = imgPerson.pixels[index*4 + 1];
//           let b = imgPerson.pixels[index*4 + 2];
//           let a = imgPerson.pixels[index*4 + 3];
//           img.set(x, y, [r,g,b,a]);
  
//           // x
//           if (xMinp > x) {
//             xMinp = x;
//           }
//           if (xMaxp < x) {
//             xMaxp = x;
//           }
//           // y
//           if (yMinp > y) {
//             yMinp = y;
//           }
//           if (yMaxp < y) {
//             yMaxp = y;
//           }
//         }
       
//         else {
//           img.set(x, y, [0,0,0,0]);
//         }
//       }
//     }
//     img.updatePixels();
//    image(img, 0, 0, img.width, img.height);
  
//     stroke(0,255,0);
  
//     image(pantImg, xMinp -60 , yMinp - 50 , (xMaxp - xMinp ) + 200, (yMaxp - yMinp) +80 );
   
//     //image(shirtImg, xMin -7 , yMin+90, (xMax- xMin +20), (yMax - yMin -180));
  
//   }
  

//  if (personSegmentation != null && partSegmentation != null && trail == 0 && shoes ==1) {
//   imgPerson.loadPixels();
//   img.loadPixels();
//   let xMin = img.width;
//   let xMax = 0;
//   let yMin = img.height;
//   let yMax = 0;
//   let xMin1 = img.width;
//   let xMax1 = 0;
//   let yMin1 = img.height;
//   let yMax1 = 0;
//   for (let y=0; y<img.height; y++) {
//     for (let x=0; x<img.width; x++) {
//       let index = x + y * img.width;
//       let partIndex = partSegmentation.data[index];
//       //console.log("partindex"+partIndex);
//       if (partIndex ==20) {
//         //let c = colors[partIndex];
//         //img.set(x, y, c);

//         let r = imgPerson.pixels[index*4 + 0];
//         let g = imgPerson.pixels[index*4 + 1];
//         let b = imgPerson.pixels[index*4 + 2];
//         let a = imgPerson.pixels[index*4 + 3];
//         img.set(x, y, [r,g,b,a]);

//         // x
//         if (xMin > x) {
//           xMin = x;
//         }
//         if (xMax < x) {
//           xMax = x;
//         }
//         // y
//         if (yMin > y) {
//           yMin = y;
//         }
//         if (yMax < y) {
//           yMax = y;
//         }
//       }

//       if (partIndex ==6) {
       
//         if (xMin1 > x) {
//           xMin1 = x;
//         }
//         if (xMax1 < x) {
//           xMax1 = x;
//         }
//         // y
//         if (yMin1 > y) {
//           yMin1 = y;
//         }
//         if (yMax1 < y) {
//           yMax1 = y;
//         }
//       }
     
//       else {
//         img.set(x, y, [0,0,0,0]);
//       }
//     }
//   }
//   img.updatePixels();
//   image(img, 0, 0, img.width, img.height);

//   stroke(0,255,0);
  
  
//   image(shoesImg, xMin+5, yMin -70, (xMax- xMin ), (yMax - yMin)+100);
//   image(shoesImg, xMin1+50, yMin1 -60, (xMax1- xMin1 -90), (yMax1 - yMin1 +40));


 
// }
// if (personSegmentation != null && partSegmentation != null && trail == 0 && watch ==1) {
//   imgPerson.loadPixels();
//   img.loadPixels();
//   let xMin2 = img.width;
//   let xMax2 = 0;
//   let yMin2 = img.height;
//   let yMax2 = 0;

//   for (let y=0; y<img.height; y++) {
//     for (let x=0; x<img.width; x++) {
//       let index = x + y * img.width;
//       let partIndex = partSegmentation.data[index];
//       //console.log("partindex"+partIndex);
//       if (partIndex ==20) {
//         //let c = colors[partIndex];
//         //img.set(x, y, c);

//         let r = imgPerson.pixels[index*4 + 0];
//         let g = imgPerson.pixels[index*4 + 1];
//         let b = imgPerson.pixels[index*4 + 2];
//         let a = imgPerson.pixels[index*4 + 3];
//         img.set(x, y, [r,g,b,a]);

//         // x
//         if (xMin2 > x) {
//           xMin2 = x;
//         }
//         if (xMax2 < x) {
//           xMax2 = x;
//         }
//         // y
//         if (yMin2 > y) {
//           yMin = y;
//         }
//         if (yMax2 < y) {
//           yMax2 = y;
//         }
//       }
     
//       else {
//         img.set(x, y, [0,0,0,0]);
//       }
//     }
//   }
//   img.updatePixels();
//  image(img, 0, 0, img.width, img.height);

//   stroke(0,255,0);
//   image(watchImg, xMin2-10 , yMin2 -70 , (xMax2- xMin2 )-200, (yMax2 - yMin2)+50);

// }

