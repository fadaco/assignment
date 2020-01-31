var getSingleArticle = (function () {

    let var_id;
    let image;
    let commentid;
    let file;
    const BASE_URL = 'https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/';

    function getPageUrl(){
        let url = new URL(location.href);
        let id = url.searchParams.get('id');
        var_id = id;
    }

    function fetchSingleArticle() {
        fetch(`${BASE_URL}${var_id}`)
            .then((res) => res.json())
            .then((data) => {
                document.querySelector('#article-detail').innerHTML = `
                 <div class="singleArticle"> <img src="${data.avatar}"></div>
                  <div>${data.title}</div>
                  <div>${data.url}</div>
                `;
                getCommentForASingleArticle(var_id);
            })
            .catch((error) => console.log(error))
    }

    function getCommentForASingleArticle(id) {
        fetch(`${BASE_URL}${id}/comments`)
            .then((res) => res.json())
            .then(data => {
                data.forEach((item) => {
                document.querySelector('#comments').innerHTML += `
                  <div class="commentContent" attrId="${item.id}">
                  <div class="commentImageContainer">
                   <img src="${item.avatar}"/>
                   </div>
                   <div>
                   <div class="commentTitle">${item.name}</div>
                   <div class="commentC">${item.comment}</div>
                   </div>
                   <div>
                <div class="editComment" editId="${item.id}">Edit</div>
                <div class="deleteComment" deleteId="${item.id}">Delete</div>

</div>
                   </div>
                `;
                })
            })
            .catch(err => console.log(err));

    }

    function removeErrorNotification() {
        setTimeout(() => {
            document.querySelector('.errorMessage').classList.add('message');
            document.querySelector('.message').classList.remove('errorMessage');
            document.querySelector('.message').classList.add('hideItem');
            document.querySelector('.message').innerHTML = '';
        }, 3000);
    }

    function addNewContent() {
        document.querySelector('#addComment').addEventListener('click', function () {
            let data = {
                articleId: var_id,
                name: document.querySelector('#name').value,
                comment: document.querySelector('#comment').value,
                avatar: file
            }

            console.log(data);
            fetch(`${BASE_URL}${data.articleId}/comments`, {
                method: 'post',
                body: JSON.stringify(data)
            }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    let parentElement = document.querySelector('#comments');
                    let firstChild = parentElement.firstElementChild;
                    let newComment = document.createElement('div');
                    newComment.classList.add('commentContent');
                    newComment.innerHTML = `
                    <div class="commentImageContainer">
                   <img src="${image}"/>
                   </div>
                   <div>
                   <div>${data.name}</div>
                   <div>${data.comment}</div>
                   </div>
                   <div>
                   <div class="editComment">Edit</div>
                   <div class="deleteComment">Delete</div>
</div>
                    `;
                    parentElement.insertBefore(newComment, firstChild);

                    document.querySelector('#avatar').value = document.querySelector('#name').value = document.querySelector('#comment').value = '';
                    document.querySelector('.testImageHolder').style.display = 'none';


                }
            }).catch((err) => console.log(err.response.message));

        })

    }

    function changeCommentAvatar() {
        document.querySelector('#avatar').addEventListener('change', function (e) {
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

    function editComment() {
        window.addEventListener('click', function (e) {
            if (e.target.className === 'editComment') {
                let id = e.target.getAttribute('editId');
                fetchCommentForEdit(id);
            }
        })
    }

    function deleteComment() {
        window.addEventListener('click', function (e) {
            if (e.target.className === 'deleteComment') {
                let id = e.target.getAttribute('deleteId');
                fetchCommentForDelete(id)
            }
        })
    }

    function executeNotification(label) {
        document.querySelector('.message').classList.add('errorMessage');
        document.querySelector('.errorMessage').classList.remove('hideItem', 'message');
        document.querySelector('.errorMessage').innerHTML = label;
        removeErrorNotification();
    }

    function fetchCommentForEdit(id) {
        document.querySelectorAll('.commentContent').forEach((item) => {
            if (item.getAttribute('attrId') === id) {
                commentid = id;
                 document.querySelector('#name').value = item.querySelector('.commentTitle').innerHTML;
                 document.querySelector('#comment').value = item.querySelector('.commentC').innerHTML;
                 document.querySelector('.testImageHolder').style.display = 'block';
                document.querySelector('#test').src = item.querySelector('.commentImageContainer img').src;
                document.querySelector('#addComment').classList.add('hideItem');
                document.querySelector('#updateComment').classList.remove('hideItem');
            }
        })
    }

    function updateComment() {
        document.querySelector('#updateComment').addEventListener('click', function(){
            console.log(var_id);
            console.log(commentid);
            let data = {
                articleId : var_id,
                name: document.querySelector('#name').value,
                comment: document.querySelector('#comment').value,
                avatar: file ? file : document.querySelector('#test').src
            }

            console.log(data);
            fetch(`${BASE_URL}${var_id}/comments/${commentid}`, {
                method: 'put',
                body: JSON.stringify(data)
            }).then((res) => {
               if (res.status === 200) {
                   document.querySelector('#name').value = document.querySelector('#comment').value = document.querySelector('#avatar').value = document.querySelector('#test').src  = '';
                   document.querySelector('.testImageHolder').style.display = 'none';
                   fetchAllExistingCommentInTheDom(commentid, data.name, data.comment)
               }
            })
        })
    }


    function fetchAllExistingCommentInTheDom(id, name, comment) {
        document.querySelectorAll('.commentContent').forEach((item) => {
            if (item.getAttribute('attrId') === id) {
                 item.querySelector('.commentTitle').innerHTML = name;
                 item.querySelector('.commentC').innerHTML = comment;
                 if (file !== undefined) {
                     item.querySelector('.commentImageContainer img').src = image;
                 }
            }
        })
    }

    function fetchCommentForDelete(id) {
        fetch(`${BASE_URL}${var_id}/comments/${id}`, {
            method: 'delete'
        }).then((res) => {
            if (res.status === 200) {
                fetchAllCommitFromDomToDelete(id);

            }
        });

    }

    function fetchAllCommitFromDomToDelete(id) {
        document.querySelectorAll('.commentContent').forEach((item) => {
            if (item.getAttribute('attrId') === id) {
                item.style.display = 'none';
            }
        })
    }




     function init() {
         getPageUrl();
         fetchSingleArticle();
         addNewContent();
         changeCommentAvatar();
         editComment();
         deleteComment();
         updateComment();
    }


    return {
        init: init
    }
}());