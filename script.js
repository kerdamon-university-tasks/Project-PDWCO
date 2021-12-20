window.onload = function() {
    update_comments();
}

async function fetchData(url){
    let response = await fetch(url)
    return response.json()
}

async function update_comments(){

    let db_comments = await fetchData("https://pdwco-project.herokuapp.com/api/get-dict")
    console.log(db_comments)
    
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
        
        console.log(comment_div)
        comments.push(comment_div)
    }

    let comments_list = document.getElementById("comments-list")
    comments_list.innerHTML = ''
    for (const elem of comments){
        console.log(elem)
        comments_list.appendChild(elem)
    }
}