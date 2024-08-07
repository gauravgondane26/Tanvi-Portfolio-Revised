var cfContainers = document.getElementsByClassName("coverflow");
var cfLinks = [];

for (var i = 0; i < cfContainers.length; i++) {
    var links = cfContainers[i].getElementsByTagName("a");
    for (var j = 0; j < links.length; j++) {
        cfLinks.push(links[j]);
    }
}

var scaleI = 0;
for (scaleI; scaleI < cfLinks.length; scaleI++) {
    if (scaleI === 3) {
        continue;
    } else {
        cfLinks[scaleI].style.cursor = "default";
        cfLinks[scaleI].addEventListener("click", prevDef);
    }
}

function prevDef(e) {
    e.preventDefault();
}

function forScale(coverflowPos) {
    for (scaleI = 0; scaleI < cfLinks.length; scaleI++) {
        cfLinks[scaleI].style.cursor = "default";
        cfLinks[scaleI].addEventListener("click", prevDef);
    }
    for (scaleI = 0; scaleI < cfImg.length; scaleI++) {
        if (cfImg[scaleI].getAttribute("data-coverflow-index") == coverflowPos) {
            cfImg[scaleI].parentElement.style.cursor = "pointer";
            cfImg[scaleI].parentElement.removeEventListener("click", prevDef);
        }
    }
}

function setupCoverflow(coverflowContainer) {
    var coverflowContainers;

    if (typeof coverflowContainer !== "undefined") {
        if (Array.isArray(coverflowContainer)) {
            coverflowContainers = coverflowContainer;
        } else {
            coverflowContainers = [coverflowContainer];
        }
    } else {
        coverflowContainers = Array.prototype.slice.apply(document.getElementsByClassName('coverflow'));
    }

    coverflowContainers.forEach(function(containerElement) {
        var coverflow = {};
        var prevArrows, nextArrows;

        coverflow.container = containerElement;
        coverflow.images = Array.prototype.slice.apply(containerElement.getElementsByClassName('coverflow__image'));
        coverflow.position = Math.floor(coverflow.images.length / 2) + 1;

        coverflow.images.forEach(function(coverflowImage, i) {
            coverflowImage.dataset.coverflowIndex = i + 1;
        });

        coverflow.container.dataset.coverflowPosition = coverflow.position;

        prevArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("prev-arrow"));
        nextArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("next-arrow"));

        function setPrevImage() {
            coverflow.position = Math.max(1, coverflow.position - 1);
            coverflow.container.dataset.coverflowPosition = coverflow.position;
            forScale(coverflow.position);
        }

        function setNextImage() {
            coverflow.position = Math.min(coverflow.images.length, coverflow.position + 1);
            coverflow.container.dataset.coverflowPosition = coverflow.position;
            forScale(coverflow.position);
        }

        function jumpToImage(evt) {
            coverflow.position = Math.min(coverflow.images.length, Math.max(1, evt.target.dataset.coverflowIndex));
            coverflow.container.dataset.coverflowPosition = coverflow.position;
            setTimeout(function() {
                forScale(coverflow.position);
            }, 1);
        }

        function onKeyPress(evt) {
            switch (evt.which) {
                case 37:
                    setPrevImage();
                    break;
                case 39:
                    setNextImage();
                    break;
            }
        }
        prevArrows.forEach(function(prevArrow) {
            prevArrow.addEventListener('click', setPrevImage);
        });
        nextArrows.forEach(function(nextArrow) {
            nextArrow.addEventListener('click', setNextImage);
        });
        coverflow.images.forEach(function(image) {
            image.addEventListener('click', jumpToImage);
        });
        window.addEventListener('keyup', onKeyPress);
    });
}

setupCoverflow();

document.addEventListener('DOMContentLoaded', (event) => {
    const link = document.querySelector('.nav-links'); // Select the anchor tag
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link action
        // Additional actions can be added here
    });
});
