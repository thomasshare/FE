// 몽고 디비 접속 오류 관련 : ongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/.
// https://www.google.com/search?client=firefox-b-d&q=Make+sure+your+current+IP+address+is+on+your+Atlas+cluster%27s+IP+whitelist%3A+https%3A%2F%2Fdocs.atlas.mongodb.com%2Fsecurity-whitelist%2F.#kpvalbx=_Y8rhXoT7GpyCr7wPvaC3uAc68
// 몽고디비 security > Network Access > Add Ip Address > 0.0.0.0/0 해도 안되면 그냥 my current ip address 버튼 클릭해서 현재 ip가 자동 셋팅 되도록 설정
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prd');
} else {
    module.exports = require('./dev');
}