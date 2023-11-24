console.log("works");
function onload() {
    var key = "o4e5h1SNHZaP4vyOzcEIRmaA";
    var secret = "cs_8181a9be3fd8795bd757e3ec790723d7aada9951";
    const url = "https://rustelectrics.mrdigi.tv/wp-json/wp/v2/posts?Authorization=Bearer"+ key;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        let contentObj = document.getElementById("latestContent");
        for (var i=0; i < data.length; i++) {
            console.log(data[i]);
            let postObj = document.createElement("div");
            postObj.id = "post";

            let postImg = document.createElement("img");
            postImg.src = "#";

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
            postBtn.innerHTML = "Read me";

            postTextArea.appendChild(postTitle);
            postTextArea.appendChild(postText);
            postLink.appendChild(postBtn);
            postTextArea.appendChild(postLink);
            postObj.appendChild(postImg);
            postObj.appendChild(postTextArea);
            contentObj.appendChild(postObj);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

onload();