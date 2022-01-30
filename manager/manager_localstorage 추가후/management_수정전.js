//let rr;
//1.현재 페이지 표시
//2.현재 페이지가 클릭이 안되도록(현재 보여지는 페이지이므로 다시 이동될 필요가 없음)
//3.유일한 키를 생성해서 사용(result.length를 통해서 품목의 key를 정해주면 나중에 리스트가 줄어들어서 key가 앞에 저장된 것이 있다면
    //key가 중복되기 때문에 result의 key에 유일한 값을 넣어주기 위해서 keyNum이라는 것을 정함
    //즉 이 키는 늘어나기만한다.)
//4.추가할 때랑 수정할 때 storeButton이 중복되서 실행되지 않도록 한번만 실행되도록 해야함

(function () {
    const productList = document.querySelector('.productList');

    let totalItem = 100;  //전체 품목의 개수
    const onePage = 15;  //한 페이지 당 보여줄 품목의 개수
    const pageSize = 10; //한 번에 보이는 페이지 목록의 개수
    let result = [];
    //rr = result;

    const page = document.querySelector('.page');
    console.log(page);
    const totalPage = Math.ceil(totalItem / onePage);
    console.log(totalPage);
    let currentPage = 1;

// 더미 데이터 생성
    function makeList() {  //아이템 목록 만들어주기
        //아이템 목록을 만들어주는 것과 태그를 넣어서 페이지를 만들어주는 것은 따로 해주는 것이 좋음
        const list = getStorage('items');
        if (list !== null && list.length !== 0) {  //해당 페이지에 이미 아이템 목록이 만들어져 있다면
            //아이템 목록을 만들어주는 것이 아니라 원래 있던 아이템 목록을 가져와야 함  
            result = list;
            return;
        }

        for (let i = 0; i < totalItem; i++) {//만약에 해당 페이지에 처음 들어가는 거라면
            //새롭게 목록 생성해서 넣어줘야 함
            //객체 사용
            //태그를 넣어주는 것이 아니라 아이템의 데이터만 객체를 통해서 넣어줌
            result.push({key: i, name: `아미렌 ${i} 핀턱 4부 데님 팬츠`, size: 34, type: '팬츠'});
        }
        setStorage(result);
    }

    makeList();

    function getStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function setStorage(result) {
        localStorage.setItem('items', JSON.stringify(result));
    }

    function paintItems(first) {  //페이지에 해당하는 아이템 목록 가져오기
        //페이지를 만들어줄 때 태그를 붙여주는 형식으로 만들어주는 것
        //dataset공부하기
        //dataset은 데이터를 표기하는 표준적인 방법
        //dataset 속성은 data-속성명="속성값"으로 1개의 dataset 속성을 정의함
        //자바스크립트는 DOM 생성 시점에 "data-"로 시작한느 속성들을 하나로 모아 "dataset"맵으로 따로 모아서 관리함

        //DOM property 접근 방식을 통한 추가는 elementNode.dataset.새데이터속성이름 = "속성값";
        //자바스크립로 dataset 접근
            //DOM 생성시점에 속성을 파싱해서 "data-"로 시작하는 속성은 표준 데이터셋 속성으로 인식
            //이 "data-" 속성들은 노드의 dataset맵에 모아져 저장되며 객체 프로퍼티 접근 방법으로 각각의 속성에 접근할 수 있음
        let temp = '';

        for (let i = first; i < first + onePage; i++) {
            if(result[i] !== undefined){
                const data = result[i];
                temp += `<div class="product product-${data.key}" data-key="${data.key}">
                             <div class="content">${data.name} ${data.size} ${data.type}</div>
                             <div class="content-btns">
                                 <button class="modify">수정</button>
                                 <button class="delete">삭제</button>
                             </div>
                         </div>`;
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

        if (lastPage > totalPage) {
            lastPage = totalPage;
        }

        let tempButton = [];//페이지 목록을 담아줄 배열
        if (firstPage > pageSize) {  //즉 이전이 필요하면 항상 pageSize보다 크므로 이전을 넣어줌
            tempButton.push(buttonTemplate('이전'));
        }

        for (let i = firstPage; i <= lastPage; i++) {
            tempButton.push(buttonTemplate(i));
        }

        if (lastPage < totalPage - 1) {  //보여지는 페이지의 목록의 마지막이 전체 페이지보다 적으면 다음이 필요
            tempButton.push(buttonTemplate('다음'));
        }
        page.innerHTML = tempButton.join('');
    }

    makePageNum();

    page.addEventListener('click', function (event) {
        console.log(page);
        let target = event.target;  //내가 누른 페이지
        console.log('page', target);
        let textContent;
        if (target.className === 'page') {  //만약에 페이지 잘못 넣었을 때
            return;
        }

        if (target.textContent === '이전') {
            textContent = Number(target.nextSibling.textContent) - 1;  //11이면
        } else if (target.textContent === '다음') {
            textContent = Number(target.previousSibling.textContent) + 1;  //10이면
        } else {
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
    add.addEventListener('click', function () {
        const modalModify = document.querySelector('.modal_modify');
        modalModify.style.visibility = 'visible';

        const nameElem = modalModify.querySelector('#name');
        const sizeElem = modalModify.querySelector('#size');
        const typeElem = modalModify.querySelector('#type');

        const storeButton = modalModify.querySelector('.modal_store');
        storeButton.addEventListener('click', function () {
            result.push({key: result.length, name: nameElem.value, size: Number(sizeElem.value), type: typeElem.value});
            console.log('add---',result[result.length - 1]);
            setStorage(result);
            // 갱신된 result를 로컬스토리지에 다시 저장한다

            totalItem++;
            // totalItem = result.length;

            modalModify.style.visibility = 'hidden';
            nameElem.value = '';
            sizeElem.value = '';
            typeElem.value = '';

            // 화면에 보이고 있는 데이터를 다시 그린다
            //모달창을 hidden해주고 painItems로 페이지를 다시 그려줘야 함
            paintItems((currentPage - 1) * onePage);
        });
    })

    /*전체를 다 가져오는 방법말고 temp를 바로 붙여넣을 수 있는 방법은?  */

//수정 버튼 누르면 해당 목록 수정 할 수 있도록 창이 뜸
    function modifyProduct(key) {
        let item = null;
        let modifyIndex = null;
        for (let i = 0; i < result.length; i++) {
            if (result[i].key === key) {
                item = result[i];
                //items에 해당 품목의 내용을 다 담아줌
                modifyIndex = i; 
                //해당 품목이 리스트에서 몇번째에 있는지 가져옴
            }
        }

        const modalModify = document.querySelector('.modal_modify');
        modalModify.style.visibility = 'visible';

        const nameElem = modalModify.querySelector('#name');
        const sizeElem = modalModify.querySelector('#size');
        const typeElem = modalModify.querySelector('#type');
        nameElem.value = item.name;
        sizeElem.value = item.size;
        typeElem.value = item.type;

        // 수정 저장 버튼은 밖으로 빠져 있는게 더 좋은 구조임.
        // 수정 또는 추가 할때마다 이벤트 리스너가 중복으로 등록됨.
        // 수정 함수가 실행되면서 storeButton에 click 이벤트가 또 중복으로 등록됨
        // 그러므로 storeButton이 클릭되면 중복되서 저장된게 모두 실행이 됨
        // 중복된거를 없애기 위한 방법이 필요함
        // 단순하게는 removeEventLister이 있음 하지만 귀찮고 예상하지 못한 값이 생성될 수 있음
        // 수정을 두번하면 문제점이 보임.
        const storeButton = modalModify.querySelector('.modal_store');
        storeButton.addEventListener('click', function () {
            console.log('storeButton  ---------------', key);
            result[modifyIndex] = {key: key, name: nameElem.value, size: Number(sizeElem.value), type: typeElem.value};
            //수정된 품목의 인덱스에 해당하는 곳에 바뀐 내용을 다시 저장함
            setStorage(result);
            // 갱신된 result를 로컬스토리지에 다시 저장한다

            modalModify.style.visibility = 'hidden';
            nameElem.value = '';
            sizeElem.value = '';
            typeElem.value = '';

            // 화면에 보이고 있는 데이터를 다시 그린다
            paintItems((currentPage - 1) * onePage);
        });
    }

//삭제 버튼 누르면 해당 목록을 localstorage에서 삭제 후 페이지를 다시 만들어줘야 함
    function deleteProduct(key) {
        for (let i = 0; i < result.length; i++) {
            if (result[i].key === key) {
                result.splice(i, 1);  //같으면 여기서 바로 잘라버리기
            }
        }

        totalItem -= 1;
        // totalItem = result.length;
        // 갱신된 result를 로컬스토리지에 다시 저장한다
        //여기서 페이지 리스트도 갱신되야 함
        setStorage(result);
        paintItems((currentPage - 1) * onePage);
    }

//modify랑 delete를 눌렀을 때(이벤트 계승)
    const container = document.querySelector('.products');
    container.addEventListener('click', function (event) {
        const target = event.target;

        // product가 클릭 되면 아무일도 하지 않는다.
        // if (target.classList.contains('product')) {
        //     return;
        // }

        // 클릭된 태그가 버튼이 아니면 아무일도 하지 않는다.
        //nodeName은 태그이름을 가르킴
        //즉 nodeName이 BUTTON이 아닌 것을 의미함
        if (target.nodeName !== 'BUTTON') {
            return;
        }

        //삭제할 번호
        const key = Number(target.parentNode.parentNode.dataset.key);
        console.log('누른 품목 번호', key);

        //console.log('startProduct', startProduct);
        if (target.classList.contains('delete')) {
            deleteProduct(key);
        }

        if (target.classList.contains('modify')) {
            modifyProduct(key);

            // 여기서 하는건 의미가 없음
            //의미가 없는 이유 modifyProduct함수가 실행되고 여기서 정보가 변경되고 변경된 정보가
            //localstorage에 들어간 후에 변경이 된 내용을 바탕으로 페이지가 그려져야 하는데
            //modifyProduct를 한후에 여기서 paintItems를 하게 되면 내용이 수정되기 전에 paintItem가 실행이 된다
            //왜냐하면 modifyProduct를 하고 변경된 내용이 들어가고 저장버튼을 눌러서 localstorage에 들어간 후에 저장되는 것 까지 
            //painItems가 기다리는 것이 아니라 modifyProduct를 호출 한 후에 바로 painItems가 호출되어서 실행이 되기 때문임
            // paintItems((currentPage - 1) * onePage);
        }
    });
})()
