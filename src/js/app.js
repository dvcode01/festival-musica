document.addEventListener('DOMContentLoaded', () => {
    fixedNavigation();
    createGallery();
    highlightLink();
});

function fixedNavigation(){
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', () => {
        if(sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    })

}

// Crea la galeria
function createGallery(){
    const quantityImages = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= quantityImages; i++){
        // Creando imagen mediante scripting
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        galeria.appendChild(imagen);

        // Le agrega un evento a la imagen
        imagen.onclick = () =>{
            showImage(i);
        }
    }

}


function showImage(index){
    // Generando el modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.onclick = closeModal;

    // Generando imagen del modal
    const imagenModal = document.createElement('picture');
    imagenModal.innerHTML = `
        <source srcset="build/img/gallery/full/${index}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${index}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${index}.jpg" alt="imagen galeria">
    `;

    // Generando boton de cierre modal
    const btnClose = document.createElement('button');
    btnClose.textContent = 'X';
    btnClose.onclick = closeModal;
    btnClose.classList.add('btn-cerrar');

    // Agregando imagen y boton al modal
    modal.appendChild(imagenModal);
    modal.appendChild(btnClose);

    // Agregando al HTML el modal y ocultando contenido
    const body = document.querySelector('body');
    body.classList.add('hidden');
    body.appendChild(modal);

}

function closeModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    // Quita el modal despues de x segundos
    setTimeout(() => {
        // Comprueba si existe
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('hidden');
    }, 500);   
}

function highlightLink(){
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const links = document.querySelectorAll('.navegacion-principal a');
        let actual = '';

        // Itera todas las secciones
        sections.forEach(section => {
            // Comprueba la section más visible del navegador
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                actual = section.id;
            }
        });

        // Itera los links del menu
        links.forEach(link => {
            // Activa o desactiva links de acuerdo a la seccion
            link.classList.remove('active');

            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('active');
            }
        })

    })
}