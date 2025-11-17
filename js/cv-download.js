function setCVDownload() {
  const cvButton = document.getElementById('download-cv');
  const isFrench = document.querySelector('.lang-fr').style.display !== 'none';

  // Choisir le fichier selon la langue
  const file = isFrench 
    ? 'files/Rached_chakchouk_cv_FR.pdf' 
    : 'files/Rached_chakchouk_cv_EN.pdf';

  // Mettre à jour le lien pour téléchargement
  cvButton.href = file;
  cvButton.setAttribute('download', file.split('/').pop());
}

// Initialiser au chargement de la page
window.addEventListener('load', setCVDownload);

// Mettre à jour quand la langue change
document.querySelectorAll('.lang-switch a').forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(setCVDownload, 100);
  });
});
