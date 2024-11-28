//Variables globales

// Récupération de l'élément div avec la classe "gallery" dans le DOM
const gallery = document.querySelector('.gallery')

// Fonction pour ajuster les chemins des images et du fichier JSON en fonction de l'environnement
function adjustPathsForEnvironment(certificats) {
  const basePath = isGitHubPages ? '/Shadow_Project' : '' // Ajouter le préfixe pour GitHub Pages ou laisser vide pour le local

  certificats.forEach((certificat) => {
    // Ajuster les chemins des images pour chaque certificat
    certificat.src = basePath + certificat.src
    certificat.thumbnail = basePath + certificat.thumbnail
  })
}

// Fonction pour déterminer le chemin du fichier JSON en fonction de l'environnement
function getCertificatsPath() {
  return isGitHubPages
    ? '/Shadow_Project/assets/datas/certificats.json'
    : './assets/datas/certificats.json'
}

// Obtention du chemin correct du fichier JSON
const certificatsPath = getCertificatsPath()

fetch(certificatsPath)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur de Chargement du fichier JSON')
    }
    return response.json()
  })
  .then((certificats) => {
    adjustPathsForEnvironment(certificats)

    certificats.forEach((certificat) => {
      const items = document.createElement('div')
      items.classList.add('gallery__items')

      items.innerHTML = `
        <h3>${certificat.title}</h3>
        <img src="${certificat.thumbnail}" alt="${certificat.title}">
      `

      items.addEventListener('click', () => {
        viewCertificat(certificat)
      })

      gallery.appendChild(items)
    })
  })
  .catch((error) => {
    console.log('Erreur :', error)
  })

// Fonction pour afficher un certificat dans une modale
function viewCertificat(certificat) {
  const galleryOverlay = document.createElement('div')
  galleryOverlay.classList.add('gallery__overlay')

  const galleryModal = document.createElement('div')
  galleryModal.classList.add('gallery__modal')

  const galleryClose = document.createElement('i')
  galleryClose.classList.add('gallery__close', 'fa-solid', 'fa-xmark')

  galleryModal.innerHTML = `
    <img src="${certificat.src}" alt="${certificat.title}">
  `

  galleryModal.appendChild(galleryClose)
  gallery.appendChild(galleryOverlay)
  gallery.appendChild(galleryModal)

  galleryClose.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })

  galleryOverlay.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })
}
