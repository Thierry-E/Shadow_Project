const certificats = './assets/datas/certificats.json' // Chemin vers le fichier JSON
const gallery = document.querySelector('.gallery') // Récupération du conteneur de la galerie

// Fonction pour ajuster les chemins d'images en fonction de l'environnement (local ou GitHub)
function adjustPaths(certificats) {
  // Vérifie si nous sommes sur GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io')

  // Si sur GitHub Pages, on ajoute /Shadow_Project à chaque chemin d'image
  const basePath = isGitHubPages ? '/Shadow_Project' : '' // Si GitHub Pages, préfixe avec '/Shadow_Project'

  // Modifie les chemins des images dans le fichier JSON
  certificats.forEach((certificat) => {
    certificat.src = basePath + certificat.src
    certificat.thumbnail = basePath + certificat.thumbnail
  })
}

// Récupérer le fichier JSON
fetch(certificats)
  .then((response) => response.json())
  .then((certificats) => {
    // Ajuste les chemins d'images pour GitHub Pages
    adjustPaths(certificats)

    // Générer la galerie HTML
    certificats.forEach((certificat) => {
      const item = document.createElement('div')
      item.classList.add('gallery__item')

      item.innerHTML = `
        <h3>${certificat.title}</h3>
        <img src="${certificat.thumbnail}" alt="${certificat.title}">
      `

      item.addEventListener('click', () => {
        viewCertificat(certificat)
      })

      gallery.appendChild(item)
    })
  })
  .catch((error) =>
    console.error('Erreur de chargement du fichier JSON:', error)
  )

// Fonction pour afficher un certificat dans une modale
function viewCertificat(certificat) {
  const overlay = document.createElement('div')
  overlay.classList.add('gallery__overlay')
  const modal = document.createElement('div')
  modal.classList.add('gallery__modal')
  const close = document.createElement('i')
  close.classList.add('gallery__close', 'fa-solid', 'fa-xmark')

  modal.innerHTML = `<img src="${certificat.src}" alt="${certificat.title}">`
  modal.appendChild(close)
  gallery.appendChild(overlay)
  gallery.appendChild(modal)

  close.addEventListener('click', () => {
    modal.remove()
    overlay.remove()
  })
  overlay.addEventListener('click', () => {
    modal.remove()
    overlay.remove()
  })
}
