function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
       0.1, 0.2, 0.0, 1.0, 0.0,
       0.2, 0.1, 0.0, 1.0, 0.0,
       0.3, 0.3, 0.0, 1.0, 0.0,

       0.2, 0.1, 1.0, 1.0, 0.0,
       0.4, 0.1, 1.0, 1.0, 0.0,
       0.3, 0.3, 1.0, 1.0, 0.0,

       0.4, 0.1, 0.0, 1.0, 1.0,
       0.5, 0.2, 0.0, 1.0, 1.0,
       0.3, 0.3, 0.0, 1.0, 1.0,

       0.5, 0.2, 1.0, 0.0, 0.0,
       0.5, 0.4, 1.0, 0.0, 0.0,
       0.3, 0.3, 1.0, 0.0, 0.0,

       0.5, 0.4, 1.0, 0.0, 1.0,
       0.4, 0.5, 1.0, 0.0, 1.0,
       0.3, 0.3, 1.0, 0.0, 1.0,

       0.4, 0.5, 0.0, 0.0, 0.0,
       0.2, 0.5, 0.0, 0.0, 0.0,
       0.3, 0.3, 0.0, 0.0, 0.0,

       0.2, 0.5, 1.0, 1.0, 1.0,
       0.1, 0.4, 1.0, 1.0, 1.0,
       0.3, 0.3, 1.0, 1.0, 1.0,
    
       0.1, 0.4, 0.0, 0.0, 1.0,
       0.1, 0.2, 0.0, 0.0, 1.0,
       0.3, 0.3, 0.0, 0.0, 1.0
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW );

    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);   
    gl.attachShader(program, fragmentShader);   
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 24);
}