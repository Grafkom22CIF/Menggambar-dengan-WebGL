function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //mendefinisikan titik yg akan dibuat
    var vertices = [
        0.1, 0.5, 1.0, 0.0, 0.0,   //titik A 
        0.5, 0.5, 1.0, 0.0, 0.0,   //titik B 
        0.5, 0.1, 1.0, 0.0, 0.0,    //titik C 
        0.1, 0.1, 1.0, 0.0, 0.0    //titik D yellow
    ];

    //membuat variabel sementara (temporary) untuk menyimpan koordinat sblm digambar
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

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
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);  
    
    var Pmatrix = gl.getUniformLocation(program, "uProj");
    var Vmatrix = gl.getUniformLocation(program, "uView");
    var Mmatrix = gl.getUniformLocation(program, "uModel");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    var projmatrix = getprojection(40, canvas.width/canvas.height, 1, 100);
    var modmatrix = [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1];
    var viewmatrix = [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1];

    viewmatrix[14] = viewmatrix[14]-2;

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

    var timeold = 0;
   function render(time) {
        if(!freeze){
            var dt = time-timeold;
            skalasi(modmatrix);
            //rotasi(mod_matrix, 0.005);
            time_old = time;
        }

        gl.uniformMatrix4fv(Pmatrix, false, projmatrix);
        gl.uniformMatrix4fv(Vmatrix, false, viewmatrix);
        gl.uniformMatrix4fv(Mmatrix, false, modmatrix);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        window.requestAnimationFrame(render);
    }
    render(0);
}