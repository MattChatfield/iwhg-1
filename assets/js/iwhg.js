document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Back to Top Logic
    (function () {
        const mybutton = document.getElementById("myBtn");

        if (mybutton) {
            window.onscroll = function () {
                // Show button after scrolling 500px
                if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                    mybutton.style.display = "block";
                } else {
                    mybutton.style.display = "none";
                }
            };

            mybutton.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    })();

    // 2. Set current year in footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}); 