const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteBtn");

const handleDel = async (event) => {
    //console.log("HI");
    const { id, videoId } = event.target.dataset;
    //console.log(id, videoId);
    const response = await fetch(`/api/videos/${videoId}/comment/${id}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, videoId }),
    });
    //console.log(response.status);
    if (response.status === 200) {
        event.target.parentNode.remove();
    }
}

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");

    newComment.dataset.id = id;
    newComment.className = "video__comment";

    const icon = document.createElement("i");
    icon.className = "fas fa-comment";

    const span = document.createElement("span");
    span.innerText = ` ${text}`;

    const spanDel = document.createElement("span");
    spanDel.innerText = "삭제";
    spanDel.id = "deleteBtn";
    spanDel.dataset.id = id;
    spanDel.dataset.videoId = videoContainer.dataset.id;;
    spanDel.addEventListener("click", handleDel);


    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(spanDel);

    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
    deleteBtn.forEach((btn) => btn.addEventListener("click", handleDel));
}