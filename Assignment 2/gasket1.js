"use strict";

var gl;
var points;
var DrawPoints = 5000;
var NumPoints = [5000, 4000, 3000, 2000, 1000, 500, 1000, 3000, 5000, 15000];
var ax = [-1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.7, -0.8, -0.9, -1.0];
var ay = [-1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.7, -0.8, -0.9, -1.0];
var by = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.7, 0.8, 0.9, 1.0];
var cx = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.7, 0.8, 0.9, 1.0]
var cy = [-1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.7, -0.8, -0.9, -1.0]

var HexRGB;
var HexR, HexB, HexG;

//Was getting an "uncaught TypeError" so needed to initialize shaders before init() 
document.getElementById("the_head").insertAdjacentHTML('beforeEnd', "<script id=\"vertex-shader\" type=\"x-shader/x-vertex\"></script>");
document.getElementById("the_head").insertAdjacentHTML('beforeEnd', "<script id=\"fragment-shader\" type=\"x-shader/x-fragment\"></script>");


window.onload = function init(){
    my_display();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, points.length );
}

async function my_animate() {

    document.getElementById("current_status").innerHTML = "Animating triangle.";
    var count = 0;

    for(var my_loop = 0; my_loop < 10; my_loop++){
        
        var canvas = document.getElementById( "gl-canvas" );
        
        gl = WebGLUtils.setupWebGL( canvas );
        if ( !gl ) { alert( "WebGL isn't available" ); }

        document.getElementById("vertex-shader").innerHTML = "attribute vec4 vPosition; void main(){ gl_PointSize = 1.0; gl_Position = vPosition;}";

        //Set new RGB values randomly for each iteration
        HexR = Math.random();
        HexG = Math.random();
        HexB = Math.random();

        //Assign random RGB values to frag-shader
        document.getElementById("fragment-shader").innerHTML = "precision mediump float; void main() { gl_FragColor = vec4( "+HexR.toFixed(1)+", "+HexG.toFixed(1)+", "+HexB.toFixed(1)+", 1.0 );}";
        
        //
        //  Initialize our data for the Sierpinski Gasket
        //

        // First, initialize the corners of our gasket with three points.
        //Used an array to change size of gasket for each iteration
        var vertices = [
            vec2( ax[count], ay[count] ),
            vec2(  0,  by[count] ),
            vec2(  cx[count], cy[count] )
        ];

        // Specify a starting point p for our iterations
        // p must lie inside any set of three vertices

        var u = add( vertices[0], vertices[1] );
        var v = add( vertices[0], vertices[2] );
        var p = scale( 0.25, add( u, v ) );

        // And, add our initial point into our array of points

        points = [ p ];

        // Compute new points
        // Each new point is located midway between
        // last point and a randomly chosen vertex

        for ( var i = 0; points.length < NumPoints[count]; ++i ) {
            var j = Math.floor(Math.random() * 3);
            p = add( points[i], vertices[j] );
            p = scale( 0.5, p );
            points.push( p );
        }

        //
        //  Configure WebGL
        //
        gl.viewport( 0, 0, canvas.width, canvas.height );
        gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

        //  Load shaders and initialize attribute buffers

        var program = initShaders( gl, "vertex-shader", "fragment-shader" );
        gl.useProgram( program );

        

        // Load the data into the GPU

        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

        // Associate out shader variables with our data buffer

        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );

    
        count ++;
        render();

        await new Promise(r => setTimeout(r, 1000));
    };
}
function my_display(){
    //Update Status to Display
    document.getElementById("current_status").innerHTML = "Displaying Triangle.";

    //Setup colors
    HexRGB = document.getElementById("color_picker").value;

    //Pulls RGB values from the color_picker 
    HexR = "0x"+HexRGB.slice(1,3);
    HexG = "0x"+HexRGB.slice(3,5);
    HexB = "0x"+HexRGB.slice(5,7);

    //Converts RGB values from a string of Hex into an int and then from an int to decimal 
    //so it is compatible with the frag-shader
    HexR = (parseFloat(parseInt(HexR)) / parseFloat(parseInt("0xff")))
    HexG = (parseFloat(parseInt(HexG)) / parseFloat(parseInt("0xff")))
    HexB = (parseFloat(parseInt(HexB)) / parseFloat(parseInt("0xff")))

    document.getElementById("vertex-shader").innerHTML = "attribute vec4 vPosition; void main(){ gl_PointSize = 1.0; gl_Position = vPosition;}";
    document.getElementById("fragment-shader").innerHTML = "precision mediump float; void main() { gl_FragColor = vec4( "+HexR.toFixed(2)+", "+HexG.toFixed(2)+", "+HexB.toFixed(2)+", 1.0 );}";

    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.

    var vertices = [
        vec2( ax[0], ay[0] ),
        vec2(  0,  by[0] ),
        vec2(  cx[0], cy[0] )
    ];

    // Specify a starting point p for our iterations
    // p must lie inside any set of three vertices

    var u = add( vertices[0], vertices[1] );
    var v = add( vertices[0], vertices[2] );
    var p = scale( 0.25, add( u, v ) );

    // And, add our initial point into our array of points

    points = [ p ];

    // Compute new points
    // Each new point is located midway between
    // last point and a randomly chosen vertex

    for ( var i = 0; points.length < DrawPoints; ++i ) {
        var j = Math.floor(Math.random() * 3);
        p = add( points[i], vertices[j] );
        p = scale( 0.5, p );
        points.push( p );
    }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
}
//Displays color changed status
function color_update()
{
    //Status update
    document.getElementById("current_status").innerHTML = "Color has been changed.";
}
//Displays points changed status
function slider_update()
{
    //Status update
    document.getElementById("current_status").innerHTML = "Number of points has been changed.";
    DrawPoints = document.getElementById("point_slider").value;
}
//Reset the Seirpinski Gasket back to the default # points and color and displays reset status
function my_reset()
{
    document.getElementById("point_slider").value = 5000;
    DrawPoints = 5000;
    document.getElementById("color_picker").value = "#ff0000";
    my_display();
    document.getElementById("current_status").innerHTML = "Resetting Gasket.";
}
//For continuing code execution after async operation
function call_update(callback){
    callback();
}