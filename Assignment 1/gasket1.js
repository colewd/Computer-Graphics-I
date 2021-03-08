"use strict";

var gl;
var points;

var NumPoints = [5000, 4000, 3000, 2000, 1000, 500, 1000, 2000, 3000, 5000];
var ax = [-1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.7, -0.8, -0.9, -1.0];
var ay = [-1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.7, -0.8, -0.9, -1.0];
var by = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.7, 0.8, 0.9, 1.0];
var cx = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.7, 0.8, 0.9, 1.0]
var cy = [-1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.7, -0.8, -0.9, -1.0]
var color1 = 1.0;
var color2 = 0.0;
var color3 = 0.0;


window.onload = async function init(){


    for(var count = 0; count < 10; count++){   
            
        document.getElementById("vertex-shader").innerHTML = "attribute vec4 vPosition; void main(){ gl_PointSize = 1.0; gl_Position = vPosition;}";

        color1 = Math.random();
        color2 = Math.random();
        color3 = Math.random();

        document.getElementById("fragment-shader").innerHTML = "precision mediump float; void main(){ gl_FragColor = vec4( "+color1.toFixed(1)+", "+color2.toFixed(1)+", "+color3.toFixed(1)+", 1.0 );}";

        var canvas = document.getElementById( "gl-canvas" );

        gl = WebGLUtils.setupWebGL( canvas );
        if ( !gl ) { alert( "WebGL isn't available" ); }

        //
        //  Initialize our data for the Sierpinski Gasket
        //

        // First, initialize the corners of our gasket with three points.

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

        render();

        console.log(count + 1);

        await new Promise(r => setTimeout(r, 1000));
    };
};







function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, points.length );
}

function adjustPoints() {
    window.onload = function init()
    {
        var canvas = document.getElementById( "gl-canvas" );

        gl = WebGLUtils.setupWebGL( canvas );
        if ( !gl ) { alert( "WebGL isn't available" ); }

        //
        //  Initialize our data for the Sierpinski Gasket
        //

        // First, initialize the corners of our gasket with three points.

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

        render();
    };
}