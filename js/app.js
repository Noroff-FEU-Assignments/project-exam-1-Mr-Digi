let postID = 0;
function onload() {
    var key = "o4e5h1SNHZaP4vyOzcEIRmaA";
    const url = "https://rustelectrics.mrdigi.tv/wp-json/wp/v2/posts?_embed&per_page=100&Authorization=Bearer"+ key;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        let contentObj = document.getElementById("latestContent");
        let latestObj = document.getElementById("latestPosts");
        let navContainer = document.createElement("navContainer");
        navContainer.id = "sliderNav";
        for (var i=0; i < data.length; i++) {
            if (data[i]._embedded['wp:term'][0][0].name == "Featured") {
                let postObj = document.createElement("div");
                postObj.id = "post";

                let postImg = document.createElement("img");
                postImg.src = data[i]._embedded['wp:featuredmedia'][0].source_url;

                let postTextArea = document.createElement("div");
                postTextArea.id = "textArea";

                let postTitle = document.createElement("h1");
                postTitle.innerHTML = data[i].title.rendered;

                let postText = document.createElement("text");
                let postString = data[i].excerpt.rendered;
                postText.innerHTML = postString;

                let postLink = document.createElement("a");
                postLink.setAttribute("href","post.html?id="+data[i].id)

                let postBtn = document.createElement("button");
                postBtn.id = "readPost";
                postBtn.innerHTML = "Read more";

                postTextArea.appendChild(postTitle);
                postTextArea.appendChild(postText);
                postLink.appendChild(postBtn);
                postTextArea.appendChild(postLink);
                postObj.appendChild(postImg);
                postObj.appendChild(postTextArea);
                contentObj.appendChild(postObj);
                break;
            }
        }
        let containerDiv = document.createElement("div");
        containerDiv.id = "container";
        //4 latest posts
        for (var i=0; i < 1; i++) {
            let postObj = document.createElement("div");
            postObj.id = "post";

            let postImg = document.createElement("img");
            postImg.src = data[i]._embedded['wp:featuredmedia'][0].source_url;

            let postTextArea = document.createElement("div");
            postTextArea.id = "textArea";

            let postTitle = document.createElement("h1");
            postTitle.innerHTML = data[i].title.rendered;

            let postText = document.createElement("text");
            let postString = data[i].excerpt.rendered;
            postText.innerHTML = postString;

            let postLink = document.createElement("a");
            postLink.setAttribute("href","post.html?id="+data[i].id)

            let postBtn = document.createElement("button");
            postBtn.id = "readPost";
            postBtn.innerHTML = "Read more";

            postTextArea.appendChild(postTitle);
            postTextArea.appendChild(postText);
            postLink.appendChild(postBtn);
            postTextArea.appendChild(postLink);
            postObj.appendChild(postImg);
            postObj.appendChild(postTextArea);
            containerDiv.appendChild(postObj);
            latestObj.appendChild(containerDiv);
        }
        let next = document.createElement("button");
        next.innerHTML = ">";
        next.id = "navigationBtn";
        next.setAttribute("onclick","getPost(1)");
        let prev = document.createElement("button");
        prev.innerHTML = "<";
        prev.id = "navigationBtn";
        prev.setAttribute("onclick","getPost(-1)");

        navContainer.appendChild(prev);
        navContainer.appendChild(next);
        containerDiv.appendChild(navContainer);
    })
    .catch(function(error) {
        console.log(error);
        let contentObj = document.getElementById("latestContent");
        let errorObj = document.createElement("h2");
        errorObj.innerHTML = "Failed to load posts from extrernal website";
        contentObj.appendChild(errorObj);
    });
}

onload();

function getPost(id) {
    var key = "o4e5h1SNHZaP4vyOzcEIRmaA";
    const url = "https://rustelectrics.mrdigi.tv/wp-json/wp/v2/posts?_embed&Authorization=Bearer"+ key;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        let containerDiv = document.getElementById("container");
        containerDiv.remove();
        containerDiv = document.createElement("div");
        containerDiv.id = "container";
        let navContainer = document.createElement("navContainer");
        navContainer.id = "sliderNav";
        if (postID+id <= 3 && postID+id >= 0) {
            postID += id;
        } else {
            postID = 0;
        }
        let latestObj = document.getElementById("latestPosts");
        let postObj = document.createElement("div");
        postObj.id = "post";

        let postImg = document.createElement("img");
        postImg.src = data[postID]._embedded['wp:featuredmedia'][0].source_url;

        let postTextArea = document.createElement("div");
        postTextArea.id = "textArea";

        let postTitle = document.createElement("h1");
        postTitle.innerHTML = data[postID].title.rendered;

        let postText = document.createElement("text");
        let postString = data[postID].excerpt.rendered;
        postText.innerHTML = postString;

        let postLink = document.createElement("a");
        postLink.setAttribute("href","post.html?id="+data[postID].id)

        let postBtn = document.createElement("button");
        postBtn.id = "readPost";
        postBtn.innerHTML = "Read more";

        postTextArea.appendChild(postTitle);
        postTextArea.appendChild(postText);
        postLink.appendChild(postBtn);
        postTextArea.appendChild(postLink);
        postObj.appendChild(postImg);
        postObj.appendChild(postTextArea);
        containerDiv.appendChild(postObj);
        latestObj.appendChild(containerDiv);
        
        let next = document.createElement("button");
        next.innerHTML = ">";
        next.id = "navigationBtn";
        next.setAttribute("onclick","getPost(1)");
        let prev = document.createElement("button");
        prev.innerHTML = "<";
        prev.id = "navigationBtn";
        prev.setAttribute("onclick","getPost(-1)");

        navContainer.appendChild(prev);
        navContainer.appendChild(next);
        containerDiv.appendChild(navContainer);
    })
    .catch(function(error) {
        console.log(error);
        let contentObj = document.getElementById("latestContent");
        let errorObj = document.createElement("h2");
        errorObj.id = "error";
        errorObj.innerHTML = "Failed to load posts from extrernal website";
        contentObj.appendChild(errorObj);
    });
}