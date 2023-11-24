function onload() {
    const postID = new URLSearchParams(window.location.search).get("id");
    var key = "o4e5h1SNHZaP4vyOzcEIRmaA";
    const url = "https://rustelectrics.mrdigi.tv/wp-json/wp/v2/posts?_embed&include="+ postID + "&Authorization=Bearer"+ key;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        let contentObj = document.getElementById("latestContent");
        let modalObj = document.getElementById("modal");
        console.log(data);
        for (var i=0; i < data.length; i++) {
            let postObj = document.createElement("div");
            postObj.id = "postPage";

            let sectionHead = document.createElement("h1");
            sectionHead.id = "postTitle";
            sectionHead.innerHTML = data[i].title.rendered;
            contentObj.appendChild(sectionHead);

            let postImg = document.createElement("img");
            postImg.src = data[i]._embedded['wp:featuredmedia'][0].source_url;
            postImg.setAttribute("onclick","openModal()");

            let modalImg = document.createElement("img");
            modalImg.src = postImg.src;
            modalObj.appendChild(modalImg);

            let postTextArea = document.createElement("div");
            postTextArea.id = "textAreaPost";

            let postText = document.createElement("text");
            let postString = data[i].content.rendered;
            postText.innerHTML = postString;

            let postLink = document.createElement("a");
            postLink.setAttribute("href","post.html?id="+data[i].id)

            postTextArea.appendChild(postText);
            postTextArea.appendChild(postLink);
            postObj.appendChild(postImg);
            postObj.appendChild(postTextArea);
            contentObj.appendChild(postObj);
        }
    })
    .catch(function(error) {
        console.log(error);
        let contentObj = document.getElementById("latestContent");
        let errorObj = document.createElement("h2");
        errorObj.innerHTML = "Failed to load posts from extrernal website";
        contentObj.appendChild(errorObj);
    });
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

onload();