import  passport  from "passport";
export const isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
  };
export const sanatizeUser=(user)=>{
    return { id: user.id, role: user.role };
}
export const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGMzZWZlMWRmYTUyZTFmZTQ5ZDI4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MjM0NTUxMH0.X0p5JnNcAOu676f3r4ZSHu3nQxDyIkqoOWtyf20CRTE"
  return token;
};