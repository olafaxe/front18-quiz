import { container, content } from "/selectors.js";

export let hitBottom = false;

//****CREATION FUNCTIONS****//
//**************************//

export function articleHandler(dbContent, generate, scrollLock) {
  if (dbContent.length === 0) {
    hitBottom = true;
  }
  generate = true;
  if (scrollLock) {
    return;
  }
  dbContent.forEach(element => {
    let dated = new Date(element.created).toLocaleDateString();
    let datet = new Date(element.created).toLocaleTimeString();
    let date = `${dated}  (${datet})`;
    // content = document.querySelector(".content");

    let article = document.createElement("article");
    article.setAttribute("class", "article-container");
    if (generate) {
      content.appendChild(article);
    }
    // else if (!generate) {
    //   content.insertBefore(article, content.childNodes[0]);
    // }
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

    let contentTag = document.createElement("h3");
    contentTag.innerText = element.content;
    contentTag.setAttribute("class", "article-content");
    article.appendChild(contentTag);

    let showAnswer = document.createElement("input");
    showAnswer.setAttribute("class", "article-answer");
    showAnswer.setAttribute("type", "button");
    showAnswer.setAttribute("value", "SHOW ANSWER");
    article.appendChild(showAnswer);

    let contentAnswerTag = document.createElement("h3");
    contentAnswerTag.innerText = element.answer;
    contentAnswerTag.setAttribute(
      "class",
      "article-content_answer display-none"
    );
    article.appendChild(contentAnswerTag);

    let removeArticleDiv = document.createElement("div");
    removeArticleDiv.setAttribute(
      "class",
      "article-remove fas fa-trash-alt display-none"
    );
    article.appendChild(removeArticleDiv);
  });
  scrollLock = false;
}

export function formHandler(
  articleId,
  type,
  btnName,
  submitType,
  titDef,
  contDef,
  ansDef,
  authDef
) {
  let defaultTitle = titDef || "";
  let defaultContent = contDef || "EXPLAIN! (ノಠ益ಠ)ノ";
  let defaultAnswer = ansDef || "No answer yet!";
  let defaultAuthor = authDef || "El Presidente";

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
  inputTitleLabel.innerText = "Question headline: ";
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
  inputContentLabel.innerText = "Question text: ";
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

  let inputAnswerDiv = document.createElement("div");
  inputAnswerDiv.setAttribute("class", "input-container");
  inputForm.appendChild(inputAnswerDiv);

  let inputAnswerLabel = document.createElement("label");
  inputAnswerLabel.setAttribute("class", "input-label");
  inputAnswerLabel.setAttribute("for", "answer");
  inputAnswerLabel.innerText = "Answer: ";
  inputAnswerDiv.appendChild(inputAnswerLabel);

  let inputAnswer = document.createElement("textarea");
  inputAnswer.setAttribute("class", "answer-content");
  inputAnswer.setAttribute("cols", "30");
  inputAnswer.setAttribute("rows", "5");
  inputAnswer.setAttribute("form", "news-form");
  inputAnswer.setAttribute("type", "textarea");
  inputAnswer.setAttribute("id", "answer");
  inputAnswer.setAttribute("name", "answer");
  inputAnswer.innerText = defaultAnswer;
  inputAnswerDiv.appendChild(inputAnswer);

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
