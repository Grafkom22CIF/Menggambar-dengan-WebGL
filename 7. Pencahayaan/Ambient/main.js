var freeze = false;
function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var tringles = [
        0.0,0.0,0.5, 0.5,0.0,0.5, 0.5,0.0,0.0, 0.0,0.0,0.0, //abcd
        0.0,0.0,0.5, 0.0,0.0,0.0, 0.25,0.5,0.25,            //ade
        0.5,0.0,0.5, 0.5,0.0,0.0, 0.25,0.5,0.25,             //bce
        0.0,0.0,0.0, 0.5,0.0,0.0, 0.25,0.5,0.25,             //dce
        0.0,0.0,0.5,  0.5,0.0,0.5, 0.25,0.5,0.25            //abe 
    ];
    
    var colors = [
        1,0,0, 1,0,0, 1,0,0, 1,0,0,   //merah
        0,0,1, 0,0,1, 0,0,1,          //blue
        0,1,0, 0,1,0, 0,1,0,           //green
        1,0,1, 1,0,1, 1,0,1,            //pink
        0,1,1, 0,1,1, 0,1,1             //tosca
    ];

    var indices = [
       0,1,2, 0,2,3,
       4,5,6, 7,8,9,
       10,11,12, 13,14,15
    ];

    //vertex buffer
    var vertexBuffer = gl.createBuffer();
    bindBuffer(gl, 'array', tringles, vertexBuffer);
    
    //color buffer
    var colorBuffer = gl.createBuffer();
    bindBuffer(gl, 'array', colors, colorBuffer);

    //index buffer
    var indexBuffer = gl.createBuffer();
    bindBuffer(gl, 'element', indices, indexBuffer);


    //mengambil dan menyimpan informasi vertex dari html dg document getElementById
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    //membuat vertex shader
    var vertexShader = gl.createShader( gl.VERTEX_SHADER );
    createShader(gl, vertexShader, vertexShaderCode);

    //mengambil dan menyimpan informasi fragment dari html dg document getElementByID
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    //membuat fragment shader
    var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    createShader(gl, fragmentShader, fragmentShaderCode);

    //menambahkan info shader ke package agar bisa dicompile
    var program = gl.createProgram();  
    infoPackage(gl, program, [vertexShader, fragmentShader]);

    //menambahkan vertices ke dalam aPosition dan aColor untuk digambar
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    arrayIndexing(gl, aPosition);

    //color
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var aColor = gl.getAttribLocation(program, "aColor");
    arrayIndexing(gl, aColor);
    
    var Pmatrix = gl.getUniformLocation(program, "uProj");
    var Vmatrix = gl.getUniformLocation(program, "uView");
    var Mmatrix = gl.getUniformLocation(program, "uModel");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var uAmbientColor = gl.getUniformLocation(program, "uAmbientColor");
    var uAmbientIntens = gl.getUniformLocation(program, "uAmbientIntensity");
    gl.uniform3fv(uAmbientColor, [1.0, 1.0, 1.0]);
    gl.uniform1f(uAmbientIntens, 0.8);

    
    var projmatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(
        projmatrix,
        glMatrix.glMatrix.toRadian(90),     //sudut fov
        1.0,    //aspect ratio
        0.5,    //zmin
        10.0    //zmax
    );
    var modmatrix = glMatrix.mat4.create();
    var viewmatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(
        viewmatrix,
        [0.0, 0.0, 2.0],    //posisi kamera positif z 2
        [0.0, 0.0, -2.0],   //kemana kamera menghadap
        [0.0, 1.0, 0.0]     //arah atas kamera
    );
    
    document.addEventListener('click', onMouseClick, false);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    var theta = glMatrix.glMatrix.toRadian(1);    
    var animate = function(){
        if(!freeze){
            glMatrix.mat4.rotate(modmatrix, modmatrix, theta, [1,1,1]);
        }
        
        prepareCanvas(gl, canvas);

        gl.uniformMatrix4fv(Pmatrix, false, projmatrix);
        gl.uniformMatrix4fv(Vmatrix, false, viewmatrix);
        gl.uniformMatrix4fv(Mmatrix, false, modmatrix);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(animate);
    }    
    animate(0);    
}