const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// salt 생성할 자리 수
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: { 
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 몽고디비의 save 메소드 전에 실행 되는 메소드
userSchema.pre('save', function( next ) {
    // 아래의 this는 const userSchema를 가르킴, 그러면 그냥 this. 으로 사용해도 되려나??, this.password?
    var user = this;

    // usherShema에서 비밀번호를 저장할때만(바꿀때도?) 암호화 (모델의 password 부분이 변경 될때만 동작하도록 설정)
    if (user.isModified('password')) {
    // 비밀번호를 암호화 시킨다 (10자리로 salt 생성)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            // bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // 여기서 salt는 생성된 salt를 의미 함, 생성된 salt를 이용하여 .hash 하여 암호화된 비밀번호를 생성하는 것임
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                // Store hash in your password DB.
                user.password = hash;   // 사용자 패스워드를 salt를 붙여서 암호화한 hash로 대체해 줌
                next();
            });
        });
    } else {
        // 비밀번호를 저장할때가 아니라 다른것을 저장할때는 next()를 해줘야 함, 정말 아래꺼 넣어주지 않으면 어떨때 문제가 발생하는지 확인해 봐야 될듯
        next();
    }

}); // end of pre

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword와 왐호화된 비밀번호를 비교, 예> 1234567, 암호화된 비밀번호 $2b$10$IMzGyYkw/a2yH1KVMb8oceDht0Xk2knSRhDIqrmlMEXvDsi1FIBEW
    console.log('comparePassword 내부의 plainPassword 정보는? : ', plainPassword);
    console.log('comparePassword 내부의 this.password 정보는? : ', this.password);
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        console.log('comparePassword 내부의 isMatch 정보는? : ', isMatch);
        if(err) return cb(err); // cb(err)만 하면 cb 함수의 첫번째 err 인자만 넘어가는 것이기 때문에 error가 됨
        console.log('User 모델의 comparePassword 내의 isMatch 값은? : ', isMatch);
        cb(null, isMatch); // cb(null, isMatch)를 하게 되면 err 부분은 null로 하고 isMatch가 true 이기 때문에 가능?
    })
}   // end of comparePassword


userSchema.methods.generateToken = function(cb) {
    
    var user = this;    // ES5 문법을 사용하기 때문에 user 에 this를 넣어줘야 함

    console.log('userid 정보 : ', user._id);

    // jsonwebtoken을 이용해서 token 생성하기, sign의 첫번째 파라미터는 plain object 여야 하기 때문에 toHexString으로 함, 'secretToken'은 토큰 생성 시 임의로 넣어주는 값
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id + 'secretToken'
    
    user.token = token;

    // user.save 하는 이유는 로그인 하면서 토큰을 생성 했기 때문에 그 내용을 다시 저장하기 위하여
    user.save( function (err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}   // end of generate token

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 토큰을 decode 한다. token은 auth.js에서 넘겨준 쿠키의 토큰값(token)
    jwt.verify(token, 'secretToken', function (err, decoded) {

        // 쿠키로 넘겨준 token + secretToken을 이용해서 id를 생성하여 아래의 findOne으로 맞는 id인지 확인
        // user id를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토근이 일치하는지 확인
        console.log('User 스키마의 findByToken에서 decoded : ', decoded);
        console.log('User 스키마의 findByToken에서 token : ', token)

        user.findOne( { '_id': decoded, 'token': token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })


    });


}




// user 스키마를 모델로 감싸는 것
const User = mongoose.model('User', userSchema);

module.exports = { User };

