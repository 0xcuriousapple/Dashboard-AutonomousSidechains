window.onload = function () {
  var socket = io();

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

    block6r.href.baseVal = block5r.href.baseVal;
    block5r.href.baseVal = block4r.href.baseVal;
    block4r.href.baseVal = block3r.href.baseVal;
    block3r.href.baseVal = block2r.href.baseVal;
    block2r.href.baseVal = block1r.href.baseVal;
    block1r.href.baseVal = block0r.href.baseVal;
    block0r.href.baseVal = `./block?id=${id}`;
  }
  sidenewpos = 240;
  function sidechainUpdate(name, address, id) {
    var sidechain_anchor = this.document.getElementById("update_sidelist")
    sidenewpos = sidenewpos + 30;
    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var node = document.createTextNode(`${name} by ${address} local id :${id}`);
    cir1.appendChild(node);
    cir1.setAttribute("x", "0");
    cir1.setAttribute("y", sidenewpos);
    cir1.setAttribute("dy", ".35em");
    cir1.setAttribute("fill", "white");
    cir1.setAttribute("fill-opacity", ".70");
    sidechain_anchor.appendChild(cir1);

  }

  peernewpos = 870;
  function peerUpdate(address) {
    var peer_anchor = this.document.getElementById("update_peerlist")
    peernewpos = peernewpos + 30;
    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var node = document.createTextNode(`Address : ${address}`);
    cir1.appendChild(node);
    cir1.setAttribute("x", "1300");
    cir1.setAttribute("y", peernewpos);
    cir1.setAttribute("dy", ".35em");
    cir1.setAttribute("fill", "white");
    cir1.setAttribute("fill-opacity", ".70");
    peer_anchor.appendChild(cir1);

  }
  var blocks = document.getElementById("redblocks");
  var lastblock = document.getElementById("blockdis");
  playonce(lastblock);
  pause(blocks);
  playonce(blocks);

  sidechainUpdate("Example : Flipkart", "localhost:/4000", "4");


  // var source = new EventSource("../updates");
  // source.onmessage = function (event) {
  //   var obj = JSON.parse(event.data)
  //   console.log(obj);

  //   if (obj.type == "block") {
  //     playonce(blocks);
  //     playonce(lastblock);

  //     setTimeout(function () {
  //       shift(parseInt(obj.id));
  //     }, 1800);
  //   }
  //   if (obj.type == "side") {

  //     sidechainUpdate(obj.name, obj.address, obj.id);

  //   }
  //   if (obj.type == "peer") {

  //     peerUpdate(obj.address);

  //   }

  // }; //onMessage

  socket.on('chat message', function (msg) {
    var obj = msg;
    console.log(obj);

    if (obj.type == "block") {
      playonce(blocks);
      setTimeout(function () {
        playonce(lastblock);
      }, 1800);
      setTimeout(function () {
        shift(parseInt(obj.id));
      }, 1800);
    }
    if (obj.type == "side") {

      sidechainUpdate(obj.name, obj.address, obj.id);

    }
    if (obj.type == "peer") {

      peerUpdate(obj.address);

    }
  });





};
