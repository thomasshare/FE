const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
// 아래 모델 뎅터 가져오기전에 먼저 몽고디비 연결할수 있는 config 키값을 먼저 설정해줘야 오류 안나는듯
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올수 있도록 해주는것
app.use(bodyParser.urlencoded({ extended: true }));
// application json 타입으로 된 것을 분석해서 가져 올수 있도록 해준다.
app.use(bodyParser.json());
app.use(cookieParser());

const monggoose = require('mongoose')
monggoose.connect( config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
// }).then( function() { return console.log('MongoDB connected..')})
}).then( () => console.log('MongoDB connected..!!'))
  . catch( err => console.log(err))


        
app.get('/', (req, res) => res.send('Hello World! thomas nodemon!!, 성공하자~!!'))

app.post('/api/users/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.json

    const user = new User(req.body); // body-parser를 사용하기 때문에 json 형태로도 사용가능

    // 우선 포스트맨으로 임시로 계정 만든것들
    // {
    //     "name": "thomas",
    //     "email": "aquinas5@naver.com",
    //     "password": "qwerasdf"
    // }

    user.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        return res.status(200).json({ 
            success: true
        });
    }); // end of user.save

})


app.post('/api/users/login', (req,res) => {

    // 요청된 이메일을 데이터베이스에서 찾는다.
    console.log('누가 로그인 했는지 확인')
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log('user 정보는? : ', user);
        if (!user) {
            console.log('user 정보가 false인 상태');
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }

        console.log('user 정보가 true인 상태');

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            console.log('isMatch 정보는? : ', isMatch);
            if(!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'})

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에, 쿠키, 로컬스토리지, 또는 세션
                res.cookie('x_auth', user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})  // end oof /login

// role 1 어드민, role 2 특정 부서 어드민
// 또는 role 0 일반유저, role 0이 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해 왔다는 것은 Authentication이 true 라는 말임
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    })

})  // end of auth


app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        {token: ''}
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
        )
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))