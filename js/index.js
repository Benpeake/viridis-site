// accordion logic
const accordionItems = document.querySelectorAll('.accordion-section');

accordionItems.forEach(item => {
    const expandIcon = item.querySelector('.expand-icon');
    const accordContent = item.querySelector('.accordion-content');

    expandIcon.addEventListener('click', function () {
        accordContent.classList.toggle('active');
        const newSrc = accordContent.classList.contains('active')
            ? 'images/remove_icon.svg'
            : 'images/expand_icon.svg';
        expandIcon.src = newSrc;
    });
});

