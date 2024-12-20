const services = './assets/datas/services.json' // Chemin vers le fichier JSON
const serviceContainer = document.querySelector('.services') // Récupération du conteneur des services

fetch(services)
  .then((response) => {
    if (!response.ok)
      throw new Error('Erreur lors du chargement du fichier JSON')
    return response.json()
  })
  .then((servicesData) => {
    // Ajuste les chemins des images en fonction de l'environnement
    adjustServicePaths(servicesData)

    // Crée et affiche les cartes de service
    servicesData.forEach((serviceData) => {
      const serviceCard = document.createElement('div')
      serviceCard.classList.add('service_Card')

      serviceCard.innerHTML = `
        <img src="${serviceData.picture}" alt="${serviceData.title}">
        <div class="serviceCard_Content">
          <h3>${serviceData.title}</h3>
          <button type="button" class="cta">En savoir Plus</button>
        </div>
      `

      serviceContainer.appendChild(serviceCard) // Ajouter la carte dans le conteneur

      // Ajout de l'événement pour ouvrir la modale
      const button = serviceCard.querySelector('.cta')
      button.addEventListener('click', () => {
        viewServices(serviceData) // Appelle la fonction pour afficher la modale
      })
    })
  })
  .catch((error) => {
    console.error('Erreur lors du chargement des services :', error)
    serviceContainer.innerHTML = `<p class="error">Impossible de charger les services. Veuillez réessayer plus tard.</p>`
  })

// Fonction pour afficher la description du service dans une modale
function viewServices(serviceData) {
  const overlay = document.createElement('div')
  overlay.classList.add('services__overlay')

  const modal = document.createElement('div')
  modal.classList.add('services__modal')

  const close = document.createElement('span')
  close.classList.add('services__close')
  close.textContent = 'Fermer'

  modal.innerHTML = `
    <img src="${serviceData.picture}" alt="${serviceData.title}">
    <h3>${serviceData.title}</h3>
    <p>${serviceData.description || 'Description non disponible.'}</p>
  `
  modal.appendChild(close)

  // Ajoute la modale et l'overlay au body
  document.body.appendChild(overlay)
  document.body.appendChild(modal)

  const closeModal = () => {
    modal.remove()
    overlay.remove()
  }

  close.addEventListener('click', closeModal)
  overlay.addEventListener('click', closeModal)
}

// Fonction pour ajuster les chemins d'images des services en fonction de l'environnement (local ou GitHub)
function adjustServicePaths(services) {
  const isGitHubPages = window.location.hostname.includes('github.io')
  const basePath = isGitHubPages ? '/Shadow_Project' : '' // Préfixe pour GitHub Pages

  services.forEach((service) => {
    service.picture = basePath + service.picture // Modifie le chemin de l'image
  })
}
