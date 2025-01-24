function shareOnFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function addComment(newsId) {
    const commentInput = document.getElementById(`comment-input-${newsId}`);
    const commentText = commentInput.value.trim();
    if (commentText === '') {
        alert('Veuillez écrire un commentaire avant de publier.');
        return;
    }

    const commentsList = document.getElementById(`comments-list-${newsId}`);
    const newComment = document.createElement('div');
    newComment.className = 'comment';

    const timestamp = new Date().toLocaleString();
    newComment.innerHTML = `<p>${commentText}</p><span class="timestamp">${timestamp}</span><button onclick="deleteComment(${newsId}, this)">Supprimer</button>`;

    commentsList.appendChild(newComment);
    commentInput.value = '';

    saveComment(newsId, commentText, timestamp);
}

function saveComment(newsId, commentText, timestamp) {
    let comments = JSON.parse(localStorage.getItem(`comments-${newsId}`)) || [];
    comments.push({ text: commentText, time: timestamp });
    localStorage.setItem(`comments-${newsId}`, JSON.stringify(comments));
}

function loadComments(newsId) {
    const commentsList = document.getElementById(`comments-list-${newsId}`);
    let comments = JSON.parse(localStorage.getItem(`comments-${newsId}`)) || [];
    comments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `<p>${comment.text}</p><span class="timestamp">${comment.time}</span><button onclick="deleteComment(${newsId}, this)">Supprimer</button>`;
        commentsList.appendChild(newComment);
    });
}

function deleteComment(newsId, button) {
    const commentDiv = button.parentElement;
    const commentText = commentDiv.querySelector('p').textContent;
    let comments = JSON.parse(localStorage.getItem(`comments-${newsId}`)) || [];
    comments = comments.filter(comment => comment.text !== commentText);
    localStorage.setItem(`comments-${newsId}`, JSON.stringify(comments));
    commentDiv.remove();
}

// Call loadComments for each news item when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComments(1);
    loadComments(2);
    loadComments(3);
});