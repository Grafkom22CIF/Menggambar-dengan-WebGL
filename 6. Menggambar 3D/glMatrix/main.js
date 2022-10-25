function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        0.0,0.0,0.5,    //titik A 0
        0.5,0.0,0.5,    //titik B 1
        0.5,0.0,0.0,    //titik C 2
        0.0,0.0,0.0,    //titik D 3
        0.25,0.5,0.25   //titik E 4
    ];

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
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tringles), gl.STATIC_DRAW);
    
    //color buffer
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //index buffer
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    //mengambil dan menyimpan informasi vertex dari html dg document getElementById
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    //membuat vertex shader
    var vertexShader = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //mengambil dan menyimpan informasi fragment dari html dg document getElementByID
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    //membuat fragment shader
    var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //menambahkan info shader ke package agar bisa dicompile
    var program = gl.createProgram();  
    gl.attachShader(program, vertexShader);   
    gl.attachShader(program, fragmentShader);   
    gl.linkProgram(program);
    gl.useProgram(program);

    //menambahkan vertices ke dalam aPosition dan aColor untuk digambar
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //color
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);
    
    var Pmatrix = gl.getUniformLocation(program, "uProj");
    var Vmatrix = gl.getUniformLocation(program, "uView");
    var Mmatrix = gl.getUniformLocation(program, "uModel");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
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

    var freeze = false;
    function onMouseClick(event){
        if(freeze) freeze = false;
        else freeze = true;
    }
    document.addEventListener('click', onMouseClick, false);

    function onKeyDown(event){
        if(event.keyCode == 32) freeze = true;
    }
    function onKeyUp(event){
        if(event.keyCode == 32) freeze = false;
    }
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    var theta = glMatrix.glMatrix.toRadian(1);    
    var animate = function(){
        if(!freeze){
            glMatrix.mat4.rotate(modmatrix, modmatrix, theta, [1,1,1]);
        }
        
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clearDepth(1.0);

        gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(Pmatrix, false, projmatrix);
        gl.uniformMatrix4fv(Vmatrix, false, viewmatrix);
        gl.uniformMatrix4fv(Mmatrix, false, modmatrix);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(animate);
    }    
    animate(0);    
}