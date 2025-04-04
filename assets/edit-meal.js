document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("drop-zone");
    const photoInput = document.getElementById("photoInput");
    const photoUrlInput = document.getElementById("photoUrl");
    const preview = document.getElementById("preview");
  
    dropZone.addEventListener("click", () => photoInput.click());
  
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });
  
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("dragover");
    });
  
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      handleFile(file);
    });
  
    photoInput.addEventListener("change", () => {
      const file = photoInput.files[0];
      handleFile(file);
    });
  
    function handleFile(file) {
      const reader = new FileReader();
      reader.onload = () => {
        preview.src = reader.result;
        photoUrlInput.value = reader.result;
      };
      reader.readAsDataURL(file);
    }
  
    const searchInput = document.getElementById("ingredientSearch");
    const allOptions = document.querySelectorAll(".ingredient-option");
  
    searchInput.addEventListener("input", () => {
      const search = searchInput.value.toLowerCase();
      allOptions.forEach(option => {
        const name = option.dataset.name;
        option.style.display = name.includes(search) ? "block" : "none";
      });
    });
  });
  