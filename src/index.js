import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config();

connectDB()
  .then(()=>{
    app.listen(process.env.PORT || 8001, ()=>{
        console.log(`⚙️ SERVER IS STARTED AT PORT :--  ${process.env.PORT || 8001}`);
        
    })
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED !!!!!!", err);
  });
