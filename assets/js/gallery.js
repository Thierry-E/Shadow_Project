// Détection de l'environnement (GitHub Pages ou local)
const isGitHubPages = window.location.hostname === 'Thierry-E.github.io'
// Fonction pour ajuster les chemins en fonction de l'environnement
function adjustPathsForEnvironment() {
  if (isGitHubPages) {
    // Ajouter le préfixe du nom du dépôt pour GitHub Pages
    const paths = document.querySelectorAll('link[href], script[src], img[src]')
    paths.forEach((path) => {
      let src = path.getAttribute('src') || path.getAttribute('href')
      if (src && !src.startsWith('http')) {
        const adjustedSrc = '/Shadow_Project' + src // Remplace '/Shadow_Project' par le nom de ton dépôt
        path.setAttribute('src', adjustedSrc)
        path.setAttribute('href', adjustedSrc)
      }
    })
  }
}

// Appel de la fonction pour ajuster les chemins
adjustPathsForEnvironment()

// Import du fichier de données JSON (certificats)
const certificats = './assets/datas/certificats.json' // Ce chemin restera le même, ajusté par la fonction si nécessaire

// Récupération de l'élément Div avec la classe "gallery" dans le document HTML ou DOM.
const gallery = document.querySelector('.gallery')

// Vérification de la récupération de l'élément div avec la classe "gallery" dans la console
// console.log(gallery);

fetch(certificats)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur de Chargement du fichier Json')
    }
    return response.json()
  })
  .then((certificats) => {
    // Traitement des données
    certificats.forEach((certificat) => {
      // Création de la Div "items" contenant chaque certificat
      const items = document.createElement('div')
      items.classList.add('gallery__items')

      // Ajout des données à la Div "items"
      items.innerHTML = `
        <h3>${certificat.title}</h3>
        <img src="${certificat.thumbnail}" alt="${certificat.title}">
      `

      // Ajout d'un écouteur d'événements sur la div 'items'
      items.addEventListener('click', () => {
        viewCertificat(certificat)
      })

      // Ajout de la div "items" comme enfant à la div "gallery"
      gallery.appendChild(items)
    })
  })
  .catch((error) => {
    console.log('Erreur :', error)
  })

// Fonction pour ouvrir la modale comportant les certificats
function viewCertificat(certificat) {
  // Création de l'overlay
  const galleryOverlay = document.createElement('div')
  galleryOverlay.classList.add('gallery__overlay')

  // Création de la modale (fenêtre d'information)
  const galleryModal = document.createElement('div')
  galleryModal.classList.add('gallery__modal')

  // Création de la croix de fermeture de la modale
  const galleryClose = document.createElement('i')
  galleryClose.classList.add('gallery__close', 'fa-solid', 'fa-xmark')

  // Ajout du contenu de la modale
  galleryModal.innerHTML = `
    <img src="${certificat.src}" alt="${certificat.title}">
  `

  // Ajout de la croix de fermeture à la modale
  galleryModal.appendChild(galleryClose)

  // Ajout de la modale à la galerie
  gallery.appendChild(galleryOverlay)
  gallery.appendChild(galleryModal)

  // Ajout d'un écouteur d'événements pour fermer la modale au clic sur la croix
  galleryClose.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })

  // Ajout d'un écouteur d'événements pour fermer la modale au clic sur l'overlay
  galleryOverlay.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })
}
