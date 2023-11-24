function onload() {
    const postID = new URLSearchParams(window.location.search).get("id");
    var key = "o4e5h1SNHZaP4vyOzcEIRmaA";
    const url = "https://rustelectrics.mrdigi.tv/wp-json?_embed&Authorization=Bearer"+ key;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        console.log(data);
        let titleArea = document.getElementById("titleArea");
        let slugBox = document.createElement("div");
        slugBox.id = "slug";

        let imgUrl = document.createElement("a");
        imgUrl.href = "index.html";

        let profileImg = document.createElement("img");
        profileImg.src = data._embedded['wp:featuredmedia'][0].source_url;

        imgUrl.appendChild(profileImg);
        titleArea.appendChild(imgUrl);

        let siteName = document.createElement("h1");
        siteName.innerHTML = data.name;

        let siteSlug = document.createElement("h3");
        siteSlug.innerHTML = data.description;

        slugBox.appendChild(siteName);
        slugBox.appendChild(siteSlug);
        titleArea.appendChild(slugBox);
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