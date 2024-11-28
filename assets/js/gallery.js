// Détection de l'environnement (GitHub Pages ou local)
const isGitHubPages = window.location.hostname === 'Thierry-E.github.io' // Vérifie si on est sur GitHub Pages

// Fonction pour ajuster les chemins des images en fonction de l'environnement
function adjustPathsForEnvironment(certificats) {
  const basePath = isGitHubPages ? '/Shadow_Project' : '' // Ajouter le préfixe pour GitHub Pages ou laisser vide pour le local

  certificats.forEach((certificat) => {
    // Ajuster les chemins des images pour chaque certificat
    certificat.src = basePath + certificat.src
    certificat.thumbnail = basePath + certificat.thumbnail
  })
}

// Import du fichier de données JSON (certificats)
const certificatsPath = './assets/datas/certificats.json'

// Récupération de l'élément div avec la classe "gallery" dans le DOM
const gallery = document.querySelector('.gallery')

fetch(certificatsPath)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur de Chargement du fichier JSON')
    }
    return response.json()
  })
  .then((certificats) => {
    // Ajuster les chemins des images avant de les utiliser
    adjustPathsForEnvironment(certificats)

    // Traitement des données : ajout des certificats dans la galerie
    certificats.forEach((certificat) => {
      const items = document.createElement('div')
      items.classList.add('gallery__items')

      // Ajouter les données de chaque certificat
      items.innerHTML = `
        <h3>${certificat.title}</h3>
        <img src="${certificat.thumbnail}" alt="${certificat.title}">
      `

      // Ajouter un écouteur d'événements pour afficher le certificat dans une modale lorsqu'on clique
      items.addEventListener('click', () => {
        viewCertificat(certificat)
      })

      // Ajouter le certificat à la galerie
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

  // Fermer la modale au clic sur la croix
  galleryClose.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })

  // Fermer la modale au clic sur l'overlay
  galleryOverlay.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })
}
