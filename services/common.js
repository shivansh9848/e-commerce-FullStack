export const isAuth = (req, res, done) => {
    if (req.isAuthenticated()) // OR (req.user)
     done();
    else res.sendStatus(401);
  };
export const sanatizeUser=(user)=>{
    return { id: user.id, role: user.role };
}