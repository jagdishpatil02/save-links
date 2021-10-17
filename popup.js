// only allowed url will be added to history

allowedUrl = [
  {
    name: "https://stackoverflow.com/",
  },
  {
    name: "https://github.com/",
  },
  {
    name: "https://www.w3schools.com/",
  },
];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.storage.local.set({ key: tab }, function () {});
    allowedUrl.forEach((element) => {
      if (tab.url.includes(element.name)) {
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
