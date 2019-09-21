let container = document.querySelector(".container");
let content = document.querySelector(".content");
let addbtn = document.querySelector(".add-btn-container");

let addfailsafe = false;
let update = false;
let scrollLock = false;
let startPos = 1;

let dbBuffer = [];

let obj = function(id, title, content, author) {
  if (typeof id === "undefined") {
    this.id = Number(
      Math.random()
        .toString()
        .slice(2)
    );
  } else {
    this.id = id;
  }

  this.title = title;
  this.content = content;
  this.author = author;
  this.created = new Date().toUTCString();
};

updateArticles(createArticleElement, "?_limit=4");

function updateArticles(callback, scroll, pass) {
  let passer = pass || true;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3000/articles/${scroll}`);
  xhr.send();
  xhr.onload = function() {
    let responseObj = JSON.parse(xhr.response);
    let articles = document.querySelectorAll(".article-container");
    articles.forEach(ele => {
      responseObj.forEach(e => {
        if (e.id === Number(ele.firstChild.innerText && !passer)) {
          scrollLock = true;
        }
      });
    });

    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      callback(responseObj, update);
      let articles = document.querySelectorAll(".article-container");
      articles.forEach(e => {
        if (!dbBuffer.includes(Number(e.firstChild.innerText))) {
          dbBuffer.push(Number(e.firstChild.innerText));
        }
      });
    }
  };
}

function editedArticle(editedArt, oldArticleId) {
  let DOMarticle = document.querySelectorAll(".article-container");
  DOMarticle.forEach(e => {
    if (oldArticleId === Number(e.firstChild.innerText)) {
      e.remove();
      return;
    }
  });
  let fakeobj = [];

  fakeobj.push(editedArt);
  createArticleElement(fakeobj);
}
function checkArticles(dbContent) {
  dbContent.forEach(e => {
    if (dbBuffer.includes(e.id)) {
      return;
    } else {
      let art = new obj(e.id, e.title, e.content, e.author);
      let fakeobj = [];
      fakeobj.push(art);
      createArticleElement(fakeobj);
    }
  });
}

function createArticleElement(dbContent) {
  if (scrollLock) {
    return;
  }
  dbContent.forEach(element => {
    let date = new Date(element.created).toUTCString();
    content = document.querySelector(".content");

    let article = document.createElement("article");
    article.setAttribute("class", "article-container");
    content.appendChild(article);

    let idTag = document.createElement("div");
    idTag.setAttribute("class", "article-id");
    idTag.innerText = element.id;
    article.appendChild(idTag);

    let upperDiv = document.createElement("div");
    upperDiv.setAttribute("class", "article-upper");
    article.appendChild(upperDiv);

    let titleTag = document.createElement("h1");
    titleTag.innerText = element.title;
    titleTag.setAttribute("class", "article-title");
    upperDiv.appendChild(titleTag);

    let editBtn = document.createElement("div");
    editBtn.setAttribute("class", "article-edit far fa-edit");
    upperDiv.appendChild(editBtn);

    let authorTag = document.createElement("span");
    authorTag.innerText = element.author;
    authorTag.setAttribute("class", "article-author");
    article.appendChild(authorTag);

    let createdTag = document.createElement("span");
    createdTag.innerText = date;
    createdTag.setAttribute("class", "article-created");
    article.appendChild(createdTag);

    let contentTag = document.createElement("p");
    contentTag.innerText = element.content;
    contentTag.setAttribute("class", "article-content");
    article.appendChild(contentTag);

    let removeArticleDiv = document.createElement("div");
    removeArticleDiv.setAttribute("class", "article-remove fas fa-trash-alt");
    article.appendChild(removeArticleDiv);
  });
  scrollLock = false;
}

function createInputElement(
  articleId,
  type,
  btnName,
  submitType,
  titDef,
  contDef,
  authDef
) {
  let defaultTitle = titDef || "";
  let defaultContent = contDef || "";
  let defaultAuthor = authDef || "";

  let inputcontainer = document.createElement("div");
  inputcontainer.setAttribute("class", "input-container");
  container.appendChild(inputcontainer);

  let inputFieldset = document.createElement("fieldset");
  inputFieldset.setAttribute("class", "input-fieldset");
  inputcontainer.appendChild(inputFieldset);

  let inputLegend = document.createElement("legend");
  inputLegend.innerText = type;
  inputFieldset.appendChild(inputLegend);

  let inputCloseBtn = document.createElement("div");
  inputCloseBtn.setAttribute("class", "input-close fas fa-times");
  inputFieldset.appendChild(inputCloseBtn);

  let inputForm = document.createElement("form");
  inputForm.setAttribute("class", "input-form");
  inputForm.setAttribute("id", "news-form");

  inputFieldset.appendChild(inputForm);

  let inputTitleDiv = document.createElement("div");
  inputTitleDiv.setAttribute("class", "input-container");

  inputForm.appendChild(inputTitleDiv);

  let inputTitleLabel = document.createElement("label");
  inputTitleLabel.setAttribute("class", "title-label");
  inputTitleLabel.setAttribute("for", "title");
  inputTitleLabel.innerText = "Title: ";
  inputTitleDiv.appendChild(inputTitleLabel);

  let inputTitle = document.createElement("input");
  inputTitle.setAttribute("class", "input-title");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "title");
  inputTitle.setAttribute("name", "title");
  inputTitle.setAttribute("value", defaultTitle);
  inputTitleDiv.appendChild(inputTitle);

  let inputContentDiv = document.createElement("div");
  inputContentDiv.setAttribute("class", "input-container");
  inputForm.appendChild(inputContentDiv);

  let inputContentLabel = document.createElement("label");
  inputContentLabel.setAttribute("class", "content-label");
  inputContentLabel.setAttribute("for", "content");
  inputContentLabel.innerText = "Content: ";
  inputContentDiv.appendChild(inputContentLabel);

  let inputContent = document.createElement("textarea");
  inputContent.setAttribute("class", "input-content");
  inputContent.setAttribute("cols", "30");
  inputContent.setAttribute("rows", "5");
  inputContent.setAttribute("form", "news-form");
  inputContent.setAttribute("type", "textarea");
  inputContent.setAttribute("id", "content");
  inputContent.setAttribute("name", "content");
  inputContent.innerText = defaultContent;
  inputContentDiv.appendChild(inputContent);

  let inputAuthorDiv = document.createElement("div");
  inputAuthorDiv.setAttribute("class", "input-container");
  inputForm.appendChild(inputAuthorDiv);

  let inputAuthorLabel = document.createElement("label");
  inputAuthorLabel.setAttribute("class", "author-label");
  inputAuthorLabel.setAttribute("for", "author");
  inputAuthorLabel.innerText = "Author: ";
  inputAuthorDiv.appendChild(inputAuthorLabel);

  let inputAuthor = document.createElement("input");
  inputAuthor.setAttribute("class", "input-author");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("id", "author");
  inputAuthor.setAttribute("name", "author");
  inputAuthor.setAttribute("value", defaultAuthor);
  inputAuthorDiv.appendChild(inputAuthor);

  let inputSubmitDiv = document.createElement("div");
  inputSubmitDiv.setAttribute("class", "input-container");
  inputForm.appendChild(inputSubmitDiv);

  let articleDiv = document.createElement("div");
  articleDiv.setAttribute("class", "article-id");
  articleDiv.innerText = articleId;
  inputSubmitDiv.appendChild(articleDiv);

  let inputSubmit = document.createElement("button");
  inputSubmit.setAttribute("class", `input-submit ${submitType}`);
  inputSubmit.setAttribute("id", "submit");
  inputSubmit.setAttribute("name", "submit");
  inputSubmit.innerText = btnName;
  inputSubmitDiv.appendChild(inputSubmit);
}

function addNews(tit, cont, auth) {
  let id;
  let news = new obj(id, tit, cont, auth);
  let newsjson = JSON.stringify(news);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/articles/");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(newsjson);
}

addbtn.addEventListener("click", e => {
  addbtn.classList.add("click");
  setTimeout(() => {
    addbtn.classList.remove("click");
  }, 500);
  if (addfailsafe === false) {
    let articleId;
    createInputElement(articleId, "Make News!", "Boom! News.", "submit-add");
    addfailsafe = true;
  } else {
    return;
  }
});

container.addEventListener("click", e => {
  let inputcontainer = document.querySelector(".input-container");
  if (e.target.classList.contains("input-close")) {
    inputcontainer.remove();
    addfailsafe = false;
  }
});

container.addEventListener("click", e => {
  if (e.target.classList.contains("input-submit")) {
    let inputcontainer = document.querySelector(".input-container");
    let inputTitle = document.querySelector(".input-title").value;
    let inputContent = document.querySelector(".input-content").value;
    let inputAuthor = document.querySelector(".input-author").value;
    event.preventDefault();
    if (e.target.classList.contains("submit-add")) {
      addNews(inputTitle, inputContent, inputAuthor);
      inputcontainer.remove();
      updateArticles(checkArticles, "", true);
      addfailsafe = false;
    } else if (e.target.classList.contains("submit-edit")) {
      update = true;
      let articleId = Number(e.target.parentNode.firstChild.innerText);
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `http://localhost:3000/articles/`);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send();
      xhr.onload = function() {
        let responseObj = JSON.parse(xhr.response);
        if (xhr.status != 200) {
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
          responseObj.forEach(e => {
            if (e.id === articleId) {
              let news = new obj(e.id, inputTitle, inputContent, inputAuthor);
              let newsjson = JSON.stringify(news);
              let xhr = new XMLHttpRequest();
              xhr.open("PUT", `http://localhost:3000/articles/${articleId}`);
              xhr.setRequestHeader("Content-type", "application/json");
              xhr.send(newsjson);
              xhr.onload = function() {
                let responseObj = JSON.parse(xhr.response);
                if (xhr.status != 200) {
                  alert(`Error ${xhr.status}: ${xhr.statusText}`);
                } else {
                  editedArticle(responseObj, e.id);
                  inputcontainer.remove();
                  addfailsafe = false;
                }
              };
            }
          });
        }
      };
    }
  }
});

