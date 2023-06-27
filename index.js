const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require('./models/Place.js')
require('dotenv').config()
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jisgiorgjrigogrgrnpwrnngpw';

app.use(express.json());

app.use(cookieParser());
app.use( 
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test is fine");
});

//VLbR089XES04QSbV

app.post("/register", async (req, res) => {
  const{ name, email, password } = req.body;
  try{
    const userDoc = await User.create({
        name,
        email, 
        password:bcrypt.hashSync(password, bcryptSalt),
    
      });
    
      res.json(userDoc);
  }catch(e)
  {
    res.status(422).json(e);
  }
  
});

app.post("/login", async (req, res) => {
    const{email, password } = req.body;
       const userDoc=  await User.findOne({email});
       if(userDoc)
       {
        const passOk = bcrypt.compareSync(password, userDoc.password)
       if (passOk)
       {
        jwt.sign({email : userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) =>
            {
                if (err) 
                {
                    throw err;
                }
                res.cookie('token', token).json(userDoc);
            });
       }
       else{
        res.status(422).json('pass not ok');
       }
    }
       else{
        res.json("not found");
       }            
      
       
       
    }
   
    
);

const photosMiddleware = multer({dest : "uploads/"});

app.post('/upload', photosMiddleware.array('photos', 100),  (req,res) =>
{
  for(let i = 0; i<req.files.length; i++)
  {
    const {path} = req.files[i]
  
  
  }
});


app.post('/places', (req, res) =>
{
  const {title, address, addPhotos, description, perks } = req.body;

  const placeDoc = Place.create(
    {
      title, address, addPhotos, description, perks,
    }
  )
  console.log(placeDoc);
});



app.post('/upload-by-link', async (req, res) =>
{
  const {link} = req.body;
  const newName = Date.now() + '.jpg';
  await imageDownloader.image(
    {
      url: link,
      dest : __dirname + '/uploads' + newName,
    }
);

res.json(__dirname + '/uploads' + newName)
})




app.listen(4000);
