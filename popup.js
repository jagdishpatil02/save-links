// only allowed url will be added to history

allowedUrls = [
  {
    link: "https://stackoverflow.com/",
  },
  {
    link: "https://github.com/",
  },
  {
    link: "https://www.freecodecamp.org/",
  },
  {
    link: "https://www.freecodecamp.org/",
  },
  {
    link: "https://www.geeksforgeeks.org/",
  },
  {
    link: "https://www.mozilla.org/",
  },
];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.storage.local.set({ key: tab }, function () {});
    allowedUrls.forEach((element) => {
      if (tab.url.includes(element.link)) {
        chrome.storage.local.get(["key"], function (result) {
          // arr.push(result);
          // console.log("arr", arr);
          // const unique = [...new Set(arr.map((item) => item.key.url))];
          // console.log("unique", unique);
          currentTime = new Date().toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          });
          const box = document.getElementById("playGround");
          // time of visited link

          const timeWrapper = document.createElement("div");
          timeWrapper.classList.add("col-md-2");
          timeWrapper.innerText = currentTime;
          box.appendChild(timeWrapper);

          // image of visited link
          const siteImgWrapper = document.createElement("div");
          siteImgWrapper.classList.add("col-md-1");
          const img = document.createElement("img");
          img.src = result.key.favIconUrl;
          siteImgWrapper.appendChild(img);
          box.appendChild(siteImgWrapper);

          // title and link of visited link
          const siteWrapper = document.createElement("div");
          siteWrapper.classList.add("col-md-9");
          const siteLink = document.createElement("a");
          siteLink.href = result.key.url;
          siteLink.innerText = result.key.title;
          siteWrapper.appendChild(siteLink);
          box.appendChild(siteWrapper);
        });
      }
    });
  }
});
document.getElementById("addUrl").addEventListener("click", function () {
  addUrl();
});
function addUrl() {
  let currentVal = document.getElementById("customUrl").value;
  if (currentVal == "") {
    alert("Please enter URL");
    return false;
  }
  let checkUrlValid = validURL(currentVal);
  if (checkUrlValid) {
    let toSearch = { link: currentVal };
    let checkIfUrlExist = allowedUrls.some((item) =>
      shallowEqual(item, toSearch)
    );
    if (checkIfUrlExist) {
      alert("URL already exists");
    } else {
      this.allowedUrls.push({ link: currentVal });
      listAllUrls();
    }
  } else {
    alert("Please enter Valid URL");
  }
}

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

function validURL(myURL) {
  var pattern = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  );
  return pattern.test(myURL);
}

function listAllUrls() {
  const currentUrls = document.getElementById("currentUrls");

  while (currentUrls.firstChild) {
    currentUrls.removeChild(currentUrls.firstChild);
  }
  allowedUrls.forEach((element) => {
    let item = document.createElement("li");
    let tag = document.createElement("a");
    let emoji = document.createElement("span");
    emoji.innerText = "🌻";
    tag.innerText = element.link;
    tag.setAttribute("target", "_blank");
    tag.setAttribute("href", element.link);
    tag.className = "ml-2 d-inline-block";
    item.prepend(emoji);
    item.appendChild(tag);
    currentUrls.appendChild(item);
  });
}

listAllUrls();
