/**
 * @param {File} file
 * @param {HTMLImageElement} imageElement
 */
function previewImage(file, imageElement) {
  if (!file || !file.type.startsWith("image/")) {
    console.error("Arquivo selecionado não é uma imagem válida.");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    imageElement.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

function initProfilePage() {
  const photoUploadInput = document.getElementById("photo-upload");
  const profileImage = document.getElementById("profile-image");

  if (photoUploadInput && profileImage) {
    /**
     * @param {Event} event O objeto do evento.
     */
    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        previewImage(file, profileImage);
      }
    };

    photoUploadInput.addEventListener("change", handlePhotoUpload);
  }
}

document.addEventListener("DOMContentLoaded", initProfilePage);
