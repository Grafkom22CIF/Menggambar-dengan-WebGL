function translasi(gl, program){
    var dx = 0.2, dy = 0.2, dz = 0.0;
    var translasi = gl.getUniformLocation(program, "utranslasi");
    gl.uniform4f(translasi, dx, dy, dz, 0.0);
}
function rotasi(gl, program){
    var angle = 45 * Math.PI/180;
    var sa = Math.sin(angle); //menghitung sin
    var ca = Math.cos(angle); //menghitung cos

    var matriksRotasi = new Float32Array([
        ca, -sa, 0.0, 0.0,
        sa, ca, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, 0.0, 0.0, 1.0
    ]);
    var uMatriks = gl.getUniformLocation(program, "uMatriks");
    gl.uniformMatrix4fv(uMatriks, false, matriksRotasi);
}
function skalasi(gl, program){
    var sx = -1.5, sy = -1.5, sz = 0.5;
    var matriksSkalasi = new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1
    ]);
    var uMatriks = gl.getUniformLocation(program, "uMatriks");
    gl.uniformMatrix4fv(uMatriks, false, matriksSkalasi);
}
function shear(gl, program){
    var angle = 45;
    var cota = 1/Math.tan(angle * Math.PI/180);
    var matriksShear = new Float32Array([
        1.0, cota, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0 
    ]);
    var uMatriks = gl.getUniformLocation(program, "uMatriks");
    gl.uniformMatrix4fv(uMatriks, false, matriksShear);
}