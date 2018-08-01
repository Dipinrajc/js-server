console.log("Script Loaded");
"use strict";
!function () {
  console.log("Script Starts");
  var data;
  var fbUserId = null;
  var cssId = 'pCss';
  var likedIds = null;
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://127.0.0.1:4000/custom.css';
    link.media = 'all';
    head.appendChild(link);
  }


  var jsonpCall = function (url, data, callback) {
    var id = Math.round(100000 * Math.random());
    var callbackName = 'jsonp_callback_' + id;
    window[callbackName] = function (data) {
      console.log(data);
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
    var src = url + (url.indexOf("?") + 1 ? "&" : "?");
    var params = [];
    var param_name = "";
    data["callback"] = callbackName;
    for (param_name in data) {
      params.push(param_name + "=" + encodeURIComponent(data[param_name]));
    }
    src += params.join("&");
    var script = this.document.getElementById(id);
    if (null != script) {
      document.body.removeChild(script);
    }
    script = document.createElement('script');
    script.type = "text/javascript";
    script.id = id;
    script.async = true;
    script.src = src;
    document.body.appendChild(script);
  }

  var launch_toast = function (data, success) {
    var toastDiv = document.createElement("div");
    toastDiv.innerHTML = data;
    toastDiv.id = "snackbar";
    toastDiv.classList.add("show");
    if (success) {
      toastDiv.classList.add("success");
    } else {
      toastDiv.classList.add("error");
    }
    document.body.appendChild(toastDiv);
    setTimeout(function () { toastDiv.className = toastDiv.className.replace("show", ""); }, 3000);
  }

  window.Aniq = function (id, apiKey) {
    console.log("Constructor Called");
    data = { 'productId': id, 'apiKey': apiKey };
    getRating(id);
  }

  function getRating(productId) {
    console.log("Getting rating");
    var callback = function (response) {
      console.log(response);
      var rating = 0;
      if (response.success) {
        createButton(productId);
        rating = response.rating;
        if (rating) {
          document.getElementById("rateButton").setAttribute("value", "Rating " + rating);
        }
      } else {
        launch_toast(response.error, false);
      }
    };
    url = 'http://127.0.0.1:3000/get-rating';
    jsonpCall(url, data, callback);
  }

  function createButton(productId) {
    console.log("Creating Button");
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Rate Product";
    button.name = "Rate Product";
    button.onclick = function () {
      updateRating(productId);
    };
    button.id = "rateButton";
    button.className = "btn success btn-cls";
    var likeDiv = document.getElementById("likeDiv");
    if (likeDiv != null) {
      likeDiv.appendChild(button);
      console.log(likeDiv);
      console.log("Button Appended");
    } else {
      console.log("likeDiv not found");
    }
  }

  function updateRating(productId) {
    var callback = function (response) {
      console.log(response);
      if (response.success) {
        var resposeData = "<p>You have rated successfully";
        launch_toast(resposeData, true);
        var rating = response.rating;
        document.getElementById("rateButton").setAttribute("value", "Rating " + rating);
      } else {
        launch_toast(respose.error, false);
      }
    };

    url = 'http://127.0.0.1:3000/update-rating';
    jsonpCall(url, data, callback);
  }
}();
