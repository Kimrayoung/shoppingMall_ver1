# shoppingMall_ver1

## 📜 프로젝트 소개
Jstyle이라는 쇼핑몰을 모델로 쇼핑몰을 제작하였습니다. 순수 자바스크립트로만 이루어져있고 캐러셀기능, 페이징 기능, 쿠키 등의 기능이 포함되어있습니다. 
이 프로젝트는 node.js를 공부하기 전에 진행했던 프로젝트로 db는 localstorage를 이용해서 제작하였습니다.  

<img width="560" alt="스크린샷 2022-02-01 오전 2 06 36" src="https://user-images.githubusercontent.com/66238470/152202294-dc9db8e0-1eb5-4193-85cf-979455b369e4.png">

### 🛠 Stacks
<div>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

### 📁 폴더별 안내
###### main_page
+ mall.css mall.html mall.css는 모두 메인 페이지에 관련된 파일입니다
+ reset.css는 브라우저에 자동으로 적용해주는 css 속성들을 초기화 해주기 위해서 넣은 파일입니다
---------
###### manager
+ manage_localstorage 추가 전 폴더에는 단지 브라우저 상에서 데이터 저장이 일어나지 않고 추가, 수정, 삭제가 됩니다
+ manage_localstorage 추가 후 폴더에서는 localstorage에 데이터를 저장하여서 관리자가 데이터를 수정하거나 삭제하거나 추가하면 localstorage에 저장이 됩니다
  + 따라서 수정을 하면 localstorage에 있는 데이터를 가지고 오게 됩니다. 

### 💡 Points

###### 관리자 페이지
+ 가장 상단의 추가 버튼을 클릭하면 아이템들을 추가할 수 있습니다.
+ localstorage에 아이템이 추가됩니다
+ 수정 버튼을 클릭하면 해당 데이터가 localstorage에서 가져와져서 데이터를 수정할 수 있습니다
+ 삭제 버튼을 클릭하면 데이터가 삭제됩니다
+ 상단의 페이지 목록에서 페이지를 삭제하면 페이지를 삭제하실 수 있습니다
---------------
###### 메인페이지
+ 캐러셀 기능을 추가하여 일정 시간이 지나면 이미지가 슬라이딩 되면서 바뀝니다
+ 캐러셀 박스에서 prev를 누르면 이전 이미지를 next이미지를 누르면 다음 이미지를 보실 수 있습니다
+ 쿠키 기능을 이용하여 팝업창을 추가했습니다 가장 상단에 뜨는 두개의 이미지가 popup창 입니다.
+ 더 이상 보지 않기를 클릭하면 24시간 동안 이미지가 보이지 않습니다.

https://user-images.githubusercontent.com/66238470/152204565-0c8300db-f9c0-4543-87f3-f2f9958064d5.gif
https://user-images.githubusercontent.com/66238470/152204546-6a51f907-2df5-4d09-afc8-0440e527cb2f.gif
