(function () {
    const products = document.querySelector('.products');

const totalItem = 300;
const onePage = 12;
const pageSize = 10;
let result = [];

function randomRange(min, max) { //색깔 차트표에서 랜덤으로 숫자 뽑기
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.trunc(Math.random() * (max - min)) + min;
  }
  
function randomRGB(rRange = [0, 256], gRange = [0, 256], bRange = [0, 256]) {  //랜덤 색깔 추출
    const r = randomRange(...rRange); // randomRange(0, 256);
    const g = randomRange(...gRange);
    const b = randomRange(...bRange);

    return `rgb(${r}, ${g}, ${b})`;
}
  
for (let i = 0; i < totalItem; i++) {
    const temp = `<div class="product">
                    <div class="img_item">
                            <img src="https://via.placeholder.com/320x380/FBEFDB.png" class="pimg">
                            <img src="https://via.placeholder.com/70X23/FAEB65.png" class="sale">
                            <div class="overlay">
                                <img src="img/heart.png">
                                <img src="img/shopping-bag.png" class="bag">
                                <img src="img/search.png">
                            </div>
                        </div>
                        
                        <h4>아미렌${i} 핀턱 4부 데님 팬츠</h4>
                        <div class="value">13000</div>
                        <div class="size">26/28/30/32/34/36</div>
                        <div class="discription">부담 없이 입기 좋은 A라인n 데님</div>
                        <div class="colors"></div>
                </div>`;
    result[i] = temp;
}

let colorsEl = document.querySelectorAll('.colors');

function inputColor(){
    for (let i = 0; i < colorsEl.length; i++) {
        const colors = colorsEl[i];
        const pieceCount = randomRange(1, 8);
      
        for (let j = 0; j < pieceCount; j++) {
          const rgbColorText = randomRGB();
      
          const span = document.createElement('span');
          span.style.backgroundColor = rgbColorText;
      
          colors.appendChild(span);
        }
      
      }
}

//console.log(result);

//paging처리

const page = document.querySelector('.page');
let totalPage = Math.ceil(totalItem / onePage);  //총 페이지의 개수
console.log('전체 페이지 개수',totalPage);


function buttonTemplate(x) {
    return `<button class="pagenum" type="button">${x}</button>`
}

function makePageNum(currentPage = 1) { //페이지 목록을 만들어줌
    let firstPage = (currentPage % pageSize === 0) ? currentPage - pageSize + 1 : (Math.floor(currentPage / pageSize)) * pageSize + 1;
    let lastPage = firstPage + pageSize - 1;

    if(lastPage > totalPage) {
        lastPage = totalPage - 1;
    }

    const tempButton = [];//페이지 목록을 담아줄 배열
    if(firstPage > pageSize) {  //즉 이전이 필요하면 항상 pageSize보다 크므로 이전을 넣어줌
        tempButton.push(buttonTemplate('이전'));
    }

    for(let i = firstPage; i <= lastPage; i++){
        tempButton.push(buttonTemplate(i));
    }

    if(lastPage < totalPage - 1) {  //보여지는 페이지의 목록의 마지막이 전체 페이지보다 적으면 다음이 필요
        tempButton.push(buttonTemplate('다음'));
    }
    page.innerHTML = tempButton.join('');
}

makePageNum();

function makePage(frist,last){  //누른 페이지를 만들어줌
    products.textContent = '';
    let temp = '';
    for(let i = frist ; i < last; i++){
        if(result[i] !== undefined){
            temp += result[i];
        }
    }

    products.innerHTML = temp;
    colorsEl = document.querySelectorAll('.colors');
    //console.log(colorsEl);
    inputColor();
}

makePage(0,onePage);

page.addEventListener('click', function (event) {
    let target = event.target;  //내가 누른 페이지
    
    if(target.textContent === '이전'){
        textContent = Number(target.nextSibling.textContent) - pageSize;  //11이면
    }
    else if(target.textContent === '다음'){
        textContent = Number(target.previousSibling.textContent) + 1;  //10이면
    }else {
        textContent = Number(target.textContent);
    }
    makePageNum(textContent);

    let first = textContent * onePage;
    let last = (textContent + 1) * onePage; 
    makePage(first, last);  //페이지를 만들어줌

});

//carousel slide

function firstNodes(img){  //맨 뒤에 처음 4개의 이미지 삽입
    console.log(img);
    for(let i = 0 ; i < 4; i++){
        box.append(img[i].cloneNode(true));
    }
}

function lastNodes(img) {  //맨 처음에 마지막 4개의 이미지를 삽입
    for(let i = img.length - 1 ; i > img.length - 5 ; i--){
        let firstNode = box.firstElementChild;
        //console.log(firstNode);
        box.insertBefore(img[i].cloneNode(true),firstNode)
    }
}

function appendBox(box) {  //이미지를 삽입해서 최종 carousel box를 만들어줌
    const allimg = box.querySelectorAll('img');
    firstNodes(allimg);
    lastNodes(allimg);
}

const box = document.querySelector('.box');
//let imgs = document.querySelectorAll('img');
appendBox(box);
console.log('박스 노드 확인',box);

const left = document.querySelector('.prev');
const right = document.querySelector('.next');

const len = box.querySelectorAll('img').length;
//console.log('길이',len);
let oneSize = 330;
let startpoint = oneSize * 4;
box.style.transform = `translate(-${startpoint}px,0px)`; //맨처음 이미지로 이동하기 위해서

const min = 0;
const max = oneSize * (len - 4);
console.log('길이',len);

setInterval(() => {
    box.style.transition = '1s';  //1초에 이동하는 것처럼 이미지가 보여짐
    if(sum === max){
        return;
    }
    sum += oneSize;
    box.style.transform = `translate(-${sum}px,0)`;

    if(sum === max){
        setTimeout(function(){
            box.style.transition = 'none'; //이미지가 옮겨지는 것처럼 보이면 안됨
            sum = startpoint; //첫번째 이미지로 옮겨갈 수 있도록 첫번쨰 이미지의 위치를 넣어줌
            box.style.transform = `translate(-${sum}px,0px)`;
        },1000);
    }
}, 3000);

let sum = startpoint; //캐러셀의 시작위치
left.addEventListener('click',function(event){
    box.style.transition = '1s';  //1초에 이동하는 것처럼 이미지가 보여짐
    if(sum === max){
        return;
    }
    sum += oneSize;
    box.style.transform = `translate(-${sum}px,0)`;

    if(sum === max){
        setTimeout(function(){
            box.style.transition = 'none'; //이미지가 옮겨지는 것처럼 보이면 안됨
            sum = startpoint; //첫번째 이미지로 옮겨갈 수 있도록 첫번쨰 이미지의 위치를 넣어줌
            box.style.transform = `translate(-${sum}px,0px)`;
        },1000);
    }
    
    console.log(sum);
});

right.addEventListener('click',function(event){
    box.style.transition = '1s';
    if(sum === min) {
        return;
    }

    sum -= oneSize;
    box.style.transform = `translate(-${sum}px,0)`;

    if(sum === min){
        setTimeout(function(){
            box.style.transition = 'none';
            sum = max - startpoint; //마지막 이미지로 옮겨져서 자연스럽게 이동되게함
            box.style.transform = `translate(-${sum}px,0px)`;
        },1000);
    }
    console.log(sum);
});



//cookie 기본 함수 --> document.cookie = '쿠키이름 = 쿠키 값'
function setCookie(name, value, days){  //cookie설정  //함수 이름, 저장할 값, 만료시간 값
    console.log('cookie확인1',document.cookie); //popup = expireday라는 값이 출력

    const exdate = new Date();
    exdate.setDate(exdate.getDate() + days); //설정 일수만큼 현재시간에 만료값으로 지정

    let cookie_value = encodeURIComponent(value) + ((days === null) ? '' : '; expires=' + exdate.toUTCString());
    //encodeURIComponent는 value값을 컴퓨터가 오류가 나지 않게 읽도록 바꿔주는 것을 의미함
    document.cookie = encodeURIComponent(name) + "=" + cookie_value;
    console.log(document.cookie);
}

function getCookie(name) {  //쿠키값을 가져옴
    let x,y;
    let value = document.cookie.split(';');
    //let value = document.cookie.split('; '); // 이렇게 해주면 ;과 공백을 기준으로 잘라주므로
    //x = x.replace(/^\s+|\s+$/g, '');가 필요없음
    for(let i = 0; i < value.length; i++){
        x = value[i].substr(0, value[i].indexOf('='));
        //x는 i번째의 단어의 0~value[i].indexOf('=');까지
        y = value[i].substr(value[i].indexOf('=') + 1);
        //y는 value[i].indexOf('=') + 1부터 끝까지
        x = x.replace(/^\s+|\s+$/g, ''); //앞과 뒤에 공백제거
    
        if(x === name) {
            return decodeURIComponent(y);
        }
    }
}


const modal = document.querySelector('.modal');
console.log('modal 속성확인',modal);

modal.addEventListener('click',function(event){
    console.log('event.path[2]',event.path[2]);
    let popup_name = event.path[2].classList[1];
    console.log('popup_name',popup_name);
    if(event.target.checked === true){
        event.path[2].style.visibility = 'hidden';
        const exdate = new Date();
        exdate.setDate(exdate.getDate() + 1); //설정 일수만큼 현재시간에 만료값으로 지정
        setCookie(popup_name, 'popup', 1);  //하루 뒤에 만료되는 popup 이름으로 expireday라는 값을 저장
        if(getCookie('boxs') === undefined) {
            setCookie('boxs',popup_name);
        }else {
            setCookie('boxs',getCookie('boxs') + ';' + popup_name);
        }
    }
});

 


console.log('boxs',getCookie('boxs'));
function checkCookies(){
    let cookies = getCookie('boxs');
    /*cookie = cookies && cookies.split(;) //이렇게 되면 cookies가 undefined이면 false이기 
    때문에 cookies.split(;)이 실행되지 않을 것
    하지만 cookies에 값이 있다면 cookies.split이 실행될 것
    if(cookies === undefined) return ;*/
    if(cookies === undefined){
        return;
    }else{
        cookies = cookies.split(';');
        //split(';')은 잘못하면 오류가 날 수 있음 왜냐하면 쿠키는 ;공백으로 구분하기 때문
    }
    for(let i = 0; i < cookies.length; i++){
        if(getCookie(`box${i+1}`)){
            document.querySelector(`.box${i+1}`).style.visibility = 'hidden';
        }
    }
}

checkCookies();

//로컬스토리지에 아이템을 저장하고 페이지를 만들때 로컬스토리지에서
//페이지에 해당하는 아이템들만 가져옴
})()
