const { User } = require('../models/User');

let auth = (req,res, next) => {
// 인증처리를 하는곳


    //  클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    //  토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error });

        // req에 token과 user를 넣어주는 이유는 호출하는곳 즉 index.js에서 간편하게 req.token으로 정보를 불러오기 편하도록 하기 위해서 임
        req.token = token;
        req.user = user;
        next();

    })

    //  유저가 있으면 인증 Okey

    // 유저가 없으면 인증 No





}


module.exports = { auth };