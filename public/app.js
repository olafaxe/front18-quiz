//******Imports*****//
//*********************//

import { articleHandler, formHandler, hitBottom } from "/articleUtils.js";
import { container, content, addbtn } from "/selectors.js";

//Global variables checks
//*********************//

let addfailsafe = false;
let scrollLock = false;
let startPos = 1;
let dbBuffer = [];

let articleObj = function(id, title, content, answer, author) {
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
  this.answer = answer;
  this.author = author;
  this.created = new Date();
};

//on start-up function
updateArticles(articleHandler, "?_limit=4");

//****FUNCTIONS****//
//*****************//

function updateArticles(callback, scroll, pass, generate) {
  let passer = pass || false;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", `/articles/${scroll}`);
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
      if (generate) {
        callback(responseObj, true, scrollLock);
      } else {
        callback(responseObj, false, scrollLock);
      }

      fetch("/articles")
        .then(res => res.json())
        .then(articles =>
          articles.forEach(article => {
            if (!dbBuffer.includes(article.id)) {
              dbBuffer.push(article.id);
            }
          })
        );
    }
  };
}

function editArticle(editedArt, oldArticleId) {
  let DOMarticle = document.querySelectorAll(".article-container");
  DOMarticle.forEach(e => {
    if (oldArticleId === Number(e.firstChild.innerText)) {
      e.remove();
      return;
    }
  });
  let fakeobj = [];

  fakeobj.push(editedArt);
  articleHandler(fakeobj);
}

function checkArticles(dbContent) {
  dbContent.forEach(e => {
    if (dbBuffer.includes(e.id)) {
      return;
    } else {
      let articles = document.querySelectorAll(".article-container");
      let add = 0;
      articles.forEach(e => {
        add++;
      });
      console.log(add);
      if (add < 4 || hitBottom) {
        let art = new articleObj(e.id, e.title, e.content, e.answer, e.author);
        let fakeobj = [];
        fakeobj.push(art);
        articleHandler(fakeobj, false, scrollLock, hitBottom);
      }
    }
  });
}

function addNews(tit, cont, ans, auth) {
  let id;
  let news = new articleObj(id, tit, cont, ans, auth);
  let newsjson = JSON.stringify(news);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/articles/");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(newsjson);
}

//****EVENT LISTENERS****//
//***********************//

window.addEventListener("click", e => {
  if (e.target.classList.contains("article-answer")) {
    let button = e.target;
    let answer = button.nextSibling;
    answer.classList.toggle("display-none");
    button.classList.toggle("display-none");
  }
});

addbtn.addEventListener("click", e => {
  addbtn.classList.add("click");
  setTimeout(() => {
    addbtn.classList.remove("click");
  }, 500);
  if (addfailsafe === false) {
    let articleId;
    formHandler(articleId, "Add question!", "Boom! QUIZZED.", "submit-add");
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
  //Get values from form inputs
  if (e.target.classList.contains("input-submit")) {
    let inputcontainer = document.querySelector(".input-container");
    let inputTitle = document.querySelector(".input-title").value;
    let inputContent = document.querySelector(".input-content").value;
    let inputAnswer = document.querySelector(".answer-content").value;
    let inputAuthor = document.querySelector(".input-author").value;
    event.preventDefault();
    //when submit, if making new article do this
    if (e.target.classList.contains("submit-add")) {
      addNews(inputTitle, inputContent, inputAnswer, inputAuthor);
      inputcontainer.remove();
      updateArticles(checkArticles, "", true, true);
      addfailsafe = false;
    }
    //when submit, if edit article do this
    else if (e.target.classList.contains("submit-edit")) {
      let update = true;
      let articleId = Number(e.target.parentNode.firstChild.innerText);
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `/articles/`);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send();
      xhr.onload = function() {
        let responseObj = JSON.parse(xhr.response);
        if (xhr.status != 200) {
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
          responseObj.forEach(e => {
            if (e.id === articleId) {
              let news = new articleObj(
                e.id,
                inputTitle,
                inputContent,
                inputAnswer,
                inputAnswer,
                inputAuthor
              );
              let newsjson = JSON.stringify(news);
              let xhr = new XMLHttpRequest();
              xhr.open("PUT", `/articles/${articleId}`);
              xhr.setRequestHeader("Content-type", "application/json");
              xhr.send(newsjson);
              xhr.onload = function() {
                let responseObj = JSON.parse(xhr.response);
                if (xhr.status != 200) {
                  alert(`Error ${xhr.status}: ${xhr.statusText}`);
                } else {
                  editArticle(responseObj, e.id);
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
    xhr.open("GET", "/articles/");
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
            xhr.open("DELETE", `/articles/${selectedArticle}`);
            xhr.send();
            xhr.onload = function() {
              articleDom.remove();
              let articles = document.querySelectorAll(".article-container");
              let add = 0;
              articles.forEach(e => {
                add++;
              });
              if (add < 4) {
                updateArticles(
                  articleHandler,
                  `?_start=${startPos}&_limit=3`,
                  true,
                  true
                );
              }
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
    xhr.open("GET", "/articles/");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onload = function() {
      let responseObj = JSON.parse(xhr.response);
      responseObj.forEach(e => {
        if (e.id === articleId) {
          formHandler(
            articleId,
            "Edit question!",
            "Boom! RE-QUIZZED.",
            "submit-edit",
            e.title,
            e.content,
            e.answer,
            e.author
          );
        }
      });
    };
  }
});

content.addEventListener("scroll", e => {
  if (hitBottom) {
    return;
  }
  if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
    startPos = startPos + 3;
    updateArticles(articleHandler, `?_start=${startPos}&_limit=3`, true, true);
  }
});

content.addEventListener("touchmove", e => {
  if (hitBottom) {
    return;
  }
  if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
    startPos = startPos + 3;
    updateArticles(articleHandler, `?_start=${startPos}&_limit=3`, true, true);
  }
});
