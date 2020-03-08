import { ApolloServer } from 'apollo-server';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

// ApolloServer는 스키마와 리졸버가 반드시 필요함
const server = new ApolloServer({
  typeDefs,
  resolvers
});


// localhost:4000에 접속하여 아래와 같이 쿼리를 날려 조회 및 추가 할 수 있음
// query {
//     movies {
//       name,
//       rating
//     }
//   }# Write your query or mutation here
  
  
//   # mutation {
//   #   addMovie(name:"인셉션", rating: 8) {
//   #     name
//   #   }
//   # }




// listen 함수로 웹 서버 실행
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});