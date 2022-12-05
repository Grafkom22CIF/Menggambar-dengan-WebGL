function bindBuffer(gl, type, bufferData, bufferName){
    if(type=='array'){
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferName);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
    } else if(type=='element'){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferName);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bufferData), gl.STATIC_DRAW);
    }
}

function createShader(gl, shaderName, shaderCode){
    gl.shaderSource(shaderName, shaderCode);
    gl.compileShader(shaderName);
}

function infoPackage(gl, program, shaders){
    gl.attachShader(program, shaders[0]);
    gl.attachShader(program, shaders[1]);
    gl.linkProgram(program);
    gl.useProgram(program);
}

function arrayIndexing(gl, varName){
    gl.vertexAttribPointer(varName, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(varName);
}

function onMouseClick(event){
    if(freeze) freeze = false;
    else freeze = true;
}

function onKeyDown(event){
    if(event.keyCode == 32) freeze = true;
}

function onKeyUp(event){
    if(event.keyCode == 32) freeze = false;
}

function prepareCanvas(gl, canvas){
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}