function reloadPage(){
    location.reload(true);
}

document.querySelector('.nav-logo').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});