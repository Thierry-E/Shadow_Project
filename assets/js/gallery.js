// Import du fichier JSON "projets"
const certificats = './assets/datas/certificats.json'

// Variables globales
const gallery = document.querySelector('.gallery')

// Fonction pour ajuster les chemins des images en fonction de l'environnement
function adjustPathsForGitHubPages(certificats) {
  // Détection si nous sommes sur GitHub Pages (en fonction du hostname)
  const isGitHubPages = window.location.hostname === 'username.github.io' // Remplacez 'username' par votre nom d'utilisateur GitHub

  if (isGitHubPages) {
    // Si nous sommes sur GitHub Pages, ajouter /Shadow_Project/ avant les chemins
    const basePath = '/Shadow_Project' // Remplacez Shadow_Project par le nom de votre dépôt GitHub

    certificats.forEach((certificat) => {
      certificat.src = basePath + certificat.src
      certificat.thumbnail = basePath + certificat.thumbnail
    })
  }
}

// Récupérer les certificats depuis le fichier JSON
fetch(certificats)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur de Chargement du fichier JSON')
    }
    return response.json()
  })
  .then((certificats) => {
    // Ajuste les chemins des images en fonction de l'environnement
    adjustPathsForGitHubPages(certificats)

    // Création des éléments HTML pour chaque certificat
    certificats.forEach((certificat) => {
      const items = document.createElement('div')
      items.classList.add('gallery__items')

      items.innerHTML = `
        <h3>${certificat.title}</h3>
        <img src="${certificat.thumbnail}" alt="${certificat.title}">
      `

      // Écouteur d'événement pour afficher un certificat dans une modale
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
