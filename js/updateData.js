var updateData = (function(){

    let author;
    let title;
    let id;
    let image;
    let article;
    let url;
    let avatar;
    let BASE_URL = 'https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/';

    function fetchArticleForEdit(params) {
        fetch(`${BASE_URL}${params}`)
            .then((res) => res.json())
            .then((data) => {
                document.querySelector('.formTitle').innerHTML = 'Update Article';
                id = data.id;
                document.querySelector('#title').value = title = data.title;
                document.querySelector('#url').value = url =  data.url;
                document.querySelector('#author').value = author = data.author || '';
                document.querySelector('#article').value = article = data.article || '';
                if (data.avatar) {
                    document.querySelector('.testImageHolder').style.display = 'block';
                    document.querySelector('#test').src = avatar = data.avatar;
                }

                document.querySelector('.submit').classList.add('hideItem');
                document.querySelector('.update').classList.remove('hideItem');

            })
            .catch((err) => console.log(err));
    }

    function removeErrorNotification() {
        setTimeout(() => {
            document.querySelector('.errorMessage').classList.add('message');
            document.querySelector('.message').classList.remove('errorMessage');
            document.querySelector('.message').classList.add('hideItem');
            document.querySelector('.message').innerHTML = '';
        }, 3000);
    }

    function removeSuccessNotification() {
        setTimeout(() => {
            let message = document.querySelector('.message');
            message.classList.add('hideItem');
            message.innerHTML = '';
        }, 3000)
    }
    
    function updateArticle() {
        document.querySelector('.update').addEventListener('click', function () {
            let data = {
                id: id,
                title: document.querySelector('#title').value,
                url: document.querySelector('#url').value,
                author: document.querySelector('#author').value,
                article: document.querySelector('#article').value,
                avatar: file
            };

            avatar = file;
            fetch(`${BASE_URL}${id}`, {
                method: 'put',
                body: JSON.stringify(data),
            }).then((res) => {
                if(res.status === 200) {
                    let message = document.querySelector('.message');
                     message.classList.remove('hideItem');
                     message.innerHTML = 'Successfully updated';
                     document.querySelector('#title').value = document.querySelector('#file').value = document.querySelector('#url').value =
                     document.querySelector('#author').value = document.querySelector('#article').value = '';
                     document.querySelector('.testImageHolder').style.display = 'none';
                    fetchAllExistingItemInTheDom(data.id, data.title, data.url, data.author, data.article);
                }
            }).catch((err) => {
                document.querySelector('.message').classList.add('errorMessage');
                document.querySelector('.message').classList.remove('hideItem', 'message');
                document.querySelector('.errorMessage').innerHTML = err;
                removeErrorNotification();
            })



        })
    }

    function clickArticleForEditing() {
        window.addEventListener('load', function () {
            window.addEventListener('click', function(e){
                if (e.target.className === 'edit') {
                    let id = e.target.getAttribute('attr');
                    fetchArticleForEdit(id);
                }
            })
        });
    }

    function fetchAllExistingItemInTheDom(id, title, url, author, article) {
        document.querySelectorAll('.content').forEach((item) => {
            if (item.getAttribute('attrId') === id) {
                item.querySelector('.articleTitle').innerHTML = title;
                item.querySelector('.articleUrl').innerHTML = url;
                item.querySelector('.articleAuthor').innerHTML = author ? author : article;


                if (avatar.name) {
                    console.log('string');
                    item.querySelector('.imageContainer img').src = image;
                } else {
                    console.log('fff');
                }

                removeSuccessNotification();

            }
        })
    }

    function changeAvatar() {
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

    function fetchArticleForDeleting() {
        window.addEventListener('click', function (e) {
            if(e.target.className === 'delete') {
                let id = e.target.getAttribute('attr');
                fetch(`${BASE_URL}${id}`, {
                    method: 'delete'
                }).then((res) => {
                    if (res.status === 200) {
                        deleteArticle(id);
                    }
                }).then((err) => {
                    console.log(err);
                })

            }
        })
    }

    function deleteArticle(id) {
        document.querySelectorAll('.content').forEach((item) => {
            if (item.getAttribute('attrId') === id) {
                item.style.display = 'none';
            }
        });
        }

    function init() {
        updateArticle();
        clickArticleForEditing();
        changeAvatar();
        fetchArticleForDeleting();
    }


    return {
        init: init
    }
}());