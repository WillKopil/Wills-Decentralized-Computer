// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});

var controls = new THREE.FirstPersonControls(camera, renderer.domElement);

// Configure renderer clear color
renderer.setClearColor( 0xffffff, 0);

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
let renderContainer = document.createElement('div');
renderContainer.setAttribute('style','z-index: -1;position:fixed;top:0;left:0;');
//document.body.appendChild( renderer.domElement );
renderContainer.appendChild( renderer.domElement );
document.body.appendChild( renderContainer );

//--------------------------------------------------------
// ADDING A CUSTOM MODEL
//--------------------------------------------------------

const loader = new THREE.GLTFLoader();
var forest;

// Load a glTF resource
loader.load(
	// resource URL
	'kokiri/kokiri_forest.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    forest = gltf.scene;
		scene.add( forest );
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	}
);


// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Ambiant lighting
const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( light );

// Camera follow spline
var spline = new THREE.CatmullRomCurve3( [
	new THREE.Vector3(-0.41659999990463276, 1.6336999995708468, 11.282800000190726),
	new THREE.Vector3( -1.256700000047686, 1.6338999993801129, 7.140000000238435),
	new THREE.Vector3(-5.383714514702151, 2.322387576479296, 5.075950029095314),
	new THREE.Vector3(-9.231299999952293, 2.166000000000003, 4.817699999570876),
	new THREE.Vector3(-12.829999999046272, 0.5501999998092664, -1.6628000006675472),
  new THREE.Vector3(-10.697299998998625, 0.716599999904634, -4.4946000006198705),
  new THREE.Vector3(-5.266099998712568, 0.716599999904634, -3.0119000005721865),
  new THREE.Vector3(4.914558664096966, 0.9011746782094197, -1.7652858079871652),
  new THREE.Vector3(13.467731655622838, 2.83263691876875, -0.9362045858109391),
  new THREE.Vector3(14.301267935141546, 4.084822421310777, 3.154864944851691),
  new THREE.Vector3(11.126648373894048, 3.603639646668969, 2.8972795561863296)
] );

//Add spline to scene
const points = spline.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );

scene.add(curveObject);

var camPosIndex = 0;

var clock = new THREE.Clock();

//Debuging
setInterval(function(){
	console.log("X: " + camera.position.x + " Y: " + camera.position.y + " Z: " + camera.position.z);
},1000);

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  // Camera follow spline
  camPosIndex++;
  if (camPosIndex > 10000) {
    camPosIndex = 0;
  }
  
  var camPos = spline.getPoint(camPosIndex / 10000);
  var camRot = spline.getTangent(camPosIndex / 10000);

  camera.position.x = camPos.x;
  camera.position.y = camPos.y;
  camera.position.z = camPos.z;
  
  camera.rotation.x = camRot.x;
  camera.rotation.y = camRot.y;
  camera.rotation.z = camRot.z;
  
  camera.lookAt(spline.getPoint((camPosIndex+1) / 10000));

  //This line allows camera control via keys and mouse
  //controls.update(clock.getDelta());

  //planet.rotation.x += 0.01;
  //planet.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();