const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const config = require('./config/key');
// 아래 모델 뎅터 가져오기전에 먼저 몽고디비 연결할수 있는 config 키값을 먼저 설정해줘야 오류 안나는듯
const { User } = require('./models/User');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올수 있도록 해주는것
app.use(bodyParser.urlencoded({ extended: true }));
// application json 타입으로 된 것을 분석해서 가져 올수 있도록 해준다.
app.use(bodyParser.json());

const monggoose = require('mongoose')
monggoose.connect( config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
// }).then( function() { return console.log('MongoDB connected..')})
}).then( () => console.log('MongoDB connected..'))
  . catch( err => console.log(err))


        
app.get('/', (req, res) => res.send('Hello World! thomas nodemon!!, 성공하자~!!'))

app.post('/register', (req, res) => {
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



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))