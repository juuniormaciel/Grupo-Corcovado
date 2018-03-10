let btnRequest = document.querySelector("#request")
btnRequest.addEventListener("click", (ev) => {
  let fileInput = document.querySelector("#imageFile")
  if (fileInput.files.length === 0) {
    alert("No File Selected!")
  } else {
    upload(fileInput.files[0], (err, obj) => {
      if (err) { 
        console.error(err)
        return;
      }
      console.log(obj)

      /* do somethig with the response */
      let result = document.querySelector("#result")
      let p = document.createElement("p")
      p.textContent = obj.data.link
      result.append(p)
    })
  }
})
  
let upload = function (file, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'https://api.imgur.com/3/image');
  xhr.setRequestHeader('Authorization', 'Client-ID XXXXXXXXXXXXXXX') /* <= Ir em https://apidocs.imgur.com/ para criar uma nova IMGUR CLIENT-ID */
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      callback(null, JSON.parse(xhr.responseText))
    } else {
      callback(xhr.error)
    }
  }
  let formData = new FormData()
  formData.append('image', file);
  xhr.send(formData)
}
