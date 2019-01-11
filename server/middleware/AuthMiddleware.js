
class AuthMiddleware {

    constructor() {    
        this.getUser = this.getUser.bind(this);
        this.logout = this.logout.bind(this);
    }
    /**
     * 
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */

    getUser(req, res, next){
        if(req.user){
            req.user
            .then((loggedInUser) => {
            res.status(200).json(loggedInUser);
            })
        } else {
            res.status(404).json({message:'not found'})
        }
        
    }
    logout(req, res, next){
        req.logout();
        res.send('logged out');
       
    }
}

export default AuthMiddleware;
