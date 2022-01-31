(function () {
    const productList = document.querySelector('.productList');

    let totalItem = 100;  //전체 품목의 개수
    const onePage = 15;  //한 페이지 당 보여줄 품목의 개수
    const pageSize = 10; //한 번에 보이는 페이지 목록의 개수
    let result = []; //아이템 리스트(즉 품목 리스트)
    
    const page = document.querySelector('.page');
    let totalPage = Math.ceil(totalItem / onePage);
    let currentPage = 1;  //현재 페이지를 저장하기 위해서

    function setLastKey() {
        const key = getLastKey() + 1;
        localStorage.setItem('lastKey',key);
    }

    function getLastKey(){
        let key = localStorage.getItem('lastKey'); //저장되어 있는 lastKey가 있다면 HTML을 처음에 생성할 때 가져옴
        if(key === null){
            key = 1;
        }

        return Number(key);
    }
    
    function setStorage(result) {
        localStorage.setItem('items',JSON.stringify(result));
    }

    function getStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function makeList() {  //아이템 목록 만들어주기
        const list = getStorage('items');
        if(list !== null && list.length !== 0) {
            result = list;
            return;
        }

        for(let i = 0; i < totalItem; i++){
            result.push({
                key: getLastKey(),//현재 저장된 마지막 키를 가져옴
                name: `아미렌 ${i} 핀턱 4부 데님 팬츠`,
                size: 32,
                type: '바지',
                price: 13000
            });
            setLastKey();  //현재 저장된 마지막 키를 가져옴
        }
        setStorage(result);
    }
    makeList();
    
    function paintPage(first) {  //페이지 그려주기                                                 
        let temp = '';
        for(let i = first; i < first + onePage; i++){
            if(result[i] !== undefined){
                const data = result[i];
                temp += `<div class="product product-${data.key}" data-key="${data.key}">
                            <div class="content">${data.name}${data.size}${data.type}${data.price}</div>
                            <div class="content-btns">
                                <button class="modify">수정</button>
                                <button class="delete">삭제</button>
                            </div>
                        </div>`
            }
        }

        productList.innerHTML = temp;
    }

    paintPage(0);
    

    function buttonTemplate(x) {
        return `<button class="pagenum" type="button">${x}</button>`
    }

    function currentButtonTemplate(x) {
        return `<button class="pagenum current" type="button">${x}</button>`
    }
    
    function makePageNum(currentPage = 1) { //페이지 목록을 만들어줌
        let firstPage = (currentPage % pageSize === 0) ? currentPage - pageSize + 1 : (Math.floor(currentPage / pageSize)) * pageSize + 1;
        let lastPage = firstPage + pageSize - 1;
        totalItem = result.length;
        totalPage = Math.ceil(totalItem / onePage);
        console.log('currentpage',currentPage)

        if(lastPage > totalPage) {
            lastPage = totalPage;
        }
    
        let tempButton = [];//페이지 목록을 담아줄 배열
        if(firstPage > pageSize) {  //즉 이전이 필요하면 항상 pageSize보다 크므로 이전을 넣어줌
            tempButton.push(buttonTemplate('이전'));
        }
    
        for(let i = firstPage; i <= lastPage; i++){
            if(i === currentPage){
                tempButton.push(currentButtonTemplate(i));
            }else {
                tempButton.push(buttonTemplate(i));
            }
        }
    
        if(lastPage < totalPage - 1) {  //보여지는 페이지의 목록의 마지막이 전체 페이지보다 적으면 다음이 필요
            tempButton.push(buttonTemplate('다음'));
        }
        page.innerHTML = tempButton.join('');        
        console.log('page',page);

    }
    
    makePageNum();
    
    page.addEventListener('click', function (event) {
        console.log(page);
        let target = event.target;  //내가 누른 페이지
        let textContent;
        if(target.className === 'page'){  //만약에 페이지 잘못 넣었을 때
            return;
        }

        if(Number(target.textContent) === currentPage){  //만약에 누른 페이지가 현재 페이지라면 굳이 페이지를 이동하거나 다시 만들어줄 필요가 없음
            return;
        }
    
        if(target.textContent === '이전'){
            textContent = Number(target.nextSibling.textContent) - 1;  //11이면
        }
        else if(target.textContent === '다음'){
            textContent = Number(target.previousSibling.textContent) + 1;  //10이면
        }else {
            textContent = Number(target.textContent);
        }

        currentPage = textContent;
        makePageNum(textContent);
    
        let first = (textContent - 1) * onePage;
        //let last = textContent * onePage; 
        paintPage(first);  //페이지를 만들어줌
    
    });
    
    //추가,삭제,수정버튼
    
    

    let item = null;
    let modifyIndex = null;

    //추가 버튼 누르면 아이템 추가하는 모달창 뜨고 목록의 가장 끝에 모달창 뜨게 함
    const add = document.querySelector('.add');

    add.addEventListener('click',function(){
        const modalModify = document.querySelector('.modal_modify');
        modalModify.style.visibility = 'visible';
        
        modifyIndex = getLastKey();
        totalItem++;
    });

    //수정 버튼 누르면 해당 목록 수정 할 수 있도록 창이 뜸
    function modifyProduct(key){
        //result에 변경사항이 이미 저장되어 있으므로 getLocalstorage를 할 필요가 없음
        for(let i = 0; i < result.length; i++) {
            if(result[i].key === key) {
                item = result[i];
                modifyIndex = i;
            }
        }
    
        const modalModify = document.querySelector('.modal_modify');
        let nameElem = modalModify.querySelector('#name');
        let sizeElem = modalModify.querySelector('#size');
        let typeElem = modalModify.querySelector('#type');
        let priceElem = modalModify.querySelector('#price');
        console.log('modify에서 item을 넣기 전',nameElem.value,sizeElem.value,typeElem.value);

        modalModify.style.visibility = 'visible';

        nameElem.value = item.name;
        sizeElem.value = item.size;
        typeElem.value = item.type; 
        priceElem.value = item.price;
        console.log('modify에서 item을 넣은 후',nameElem.value,sizeElem.value,typeElem.value,);      
    }

    const storeButton = document.querySelector('.modal_store');
    storeButton.addEventListener('click',function(){
        //즉 저장을 누를때 이미 modify함수에서 nameElem과 sizeElem, typeElem에 내용이 세팅이 된 상태이기 때문에 
        //여기서 nameElem,sizeElem,typeElem을 가져오면 이미 세팅이 되어있는 상태일것
        //여기서 nameElem를 새로 선언을 해주는 것이어도 modalModify.querySelector('#name')에 담긴 값을 가져오는 것이기 때문에 문제가 되지 않음
        const modalModify = document.querySelector('.modal_modify');
        let nameElem = modalModify.querySelector('#name');
        let sizeElem = modalModify.querySelector('#size');
        let typeElem = modalModify.querySelector('#type');
        let priceElem = modalModify.querySelector('#price');
        console.log('store할 때',nameElem.value,sizeElem.value,typeElem.value);
        result[modifyIndex] = {key: modifyIndex, name: nameElem.value, size: Number(sizeElem.value), type: typeElem.value, price: priceElem.value};

        setStorage(result);

        modalModify.style.visibility = 'hidden';
        nameElem.value = '';
        sizeElem.value = '';
        typeElem.value = '';
        priceElem.value = '';
        
        paintPage((currentPage - 1) * onePage);
        makePageNum(currentPage);
    });

    

    //삭제 버튼 누르면 해당 목록을 localstorage에서 삭제 후 페이지를 다시 만들어줘야 함
    function deleteProduct(key){
        //result에 변경사항이 이미 저장되어 있으므로 getLocalstorage를 할 필요가 없고 result를 통해서 제어가 가능함
        for(let i = 0; i < result.length; i++){
            if(result[i].key === key){
                result.splice(i,1); 
            }
        }

        totalItem--;
        setStorage(result);

        paintPage((currentPage - 1) * onePage);
        makePageNum(currentPage); //데이터가 지워지므로 페이지 목록 리스트도 다시만들어줘야 함
    }

    //modify랑 delete를 눌렀을 때(이벤트 계승)
    const container = document.querySelector('.products');
    container.addEventListener('click',function(event){
        let target = event.target;

        if(target.nodeName !== 'BUTTON') {
            return;
        }

        const key = Number(target.parentNode.parentNode.dataset.key);  //삭제할 번호

        if (target.classList.contains('delete')) {
            deleteProduct(key);
        } else if (target.classList.contains('modify')) {
            modifyProduct(key);
        }
    });
})()
