document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = header.querySelector('.accordion-icon');

        if (!header || !content || !icon) return;

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Optional: Close other items when one is opened
            // accordionItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //         otherItem.querySelector('.accordion-content').style.maxHeight = '0px';
            //     }
            // });

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                // Set max-height to the scroll height to animate opening
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                // Collapse the content
                content.style.maxHeight = '0px';
            }
        });

        // Initialize closed state
        content.style.maxHeight = '0px';
    });
}); 