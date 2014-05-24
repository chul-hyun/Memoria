# 메모리아
* 개인 사이트

### 사이트 목적
* github를 통한 소스공유
* 개인블로그
   * 컴퓨터과학
   * 악기 연주
   * etc...
* 프로그램 및 어플 배포

### 디자인 목표
* 황금비율(1:1.618) 이용
* Flat 디자인
* 독창적
* 심플
* 아이콘을 주로 사용
* 사용하기 편한 구조

### 특징(주안점)
* 회원제도는 네이버, 페이스북등의 오픈 API로그인 서비스 사용.

### 사용하려는 기술
* Server side
  * Nodejs(서버사이드 자바스크립트 기술) [공식 사이트](http://www.nodejs.org)
    * connect 
      * express는 너무 추상적이며 크고 그냥 nodejs는 복잡하다. 가장 기본에 충실한 connect 모듈 사용.
      * grunt, yeoman을 이용할까 고민했지만, 그것들은 너무 도구적이고 추상적이라서 이후 서버 업데이트, 이해, 커스텀에 불편할것 같다. 차라리 connect모듈과 connect전용 liveload, compress를 쓰고 이후 이런 모듈들도 다 자체적으로 개발해보자.

  
* Client side
  * HTML5
  * Javascript
    * jQuery [공식 사이트](http://jquery.com)
      * 브라우저 호환성 문제 해결
      * 개발 속도 증가(쉬운 함수사용법)
    * requireJS(javascript 모듈화) [공식 사이트](http://requirejs.org)
      * 클라이언트측 모듈 로딩 module
    * puzzleJS [공식 사이트](http://qkrcjfgus33.github.io/Puzzle.js/)
      * 변수 관계형 프로그래밍 기법.
      * directive, page, page-part 등 view 부분을 js로 감싸주어 모듈화 시켜주는 역할.
      * 특정 기능 모듈제작시 변수 관계형 모듈로 만들어주는 역할.
    * Micro-Templating [공식사이트](http://ejohn.org/blog/javascript-micro-templating/)
      * puzzleJS와 같이 이용되어 view모듈을 만들어주는 역할.
  * CSS3
    * LESS(동적 css 및 mixin등의 문법 제공) [공식 사이트](http://lesscss.org)
      * directive, page, page-part 별로 즉 view 마다 설정한다.
      * 스타일을 설정한 파일과 거기서 사용하는 변수들을 따로 2개의 파일로 분리시켜서 나중에 스타일 변경시 변수들을 모아놓은 파일을 a,b,c와 같이 스타일별로 두어서 무엇을 include시키느냐에 따라 스타일이 달라지게 한다.
      * page나 page-part에선 scope를 이용하여 같은 directive라도 include를 여러 scope에 작성하여 스타일이 설정되게 한다.
      * 동적로딩(require)을 이용하여 스타일이 달라지게 한다. require를 이용하여 설정파일과 변수정의파일 두개를 불러온다.
    * Bootstrap(반응형 디자인에 도움주는 라이브러리. grid system등을 지원한다.) [공식 사이트](http://getbootstrap.com)
      * LESS와 같이 사용하여 CSS기능만을 이용한다. JS측 기술은 이용하지 않는다. (직접 제작해야 컨트롤이 가능)
   
* DetaBase side
  * MongoDB(NoSQL DB (JSON으로 저장되는 DB)) [공식 사이트](http://www.mongodb.org)

* Version Management tool
  * GIT (github) [github 공식사이트](http://github.com)

* Libaray Management tool
  * bower [공식사이트](http://bower.io/)

* TDD Tool
  * Qunit

* Code Rule Management tool
  * jshint

* IDE
  * Visual Stdio


### 디덱토리 구조



***

## 계획

### 목표
* 완료된부분은 다시 되돌아보지 않는다.
* 완료전 되돌아보는 기간을 갖는다. (보완기간을 갖는다.)
* 보완기간은 1차 결정후 텀을 주고 갖는다.
* 기간은 넉넉히 잡고 기간은 엄수한다.(미리하거나 미뤄지면 안된다. 완벽히 엄수)
* 세부적으로 계획한다. 한 단계당 3일을 넘기지 않는다.
* 일관적이고 재사용적으로 구조를 짠다.

### 프로그래밍 목표
* 재사용성을 높인다.
* 일관적으로 작성한다.
* 재사용하지 않을 컨버터 파일 및 함수를 제작, 이용한다.
* 재사용파일 - 컨버터파일 - 재사용파일
* 구상하는 기간을 길게잡고 실제 만드는 기간은 짧게 잡는다. (이래야 완성가능성 및 완성도가 높고, 기간단축이 된다.)

***
 
# 기간
5/19 - 7/8

## 기본틀 결정 기간
5/19 - 6/20
* 사용할 라이브러리. 모듈 및 서버와 DB등을 결정
* 풀더 디덱토리 구조 결정
* 기본적인 프로그래밍 관계 구조 결정
* 기본 풀더, 기본사용 라이브러리 파일 등 생성.

### 구조 결정 기간
* 5/19 - 5/20 : Frount End Side 구조 결정 및 테스트(5/22), 기본 풀더 및 라이브러리 파일 생성.
* 5/20 : VHDL 과제
* 5/21 - 5/23 : 필요한 기틀 모듈 작성. 모든 기능 및 구조를 사용하는 테스트 파일 작성.

* - 5/27 VHDL, 컴구 쪽지 시험, DB과제
* - 6/20 : 기말고사 완벽히 준비.

# 아래로는 계획 변경

### 사이트 세부 디자인 및 기능 결정 기간
* 5/28 - 5/30 : 사이트 디자인, 기능등 사이트맵 세부 결정.
* 6/21 - 6/22 : 기본틀 전체적인 보완기간

## 파일 관계도 결정 기간
6/23 - 7/6

### 기능 분할 결정 기간
* 6/23 : directive, page, page-part, 그리고 서버쪽도 기능적으로 분할 및 파일 연결 구조 결정.

### 제작파일 결정기간
* 6/24 : 기능별, 페이지별등으로 제작 파일 및 관계 결정.

### DB구조 결정 기간
* 6/25

## 제작 전 마지막 보완기간
* 6/26 - 6/28 : 지금까지 결정된 사항들 모두 검토 및 보완.

## 제작기간
* 6/29 - 7/1 : 클라이언트 파일 제작.
* 7/1 - 7/3 : DB 프로그래밍.
* 7/4 - 7/6 : 서버 파일 제작.

## 마무리 기간
* 7/8 : 인터넷으로 홈페이지 연결 및 도메인 연결.
* 7/8 - : 알고리즘, 주석 , 기능 등 업데이트
