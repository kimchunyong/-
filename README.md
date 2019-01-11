# node.js(express) + DB 를 이용한 미니 프로젝트

## 공부 할것들

- node.js 와 mongoDB사용방법
- 라우팅과 미들웨어
- 서버사이드 렌더링에대한 이해와 Rest API의 이해.
- GET,POST 의 이해와 CURD에 대한 이해.

## 공부자료
- [node.js](https://youtu.be/oF1Axvojy2A)
- [node.js width mongoDB](https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb)
- [node.js 기본구조 구축](http://html5around.com/wordpress/tutorials/node-js-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0/)
- [node.js API 서버 만들기](http://webframeworks.kr/tutorials/nodejs/api-server-by-nodejs-03/)

- mysql 공부중. sql문법 숙지 CRUD

## 기능 명세

### 로그인
- 회원정보 입력받고 가입
- id,pw,로그인

### 게시판 리스트
- 리스트가 최신순으로 위에서부터 아래로 출력
- 리스트에는 몇 번째 게시물인지, 제목, 조회수, 날짜, 작성자
- 게시글은 10개 넘어가면 1,2,3 식으로 페이지 번호가 생겨야함(CURD가 가능해야함)
- 글쓰기 버튼

### 글쓰기 페이지
- 제목
- 내용
- 비밀번호(글 삭제시 사용)

### 댓글
- 댓글 달린 갯수 표시
- 댓글 내용
- 댓글 작성자,날짜
