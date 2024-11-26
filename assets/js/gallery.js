//Import du fichiers de données Json (certificats)
const certificats = '../../assets/datas/certificats.json'
// Récupération de l'élément Div avec la classe "gallery" dans le document HTML ou DOM.
const gallery = document.querySelector('.gallery')
// Vérification de la récupération de l'élément div avec la classe "gallery" dans la console
//  console.log(gallery)

fetch(certificats)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur de Chargement du fichier Json')
    }
    return response.json()
  })
  .then((certificats) => {
    //Traitements des données
    certificats.forEach((certificat) => {
      // Création de la Div "items" contenant chaque Projet
      const items = document.createElement('div')
      items.classList.add('gallery__items')
      // Ajout des données à la Div "items"
      items.innerHTML = `
      <h3>${certificat.title}</h3>
      <img src=${certificat.thumbnail} alt=${certificat.title}>
   `
      // Ajout d'un écouter d'événements sur la div 'items'
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

//Fonction pour ouvrir la modale comportant les certificats
function viewCertificat(certificat) {
  // création de l'overlay
  const galleryOverlay = document.createElement('div')
  galleryOverlay.classList.add('gallery__overlay')
  // Création de la modale (fenêtre d'information)
  const galleryModal = document.createElement('div')
  galleryModal.classList.add('gallery__modal')
  // création de la croix de fermeture de la modale
  const galleryClose = document.createElement('i')
  galleryClose.classList.add('gallery__close')
  galleryClose.classList.add('fa-solid')
  galleryClose.classList.add('fa-xmark')
  // Ajout du contenu de la modale
  galleryModal.innerHTML = `
   <img src=${certificat.src} alt=${certificat.title}>
  `
  //Ajout de la croix de fermeture à la modal
  galleryModal.appendChild(galleryClose)
  // Ajout de la modal à la gallerie
  gallery.appendChild(galleryOverlay)
  gallery.appendChild(galleryModal)
  // Ajout d'un écouteur d'événements pour fermer la modal au clic sur la croix
  galleryClose.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })
  // Ajout d'un ecouteur d'événement pour fermer la modal au clic sur l'overlay
  galleryOverlay.addEventListener('click', () => {
    galleryModal.remove()
    galleryOverlay.remove()
  })
}
