document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointmentForm');
    const successAlert = document.getElementById('formSuccessAlert');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Oprește trimiterea dacă există erori
            let isFormValid = true;

            // Elemente din formular
            const fullName = document.getElementById('fullName');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const carBrand = document.getElementById('carBrand');
            const carYear = document.getElementById('carYear');
            const serviceDropdown = document.getElementById('serviceDropdown');

            // Funcție helper pentru injectarea claselor Bootstrap 5
            const validateField = (input, condition) => {
                if (condition) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                } else {
                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');
                    isFormValid = false;
                }
            };

            // 1. Validare Nume (minim 3 caractere non-spațiu)
            validateField(fullName, fullName.value.trim().length >= 3);

            // 2. Validare Telefon (Republica Moldova)
            // Curățăm textul de spații sau cratime pentru a valida doar cifrele pure
            const cleanPhoneValue = phone.value.trim().replace(/[\s\-]/g, '');
            
            // Regex flexibil pentru RM:
            // - Permite format local pur din 8 cifre (ex: 78393815)
            // - Permite format cu 0 în față din 9 cifre (ex: 078393815)
            // - Permite prefix internațional (ex: +37378393815 sau +373078393815)
            const mdPhoneRegex = /^(\+373)?(0)?([6789]\d{7})$/;
            validateField(phone, mdPhoneRegex.test(cleanPhoneValue));

            // 3. Validare Email standard
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(email, emailRegex.test(email.value.trim()));

            // 4. Validare Marcă Mașină (să nu fie goală)
            validateField(carBrand, carBrand.value.trim() !== '');

            // 5. Validare An Fabricație (Limita logică între 1990 și anul curent 2026)
            const yearValue = parseInt(carYear.value, 10);
            validateField(carYear, !isNaN(yearValue) && yearValue >= 1990 && yearValue <= 2026);

            // 6. Validare Selector Serviciu
            validateField(serviceDropdown, serviceDropdown.value !== '');

            // Acțiune finală în caz de succes
            if (isFormValid) {
                if (successAlert) {
                    successAlert.classList.remove('d-none');
                    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                form.reset(); // Golire câmpuri

                // Curățare clase vizuale verzi după 4 secunde
                setTimeout(() => {
                    const validFields = form.querySelectorAll('.is-valid');
                    validFields.forEach(field => field.classList.remove('is-valid'));
                    if (successAlert) {
                        successAlert.classList.add('d-none');
                    }
                }, 4000);
            }
        });
    }
});