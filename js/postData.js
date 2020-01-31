var postData = (function(){

    let file ={};
    let image  = '';
    const BASE_URL = 'https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article';


    function sumbitNewArticle() {
        document.querySelector('.submit').addEventListener('click', function (e) {
            let data = {
                title: document.querySelector('#title').value,
                url: document.querySelector('#url').value,
                author: document.querySelector('#author').value,
                article: document.querySelector('#article').value,
                avatar: file
            }

            console.log(data);


            fetch(`${BASE_URL}`, {
                method: 'post',
                body: JSON.stringify(data)
            }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                   let parentElement = document.querySelector('#content');
                   let firstChild = parentElement.firstElementChild;
                   let newArticle = document.createElement("div");
                    newArticle.classList.add('content');
                    newArticle.innerHTML = `
                      <div class="imageContainer"><img src="${image}"></div>
                  <div class="textContent">
                  <div>${data.title}</div>
                  <div>${'url ' + data.url}</div>
                  <div>${data.author ? (data.author ? 'Author ' + data.author : '') : (data.article ? 'Article ' + data.article : '')}</div>
                 </div>
                  <div class="buttonContainer"><button class="edit" attr="${Math.floor(Math.random() * 200)}">Edit</button>
                  <button class="delete" attr="${Math.floor(Math.random() * 200)}">Delete</button>
                     `;
                    parentElement.insertBefore(newArticle, firstChild);


                    document.querySelector('#file').value = document.querySelector('#article').value = document.querySelector('#title').value = document.querySelector('#url').value =document.querySelector('#author').value = '';
                    document.querySelector('.testImageHolder').style.display = 'none';
                }
            })
        });
    }

    function uploadAvatar() {
        document.querySelector('#file').addEventListener('change', function (e) {
            document.querySelector('.testImageHolder').style.display = 'block';
            file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                image = e.target.result;
                document.querySelector('#test').src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        })

    }


    function init(){
        sumbitNewArticle();
        uploadAvatar();
    }

    return {
        init: init
    }

}());