const	radToDeg = 180 / Math.PI;
const degToRad = degrees => degrees * Math.PI / 180;

const scaleAndRotate = (ox, oy, oz, ax, ay, az, scale) => {
  let x = ox;
  let y = oy;
  let z = oz;
  let r1 = 0;
  let r2 = 0;
  let a1 = 0;
  let a2 = 0;

  // Rotate XZ
  r1 = Math.sqrt((x ** 2) + (z ** 2));
  a1 = (Math.atan2(x, z) * radToDeg) + ay;
  r2 = Math.sqrt((r1 ** 2) + (y ** 2));
  a2 = Math.atan2(y, r1) * radToDeg;
  x = Math.sin(degToRad(a1)) * r1;
  y = Math.sin(degToRad(a2)) * r2;
  z = Math.cos(degToRad(a1)) * r1;

  // Rotate YZ
  r1 = Math.sqrt((y ** 2) + (z ** 2));
  a1 = (Math.atan2(y, z) * radToDeg) + ax;
  a2 = Math.atan2(x, r1) * radToDeg;
  x = Math.sin(degToRad(a2)) * r2;
  y = Math.sin(degToRad(a1)) * r1;
  z = Math.cos(degToRad(a1)) * r1;

  // Rotate XY
  r1 = Math.sqrt((x ** 2) + (y ** 2));
  a1 = (Math.atan2(y, x) * radToDeg) + az;
  a2 = Math.atan2(z, r1) * radToDeg;
  x = Math.cos(degToRad(a1)) * r1;
  y = Math.sin(degToRad(a1)) * r1;
  z = Math.sin(degToRad(a2)) * r2;

  // Scale
  r1 = Math.sqrt((x ** 2) + (z ** 2));
  a1 = Math.atan2(x, z);
  a2 = Math.atan2(y, r1);
  r2 *= scale;
  r1 = Math.cos(a2) * r2;
  x = Math.sin(a1) * r1;
  y = Math.sin(a2) * r2;
  z = Math.cos(a1) * r1;

  // Return the eventual values
  return {
    x, y, z,
  };
};

export {
  scaleAndRotate,
  degToRad
};
