const request = new XMLHttpRequest()
request.open('GET', 'http://qq.com:8888/friends.json')
request.onreadystatechange = () => {
  if (request.readyState === 4) {
    if (request.status >= 200 && request.status < 300) {
      console.log(request.response)
    }
  }
}
request.send()
// window.xxx = (data) => {
//   console.log(data)
// }
// const random = Math.random()
// window[random] = (data) => {
//   console.log(data)
// }
// const script = document.createElement('script')
// script.src = `http://qq.com:8888/friends.js?functionName=${random}`
// // script.onload = () => {
// //   console.log(window.xxx)
// // }
// script.onload = () => {
//   script.remove()
// }
// document.body.appendChild(script)




// function jsonp(url) {
//   return new Promise((resolve, reject) => {
//     const random = Math.random();
//     window[random] = data => {
//       resolve(data);
//     };
//     const script = document.createElement("script");
//     script.src = `${url}?callback=${random}`;
//     script.onload = () => {
//       script.remove();
//     };
//     script.onerror = () => {
//       reject();
//     };
//     document.body.appendChild(script);
//   });
// }


// jsonp('http://qq.com:8888/friends.js').then((data) => {
//   console.log(data)
// })