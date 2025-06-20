
const API_URL ="http://localhost:3000/posts"

const postList =document.getElementById("post-list");
const createForm =document.getElementById("createForm")

function displayPosts() {
    fetch(API_URL).then(response => response.json()).then(data => {
        postList.innerHTML = "";

        data.forEach(post => {
            const postId = post.id
            const postTitle = post.title || "";
            const content = post.content || ""; 
            const author = post.author || "Unkown Author";
            const li =document.createElement("li")
            li.innerHTML =`
            <div id="post-${postId}" class= "post">
            <div class="post-content">
            <h2>${postTitle}</h2>
            <p>${content}</p>
            </div>
            <div class="actions">
            <button onclick="showEditForm('${postId}','${postTitle}','${content}', '${author}')" class="myButton"><i 
            class='bx bx-edit-alt'></i></button>
            <button onclick="deletePost('${postId}')" class="myDeleteButton"><i class='bx bx-trash' style='color:#ffffff' >
            </i></button>
            </div>
            </div>
            `;
            postList.appendChild(li)
        });
    })
}
function addNewPostListener() {
createForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const title = document.getElementById("title").value
    const content = document.getElementById("post-content").value
    const author =document.getElementById("author").value

    fetch(API_URL, {
        method : "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ title, content, author })
    }).then (response => response.json())
    .then (data => {
        alert("post created successfully")
        console.log (data)
        displayPosts()
        createForm.reset();
    })

})
}
function showEditForm (postId, currentTitle,currentContent, currentAuthor) {
    const postDiv = document.getElementById(`post-${postId}`);
    postDiv.innerHTML = `
    <form id="editForm">
        <input type="text" id="editTitle-${postId}" value="${currentTitle}" required>
         <input type="text" id="edit-author-${postId}" value="${currentAuthor}" required>
        <textarea id="edit-content-${postId}" required>${currentContent}</textarea>
        <button type="button" onclick="saveEdit('${postId}')" class="myButton"><i class='bx bx-check' style='color:#ffffff' ></i></button>
        <button type="button" onclick="cancelEdit('${postId}')" class ="myDeleteButton"><i class='bx bx-x' style='color:#ffffff' ></i></button>
        </form>
        `;
}

function saveEdit(postId) {
    const newTitle =document.getElementById(`editTitle-${postId}`).value;
    const newContent =document.getElementById(`edit-content-${postId}`).value;
    const newAuthor =document.getElementById(`edit-author-${postId}`).value;

    fetch(`${API_URL}/${postId}`, {
        method: "PATCH",
        headers: {
           "content-type": "application/json"
        },
        body: JSON.stringify({ title: newTitle,content: newContent, author: newAuthor})
    }).then(response => response.json()).then(data => {
        alert("post updated successfully");
        console.log(data);
        displayPosts();
    })

}

function cancelEdit(postId) {
    displayPosts();    // refresh the post list to show the original content
}

function deletePost(postId) {
    if(confirm("Are you sure you want to delete this post")) {
        fetch(`${API_URL}/${postId}`,{
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            alert("post deleted succesfully");
            console.log(data);
            displayPosts();
        });
    }


}
document.addEventListener("DOMContentLoaded", () => {
    displayPosts();
    addNewPostListener();
});

