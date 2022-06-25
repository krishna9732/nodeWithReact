const { default: mongoose } = require("mongoose");


mongoose.connect("mongodb://localhost:27017/test?authSource=admin",{ 
    useUnifiedTopology: false 
}).then((res) =>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log("No connection",e);
})