// Initialiser EmailJS avec votre User ID
;(function () {
  emailjs.init('0VIUrftmzYlF6X5le') // Vérifiez qu'il n'y a pas d'espace inutile dans votre User ID
})()

// Fonction pour envoyer le formulaire avec EmailJS
document
  .getElementById('contact__form') // Utilisation du bon ID
  .addEventListener('submit', function (event) {
    event.preventDefault() // Empêche le rechargement de la page après soumission

    // Afficher un message de chargement
    const submitButton = document.querySelector('input[type="submit"]')
    submitButton.value = 'Envoi en cours...'
    submitButton.disabled = true

    // Récupérer les données du formulaire
    const formData = new FormData(this) // 'this' fait référence au formulaire

    // Utiliser EmailJS pour envoyer les données du formulaire
    emailjs.sendForm('service_jk0bn6h', 'template_x11zncl', this).then(
      // Envoie le formulaire directement
      function (response) {
        // Si l'envoi est réussi, afficher un message de succès
        console.log('SUCCESS!', response)
        alert('Votre message a été envoyé avec succès.')
        submitButton.value = 'Envoyer'
        submitButton.disabled = false

        // Optionnel : réinitialiser le formulaire après envoi
        document.getElementById('contact__form').reset()
      },
      function (error) {
        // Si une erreur survient, afficher un message d'erreur
        console.log('FAILED...', error)
        alert('Une erreur est survenue. Veuillez réessayer plus tard.')
        submitButton.value = 'Envoyer'
        submitButton.disabled = false
      }
    )
  })
