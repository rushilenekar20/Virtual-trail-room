let img;
let poseNet;
let poses = [];
let pose ;

let chest_ht = document.getElementById('chest');
let hip_ht = document.getElementById('hips');
let insem_ht = document.getElementById('insem');
let result_ht = document.getElementById('result');

function setup() {
    //   createCanvas(900, 600);
    var ccanvas = createCanvas(500, 660);
    ccanvas.parent('canvas');

    // create an image using the p5 dom library
    // call modelReady() when it is loaded
    img = createImg('img/permeasure.jpg', imageReady);
    // set the image size to the size of the canvas
    img.size(width, height);

    img.hide(); // hide the image in the browser
    frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
}

// when the image is ready, then load up poseNet
function imageReady(){
    // set some options
    let options = {
        imageScaleFactor: 1,
        minConfidence: 0.1
    }
    
    // assign poseNet
    poseNet = ml5.poseNet(modelReady, options);
    // This sets up an event that listens to 'pose' events
    poseNet.on('pose', function (results) {
        poses = results;
        pose = poses[0].pose;

     
    });
}

// when poseNet is ready, do the detection
function modelReady() {
    select('#status').html('Model Loaded');
     
    // When the model is ready, run the singlePose() function...
    // If/When a pose is detected, poseNet.on('pose', ...) will be listening for the detection results 
    // in the draw() loop, if there are any poses, then carry out the draw commands
    poseNet.singlePose(img)
}

// draw() will not show anything until poses are found
function draw() {
    if (poses.length > 0) {
        image(img, 0, 0, width, height);
        drawSkeleton(poses);
        drawKeypoints(poses);
        noLoop(); // stop looping when the poses are estimated
    }


}

// The following comes from https://ml5js.org/docs/posenet-webcam
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    // Loop through all the poses detected
    console.log("here is pose "+poses);
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(255);
                stroke(20);
                strokeWeight(4);
                ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
            }
        }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255);
            strokeWeight(1);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}

function showdata(){
    console.log(pose);
          
     
        let x_chest_1 = pose.keypoints[5].position.x;
        let y_chest_1 = pose.keypoints[5].position.y;
        let x_chest_2 = pose.keypoints[6].position.x;
        let y_chest_2 = pose.keypoints[6].position.y;

        let x_waist_1 = pose.keypoints[9].position.x;
        let y_waist_1 = pose.keypoints[9].position.y;
        let x_waist_2 = pose.keypoints[10].position.x;
        let y_waist_2 = pose.keypoints[10].position.y;

        let x_hips_1 = pose.keypoints[11].position.x;
        let y_hips_1 = pose.keypoints[11].position.y;
        let x_hips_2 = pose.keypoints[12].position.x;
        let y_hips_2 = pose.keypoints[12].position.y;

        let x_ankle_1 = pose.keypoints[15].position.x;
        let y_ankle_1 = pose.keypoints[15].position.y;        
        let x_ankle_2 = pose.keypoints[16].position.x;
        let y_ankle_2 = pose.keypoints[16].position.y;


  

        let chest_size =  Math.sqrt( ( x_chest_1 - x_chest_2)*( x_chest_1 - x_chest_2) + ( y_chest_1 - y_chest_2) * ( y_chest_1 - y_chest_2) );
        let waist_size =  Math.sqrt( ( x_waist_1 - x_waist_2)*( x_waist_1 - x_waist_2) + ( y_waist_1 - y_waist_2) * ( y_waist_1 - y_waist_2) );
        let hip_size =  Math.sqrt( ( x_hips_1 - x_hips_2)*( x_hips_1 - x_hips_2) + ( y_hips_1 - y_hips_2) * ( y_hips_1 - y_hips_2));

       
        
        let mean_hip_x = x_hips_1 + (x_hips_2 - x_hips_1)/2;
        let mean_hip_y = y_hips_1 + (y_hips_2 - y_hips_1)/2;
        let mean_ankle_x = x_ankle_1 + (x_ankle_2 - x_ankle_1)/2;
        let mean_ankle_y = y_ankle_1 + (y_ankle_2 - y_ankle_1)/2;
        let  insem_size  = Math.sqrt( ( mean_hip_x- mean_ankle_x)*(mean_hip_x -mean_ankle_x) + ( mean_hip_y - mean_ankle_y ) * ( mean_hip_y -  mean_ankle_y )); 
        

        console.log("chest size :"+ chest_size);
        console.log("hips size :"+ hip_size);
        console.log("waist size :"+ waist_size);
        console.log("insem size :"+ insem_size);
        chest_ht.innerHTML = Math.round(chest_size);
        hip_ht.innerHTML = Math.round(hip_size);
        insem_ht.innerHTML = Math.round(insem_size);
        result_ht.innerHTML = "Medium Size : (M)";
}