// assign values ✅
// a function for submitting and getting the values  ✅
// validate the values and showspinner if succesfull for 1000s and hidespinner ✅
// generate qr code function ✅
// clear ui function ✅
// create save button and download option

const qr = document.getElementById("qrcode");
const form = document.querySelector("#generate-form");

function submitForm(e){
    e.preventDefault()
    clearUi()
    const url = document.getElementById('url').value
    const size = document.getElementById("size").value
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
  if (isValidUrl(url) != true){
    alert("enter a valid url mf")
  } else {
    showSpinner()
    setTimeout(() => {
        hideSpinner();
        generateQR(url,size)

        setTimeout(() => {
          const saveUrl = qr.querySelector('img').src
          createSave(saveUrl)
        },50)
    }, 1000);
  }
}
const generateQR = (url,size) => {
    const qrcode =  new QRCode('qrcode',{
        text: url,
        width: size,
        height : size 
    })
}
const clearUi = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('linksave');
    if (saveBtn){
      saveBtn.remove()
    }
}

const showSpinner = () => {
    const spinner = document.getElementById("spinner")
    spinner.style.display = 'block';
}
const hideSpinner = () => {
    const spinner = document.getElementById("spinner")
    spinner.style.display = 'none';
}
const createSave = (saveUrl) => {
    const link = document.createElement('a')
    link.className = 'max-w-1/3 bg-red-500 text-white rounded mt-10 focus:outline-none self-center'
    link.id = "linksave"
    link.download = saveUrl
    link.href = saveUrl
    link.innerHTML = "Save Image"
    document.getElementById('generated').appendChild(link)
}
form.addEventListener("submit",submitForm)