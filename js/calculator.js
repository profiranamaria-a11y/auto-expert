document.addEventListener('DOMContentLoaded', () => {
    // Selectăm toate checkbox-urile serviciilor și butoanele radio pentru clasa auto
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    const carClassRadios = document.querySelectorAll('input[name="carClass"]');
    const calcTotal = document.getElementById('calcTotal');

    if (calcTotal) {
        const runCalculation = () => {
            let basePriceSum = 0;

            // 1. Parcurgem toate căsuțele și adunăm valorile celor care sunt bifate
            serviceCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    basePriceSum += parseFloat(checkbox.value) || 0;
                }
            });

            let multiplier = 1.0;

            // 2. Preluăm coeficientul pentru clasa mașinii (1.0 sau 1.3)
            carClassRadios.forEach(radio => {
                if (radio.checked) {
                    multiplier = parseFloat(radio.value) || 1.0;
                }
            });

            // 3. Calculăm prețul final cumulat, aplicând coeficientul clasei auto
            const finalPrice = Math.round(basePriceSum * multiplier);
            
            // 4. Actualizăm dinamic textul din pagină
            calcTotal.textContent = finalPrice;
        };

        // Adăugăm ascultători de evenimente 'change' pentru fiecare checkbox în parte
        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', runCalculation);
        });

        // Adăugăm ascultători de evenimente pentru butoanele radio
        carClassRadios.forEach(radio => {
            radio.addEventListener('change', runCalculation);
        });
    }
});