container.addEventListener("click", e => {
  if (e.target.classList.contains("article-remove")) {
    let articleDom = e.target.parentNode;
    let articleId = Number(e.target.parentNode.firstChild.innerText);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/articles/");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onload = function() {
      let responseObj = JSON.parse(xhr.response);
      if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        responseObj.forEach(e => {
          if (e.id === articleId) {
            let selectedArticle = e.id;
            xhr.open(
              "DELETE",
              `http://localhost:3000/articles/${selectedArticle}`
            );
            xhr.send();
            xhr.onload = function() {
              articleDom.remove();
            };
          }
        });
      }
    };
  }
});

container.addEventListener("click", e => {
  if (e.target.classList.contains("article-edit")) {
    let firstparent = e.target.parentNode;
    let articleId = Number(firstparent.parentNode.firstChild.innerText);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/articles/");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onload = function() {
      let responseObj = JSON.parse(xhr.response);
      responseObj.forEach(e => {
        if (e.id === articleId) {
          createInputElement(
            articleId,
            "Edit News!",
            "Boom! Edited.",
            "submit-edit",
            e.title,
            e.content,
            e.author
          );
        }
      });
    };
  }
});

content.addEventListener("scroll", e => {
  if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
    startPos = startPos + 3;
    updateArticles(createArticleElement, `?_start=${startPos}&_limit=3`, false);
  }
});
