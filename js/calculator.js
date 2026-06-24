document.addEventListener('DOMContentLoaded', () => {
    // Select toate checkbox-urile serviciilor / butoanele
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    const carClassRadios = document.querySelectorAll('input[name="carClass"]');
    const calcTotal = document.getElementById('calcTotal');

    if (calcTotal) {
        const runCalculation = () => {
            let basePriceSum = 0;

            // Se aduna valorile care sunt bifate
            serviceCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    basePriceSum += parseFloat(checkbox.value) || 0;
                }
            });

            let multiplier = 1.0;

            carClassRadios.forEach(radio => {
                if (radio.checked) {
                    multiplier = parseFloat(radio.value) || 1.0;
                }
            });

            // Calcul pret final, se apl coeficientul clasei auto
            const finalPrice = Math.round(basePriceSum * multiplier);
            
            // actualiz. dinamic textul din pagina
            calcTotal.textContent = finalPrice;
        };

        // Adaug. evenimente 'change' pentru fiecare checkbox în parte
        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', runCalculation);
        });

        // Adaug. evenimente pentru butoanele
        carClassRadios.forEach(radio => {
            radio.addEventListener('change', runCalculation);
        });
    }
});