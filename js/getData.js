var getData = (function(){

    let page = 1;
    let limit = 5;
    const BASE_URL = 'https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article';

     function getUserData(params){
        fetch(`${BASE_URL}?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                DisplayData(data, params)
            })
    }

    function DisplayData(userData){
        document.querySelector('#changeLimit').value= limit;
        userData.forEach((item) => {
            document.querySelector('#content').innerHTML += `<div attrId="${item.id}" class="content">
                  <a href='article-detail.html?id=${item.id}'>
                  <div class="imageContainer"><img src="${item.avatar}"></div>
                  <div class="textContent">
                  <div class="articleTitle">${item.title}</div>
                  <div class="articleUrl">${'url ' + item.url}</div>
                  <div class="articleAuthor">${item.author ? (item.author ? 'Author ' + item.author : '<div class="hide">kkk</div>') : (item.article ? 'Article ' + item.article : '<div class="hide">kkk</div>')}</div>
                 </div>
                  </a>
                    <div class="buttonContainer"><button class="edit" attr="${item.id}">Edit</button>
                    <button class="delete" attr="${item.id}">Delete</button>
                    </div>
               </div>`
        });


    }

    function getPageUrl(){
        let url = new URL(location.href);
        let id = url.searchParams.get('page');
        let pageLimit = url.searchParams.get('limit');
        if(id) page = id;
        if(pageLimit) limit = pageLimit;
    }

    function loadNextPage() {
        document.querySelector('#next').addEventListener('click', function () {
            page++
            location.href= `index.html?page=${page}&limit=${limit}`;
        });
    }

    function loadPreviousPage() {
        document.querySelector('#back').addEventListener('click', function () {
            if (page > 1) page--;
            location.href = `index.html?page=${page}&limit=${limit}`;

        });
    }

    function changeLimit() {
        document.querySelector('#changeLimit').addEventListener('change', function(e){
            console.log(e.target.value);
            limit = e.target.value;
            location.href= `index.html?page=${page}&limit=${limit}`;
        })
    }

     function init() {
         getPageUrl();
         getUserData();
         loadNextPage();
         loadPreviousPage();
         changeLimit();
    }

    return {
        init: init,
    }

}());