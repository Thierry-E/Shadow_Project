/**** Code permettant d'appliquer une classe au lien du menu actif ****/

/**** Variables globales ****/
const menuLinks = document.querySelectorAll('.nav__link a') // Sélectionne tous les liens dans les éléments avec la classe 'nav__link'

// Récupère le nom du fichier actuel dans l'URL (afin de faire la comparaison)
const currentPage = window.location.pathname.split('/').pop()

console.log('Page actuelle:', currentPage) // Affiche la page actuelle dans la console pour déboguer

function setActiveMenuLinks() {
  /**** Ajout de la classe "nav__link--link_active" au lien correspondant à la page active ****/
  menuLinks.forEach((link) => {
    // Récupère le nom de la page à partir de l'attribut href du lien (au cas où il y a des chemins relatifs)
    const linkPage = link.getAttribute('href').split('/').pop()

    console.log(`Comparaison: ${linkPage} === ${currentPage}`) // Affiche la comparaison dans la console pour déboguer

    // Si le lien correspond à la page actuelle, ajoute la classe active
    if (linkPage === currentPage) {
      link.classList.add('nav__link--link_active') // Applique la classe active
      console.log(`Classe ajoutée au lien: ${linkPage}`) // Log pour vérifier que la classe est ajoutée
    }
  })

  /**** Ajout d'un écouteur d'événements à chaque lien du menu ****/
  menuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      // Retire la classe 'nav__link--link_active' de tous les liens
      menuLinks.forEach((link) => {
        link.classList.remove('nav__link--link_active')
      })

      // Ajoute la classe 'nav__link--link_active' au lien cliqué
      link.classList.add('nav__link--link_active')
    })
  })
}

/****Appel de la fonction****/
setActiveMenuLinks()
