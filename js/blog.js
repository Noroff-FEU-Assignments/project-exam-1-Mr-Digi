let countedPosts = 0;
function onload() {
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
        let latestObj = document.getElementById("latestPosts");
        
        let containerDiv = document.createElement("div");
        containerDiv.id = "container";
        //4 latest posts
        for (var i=0; i < 10; i++) {
            let postObj = document.createElement("div");
            postObj.id = "post";

            let postImg = document.createElement("img");
            postImg.src = data[i]._embedded['wp:featuredmedia'][0].source_url;
            postImg.alt = data[i]._embedded['wp:featuredmedia'][0].alt_text;

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
            countedPosts++;
        }
        let showMore = document.createElement("button");
        showMore.id = "showMore";
        showMore.innerHTML = "Show more posts";
        showMore.setAttribute("onclick", "loadMore()");
        containerDiv.appendChild(showMore);
        document.getElementById("loading").style.display = "none";
    })
    .catch(function(error) {
        console.log(error);
        let contentObj = document.getElementById("latestContent");
        let errorObj = document.createElement("h2");
        errorObj.innerHTML = "Failed to load posts from extrernal website";
        contentObj.appendChild(errorObj);
    });
}

function loadMore() {
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
        let showMore = document.getElementById("showMore");
        showMore.remove();
        let latestObj = document.getElementById("latestPosts");
        let containerDiv = document.createElement("div");
        containerDiv.id = "container";
        let tempCount = countedPosts;
        //4 latest posts
        for (var i=countedPosts; i < tempCount+10; i++) {
            if (i >= data.length) {
                return;
            }

            let postObj = document.createElement("div");
            postObj.id = "post";

            let postImg = document.createElement("img");
            postImg.src = data[i]._embedded['wp:featuredmedia'][0].source_url;
            postImg.alt = data[i]._embedded['wp:featuredmedia'][0].alt_text;

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
            countedPosts++;
        }
        if (data.length > countedPosts) {
            let showMore = document.createElement("button");
            showMore.id = "showMore";
            showMore.innerHTML = "Show more posts";
            showMore.setAttribute("onclick", "loadMore()");
            containerDiv.appendChild(showMore);
        }
    })
    .catch(function(error) {
        console.log(error);
        let contentObj = document.getElementById("latestPosts");
        let errorObj = document.createElement("h2");
        errorObj.innerHTML = "Failed to load posts from extrernal website";
        contentObj.appendChild(errorObj);
    });
}

onload();