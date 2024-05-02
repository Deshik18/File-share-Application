const body = document.querySelector('body')
const upload = document.querySelector('.upload')
const uploadButtonText = document.querySelector('.upload-button-text')
const uploadFilename = document.querySelector('.upload-filename')
const fileInput = document.getElementById('file')

fileInput.onchange = () => uploadFile(fileInput.files[0])

function uploadFile(file) {
    if (file) {
      // Add the file name to the input and change the button to an upload button
      uploadFilename.classList.remove('inactive')
      uploadFilename.innerText = file.name
      uploadButtonText.innerText = 'Upload'
      fileInput.remove()
      
      uploadButtonText.addEventListener("click", async () => {
        upload.classList.add("uploading")
        
        var formData = new FormData();
        formData.append('file', file);
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) {
            var percentComplete = (e.loaded / e.total) * 100;
            var progress = document.querySelector('.upload-progress');
            progress.style.width = percentComplete + '%';
          }
        };
        
        xhr.onload = function () {
          if (xhr.status === 200) {
            console.log('File uploaded successfully');
            // Display the response from process.php
            console.log(xhr.responseText);
            // Redirect to final.html with the folder name
            window.location.href = "final.html?folder=" + xhr.responseText;
            // Reset the input after a delay. For actual use, only remove the uploading class when the file is done uploading!
            setTimeout(() => {
              upload.classList.remove("uploading")
            }, 5000)
          } else {
            console.error('File upload failed');
          }
        };
        
        // Send the file to process.php
        xhr.send(formData);
      })
    }
  }  

// Drop stuff
const dropArea = document.querySelector('.drop-area')

// Remove unnecessary bubbling for drag events
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}


// Add dropArea bordering when dragging a file over the body
;['dragenter', 'dragover'].forEach(eventName => {
  body.addEventListener(eventName, displayDropArea, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  body.addEventListener(eventName, hideDropArea, false)
})


// Add dropArea highlighting when dragging a file over the dropArea itself
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})


function highlight(e) {
  if (!dropArea.classList.contains('highlight')) dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

function displayDropArea() {
  if (!dropArea.classList.contains('highlight')) dropArea.classList.add('droppable')
}

function hideDropArea() {
  dropArea.classList.remove('droppable')
}

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  let file = files[0]
  
  uploadFile(file)
}
