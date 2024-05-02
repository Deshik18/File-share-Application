function copy() {
    let copyText = document.getElementById("copyClipboard");
    let copySuccess = document.getElementById("copied-success");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    
   copySuccess.style.opacity = "1";
   setTimeout(function(){ copySuccess.style.opacity = "0" }, 500);
  }