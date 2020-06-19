module.exports = {
    // 헤로쿠 같은 곳에 배포할 경우 셋팅에 키값으로 MONGO_URI를 넣고 값을로 비밀번호를 넣어야 함 (mongodb+srv://thomas:obsmongodb@boilerplate-0bbyy.mongodb.net/boilerplate?retryWrites=true&w=majority)
    mongoURI: process.env.MONGO_URI
}