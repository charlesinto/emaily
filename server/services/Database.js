import mongoose from 'mongoose';

class Database {
    constructor() {
        this.connectToMongoose = this.connectToMongoose.bind(this);
    }
    /**
     * 
     */
    
    async connectToMongoose() {
        try{
            await mongoose.connect(process.env.devMongooseURI,{  
                auth:{user: process.env.devUser, password: process.env.devPassword}, useNewUrlParser: true })
        }catch(e){
            console.log(e)
        }   
    }
}

export default Database;
