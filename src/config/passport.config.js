const passport = require("passport");
const local = require("passport-local");
const UserModel = require("../models/user.model");
const { createHash, isValidPass } = require("../utils/bcrypt.utils");
const GitHubStrategy = require("passport-github2");
const jwt=require("passport-jwt");
const JWTStrategy=jwt.Strategy
const ExtractJwt=jwt.ExtractJwt
const {jwt_secret_key}=require("./config.js");
const LocalStrategy = local.Strategy;



const initializePassport = () => {
  /*passport.use(
    "sign-up",
    new LocaStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body; 
        try {
          let user = await UserModel.findOne({ email });
          if (user) {
            return done(null, false);
          }
          let newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          let result = await UserModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );*/
  /*passport.use(
    "login",
    new LocaStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(null, false);
          }
          if (!isValidPass(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );*/
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById({ _id: id });
    done(null, user);
  });

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.86012eb3d0dce0a7",
        clientSecret: "f9f912606397e99826cbda44c526d579a5f0e993",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          
          let user = await UserModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: "",
              email: profile._json.email,
              password: "",
            };
            let result = await UserModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use('sign-up', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true 
  }, async (req, email, password, done) => {
    try {
      
      const {first_name, last_name,age}=req.body
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return done(null, false, { message: 'El usuario ya existe' });
      }
       const newUser = await UserModel.create({
        email,
        password: createHash(password), 
        first_name,
        last_name,
        age
      });
      
  
      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use("jwt",new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:jwt_secret_key
  },async (jwt_payload,done)=>{
    try {
      return done(null,jwt_payload);
    } catch (error) {
      return done(error)
    }
  }
  ))
};

const cookieExtractor  =(req)=>{
let token=null
if(req && req.cookies){
  token=req.cookies["coderCookie"]
}
return token
}

const passportCall =(strategy)=>{
return async(req, res, next)=>{
  passport.authenticate(strategy,(error,user,info)=>{
    if(error){return next(error)}
    if(!user){res.status(401).send({error: info.message ? info.message : info.toString()})}
    req.user=user
    next()
  })(req,res,next)
}

}

module.exports = {initializePassport,passportCall}
