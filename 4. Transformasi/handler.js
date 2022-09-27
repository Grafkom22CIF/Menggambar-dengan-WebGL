function translasi(gl, program){
    var dx = 0.1, dy = 0.1, dz  =0.1;
    var translasi = gl.getUniformLocation(program, "utranslasi");
    gl.uniform4f(translasi, dx, dy, dz, 0.0);
}
function skalasi(gl, program){
    var sx = -1.0, sy = -1.0, sz = 1.0;
    var skMatriks = new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    var skalasi = gl.getUniformLocation(program, 'skMatriks');
    gl.uniformMatrix4fv(skalasi, false, skMatriks);
}