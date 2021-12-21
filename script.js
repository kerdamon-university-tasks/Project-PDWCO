window.onload = function() {
    update_comments();
    update_representative_comment();
}

async function fetchGet(url){
    let response = await fetch(url)
    return response.json()
}

async function fetchPost(url, data){
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    console.log(response)
    return response.json()
}

async function update_comments(){

    let db_comments = await fetchGet("https://pdwco-project.herokuapp.com//api/comments")
    
    let comments = []

    for (const db_comment of db_comments){
        let comment_div = document.createElement("div")
        comment_div.setAttribute("class", "jumbotron bg-light text-dark")
        let blockquote = document.createElement("blockquote")
        comment_div.appendChild(blockquote)


        let comment_content = document.createElement("p")
        comment_content.innerHTML = db_comment.content
        let comment_author = document.createElement("footer")
        comment_author.setAttribute("class", "blockquote-footer")
        comment_author.innerHTML = db_comment.author

        blockquote.appendChild(comment_content)
        blockquote.appendChild(comment_author)
        
        comments.push(comment_div)
    }

    let comments_list = document.getElementById("comments-list")
    comments_list.innerHTML = ''
    for (const elem of comments){
        comments_list.appendChild(elem)
    }
}

async function update_representative_comment(){

    let db_comments = await fetchGet("https://pdwco-project.herokuapp.com//api/representative-comment")
    
    let comments = []

    for (const db_comment of db_comments){
        let comment_div = document.createElement("div")
        comment_div.setAttribute("class", "jumbotron bg-light text-dark")
        let blockquote = document.createElement("blockquote")
        comment_div.appendChild(blockquote)


        let comment_content = document.createElement("p")
        comment_content.innerHTML = db_comment.content
        let comment_author = document.createElement("footer")
        comment_author.setAttribute("class", "blockquote-footer")
        comment_author.innerHTML = db_comment.author

        blockquote.appendChild(comment_content)
        blockquote.appendChild(comment_author)
        
        comments.push(comment_div)
    }

    let comments_list = document.getElementById("representative-comment")
    comments_list.innerHTML = ''
    for (const elem of comments){
        comments_list.appendChild(elem)
    }
}

async function add_to_db(){
    let author = document.getElementById("new-comment-author").value
    let content = document.getElementById("new-comment-content").value
    await fetchPost('https://pdwco-project.herokuapp.com//api/comment', {author, content})
    document.getElementById("new-comment-author").value = ''
    document.getElementById("new-comment-content").value = ''

    update_comments()
}