window.onload = function () {
  function playonce(element) {
    element.style.animationPlayState = "running";
    element.style.webkitAnimationPlayState = "running";
    setTimeout(function () {
      element.style.animationPlayState = "paused";
      element.style.webkitAnimationPlayState = "paused";
    }, 4000);
  }
  function pause(element) {
    element.style.animationPlayState = "paused";
    element.style.webkitAnimationPlayState = "paused";
  }

  function shift(id) {
    var block0t = document.getElementById("block-0t");
    var block1t = document.getElementById("block-1t");
    var block2t = document.getElementById("block-2t");
    var block3t = document.getElementById("block-3t");
    var block4t = document.getElementById("block-4t");
    var block5t = document.getElementById("block-5t");
    var block6t = document.getElementById("block-6t");

    var block0r = document.getElementById("block-0r");
    var block1r = document.getElementById("block-1r");
    var block2r = document.getElementById("block-2r");
    var block3r = document.getElementById("block-3r");
    var block4r = document.getElementById("block-4r");
    var block5r = document.getElementById("block-5r");
    var block6r = document.getElementById("block-6r");

    block6t.innerHTML = block5t.innerHTML;
    block5t.innerHTML = block4t.innerHTML;
    block4t.innerHTML = block3t.innerHTML;
    block3t.innerHTML = block2t.innerHTML;
    block2t.innerHTML = block1t.innerHTML;
    block1t.innerHTML = block0t.innerHTML;
    block0t.innerHTML = `Block-${id}`;

    block6r.href = block5t.href;
    block5r.href = block4t.href;
    block4r.href = block3t.href;
    block3r.href = block2r.href;
    block2r.href = block1r.href;
    block1r.href = block0r.href;
    block0r.href = `./block?id=${id}`;
  }
  var blocks = document.getElementById("redblocks");
  var firstblock = document.getElementById("firstBlock");
  var lastblock = document.getElementById("blockdis");
  var block0 = document.getElementById("block-0");
  var block1 = document.getElementById("block-1");
  var block2 = document.getElementById("block-2");

  //lastblock.style.visibility = "hidden";
  playonce(lastblock);
  pause(blocks);
  playonce(blocks);
  //block1.style.visibility = "visible";
  //playonce(firstblock);

  var source = new EventSource("../updates");
  source.onmessage = function (event) {
    console.log(event.data);
    obj = JSON.parse(event.data);
    console.log(obj);
    playonce(blocks);
    playonce(lastblock);
    setTimeout(function () {
      shift(parseInt(obj.id));
    }, 1800);
    // block2.style.visibility = "visible";
  }; //onMessage
};
