(function(){
    const productList = document.querySelector('.productList');

    let totalItem = 100;  //전체 품목의 개수
    const onePage = 15;  //한 페이지 당 보여줄 품목의 개수
    const pageSize = 10; //한 번에 보이는 페이지 목록의 개수
    const result = []; 

    const page = document.querySelector('.page');
    console.log(page);
    const totalPage = Math.ceil(totalItem / onePage);
    console.log(totalPage);
    let currentPage = 1;

    function makeList() {  //아이템 목록 만들어주기
        for(let i = 0; i < totalItem; i++){
            result[i] = [`${i}`, `<div class="product ${i}">
            <div class="content">아미렌${i} 핀턱 4부 데님 팬츠</div>
            <button class="modify">수정</button>
            <button class="delete">삭제</button>
        </div>`]
        }
        localStorage.setItem('items',JSON.stringify(result));
    }
    makeList();

    function getStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    
    function paintItems(first) {  //페이지에 해당하는 아이템 목록 가져오기
        const list = getStorage('items');
        //배열로 들어올것
        let temp = '';
        
        for(let i = first; i < first + onePage; i++){
            if(list[i] !== undefined){
                //console.log(list[i][1]);
                temp += list[i][1];
            }
        }

        productList.innerHTML = temp;
    }

    paintItems(0);
    
    function buttonTemplate(x) {
        return `<button class="pagenum" type="button">${x}</button>`;
    }
    
    function makePageNum(currentPage = 1) { //페이지 목록을 만들어줌
        let firstPage = (currentPage % pageSize === 0) ? currentPage - pageSize + 1 : (Math.floor(currentPage / pageSize)) * pageSize + 1;
        let lastPage = firstPage + pageSize - 1;
    
        if(lastPage > totalPage) {
            lastPage = totalPage;
        }
    
        let tempButton = [];//페이지 목록을 담아줄 배열
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
    
    page.addEventListener('click', function (event) {
        console.log(page);
        let target = event.target;  //내가 누른 페이지
        console.log('page',target);
        let textContent;
        if(target.className === 'page'){  //만약에 페이지 잘못 넣었을 때
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
        paintItems(first);  //페이지를 만들어줌
    
    });
    
    //추가,삭제,수정버튼

    //추가 버튼 누르면 아이템 추가하는 모달창 뜨고 목록의 가장 끝에 모달창 뜨게 함
    const add = document.querySelector('.add');

    add.addEventListener('click',function(){
        const modal_add = document.querySelector('.modal_add');
        modal_add.style.visibility = 'visible';
        let modal_text = modal_add.querySelector('#modal_textarea');

        const storeButton = modal_add.querySelector('.modal_store');
        
        storeButton.addEventListener('click',function(){
            let temp = `<div class="product ${totalItem}">
                        <div class="content">${modal_text.value}</div>
                        <button class="modify">수정</button>
                        <button class="delete">삭제</button>
                    </div>`
            let list = JSON.parse(localStorage.getItem('items'));
            console.log(list);
            list[totalItem] = [`${totalItem}`,temp];
            
            totalItem++;
            localStorage.setItem('items',JSON.stringify(list));
            modal_text.value = '';
            modal_add.style.visibility = 'hidden';
        });
    })
              
      
    
    /*전체를 다 가져오는 방법말고 temp를 바로 붙여넣을 수 있는 방법은?  */

    //수정 버튼 누르면 해당 목록 수정 할 수 있도록 창이 뜸
    function modifyProduct(num,textContent){
        const modal_modify = document.querySelector('.modal_modify');
        modal_modify.style.visibility = 'visible';
        let modal_text = modal_modify.querySelector('#modal_textarea');
        modal_text.value += textContent;

        const storeButton = modal_modify.querySelector('.modal_store');
        storeButton.addEventListener('click',function(){
            let list = JSON.parse(localStorage.getItem('items'));
            list[num][1] = `<div class="product ${num}">
                            <div class="content">${modal_text.value}</div>
                            <button class="modify">수정</button>
                            <button class="delete">삭제</button>
                        </div>`;
            console.log('수정한 품목 내용',list[num][1]);

            localStorage.setItem('items',JSON.stringify(list));
            modal_text.value = '';
            modal_modify.style.visibility = 'hidden';
        });

        //getLocalStorage(startProduct, startProduct + onePage);
    }

    //삭제 버튼 누르면 해당 목록을 localstorage에서 삭제 후 페이지를 다시 만들어줘야 함
    function deleteProduct(num){
        //console.log('삭제할 숫자, 시작 숫자',num,startProduct);
        const list = JSON.parse(localStorage.getItem('items'));
        const numlist = [];
        //const listNum = JSON.parse(localStorage.getItem('listNum'));
        for(let i = 0; i < list.length;i++){
            numlist[i] = list[i][0];
        }
        //console.log(numlist);
        let productNum = numlist.indexOf(String(num));
        
        //console.log(productNum);
        list.splice(productNum,1);

        localStorage.setItem('items',JSON.stringify(list));

    }

    //modify랑 delete를 눌렀을 때(이벤트 계승)
    const container = document.querySelector('.products');
    container.addEventListener('click',function(event){
        let target = event.target;
        console.log('event',event);
        let num = Number(target.parentNode.classList[1]);  //삭제할 번호
        console.log('누른 품목 번호',num);

        //console.log('startProduct', startProduct);
        if (target.classList.contains('delete')) {
            deleteProduct(num);
            paintItems((currentPage - 1) * onePage);
        } else if (target.classList.contains('modify')) {
            let textContent = event.path[1].children[0].innerHTML; //수정할 품목에 담긴 text
            modifyProduct(num, textContent);
            paintItems((currentPage - 1) * onePage);
        }
    });
})()
