const expiresIn = '6000s';

export const jwtConstants = {
  authSecret: process.env.JWT_SECRET_KEY,
  fileSecret: process.env.FILE_SECRET_KEY,
  authExpiresIn: expiresIn,
  fileExpiresIn: expiresIn,
};
