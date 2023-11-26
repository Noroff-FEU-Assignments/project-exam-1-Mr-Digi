function onload() {
    var key = "o4e5h1SNHZaP4vyOzcEIRmaA";
    const url = "https://rustelectrics.mrdigi.tv/wp-json/wp/v2/pages?_embed&Authorization=Bearer"+ key;
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
        for (var i=0; i < data.length; i++) {
            console.log(data[i]);
            if (data[i].slug== "about") {
                let postObj = document.createElement("div");
                postObj.id = "post";

                let sectionHead = document.createElement("h1");
                sectionHead.id = "aboutTitle";
                sectionHead.innerHTML = data[i].title.rendered;

                let postImg = document.createElement("img");
                postImg.src = data[i]._embedded['wp:featuredmedia'][0].source_url;
                postImg.alt = data[i]._embedded['wp:featuredmedia'][0].alt_text;
                postImg.setAttribute("onclick","openModal()");

                let modalImg = document.createElement("img");
                modalImg.src = postImg.src;
                modalImg.alt = postImg.alt;
                modalObj.appendChild(modalImg);

                let postTextArea = document.createElement("div");
                postTextArea.id = "textAreaPost";

                let postText = document.createElement("text");
                let postString = data[i].content.rendered;
                postText.innerHTML = postString;

                postTextArea.appendChild(sectionHead);
                postTextArea.appendChild(postText);
                postObj.appendChild(postImg);
                postObj.appendChild(postTextArea);
                contentObj.appendChild(postObj);
            }
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