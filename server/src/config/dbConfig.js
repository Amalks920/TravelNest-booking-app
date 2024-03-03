const { mongoose }=require('mongoose');

const dbConnect=()=>{
    console.log(process.env.MONGODB_URL_STRING);
    try {
        console.log(process.env.MONGODB_URL_STRING)
        const connection=mongoose.connect("mongodb+srv://amalks999:amalks@cluster0.2ypyv1c.mongodb.net/TravelNest?retryWrites=true&w=majority");
        console.log('connection successfull')
        
    } catch (error) {
            console.log(error)
        console.log(`connection failed ${error}`);
    }
}

module.exports=dbConnect;