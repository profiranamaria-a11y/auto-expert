document.addEventListener('DOMContentLoaded', () => {
    const serviceType = document.getElementById('serviceType');
    const carClassRadios = document.querySelectorAll('input[name="carClass"]');
    const calcTotal = document.getElementById('calcTotal');

    if (serviceType && calcTotal) {
        const runCalculation = () => {
            // Preluare valoare serviciu selectat
            const basePrice = parseFloat(serviceType.value) || 0;
            let multiplier = 1.0;

            // Determinare multiplicator clasă auto
            carClassRadios.forEach(radio => {
                if (radio.checked) {
                    multiplier = parseFloat(radio.value);
                }
            });

            // Calcul final rotunjit
            const finalPrice = Math.round(basePrice * multiplier);
            
            // Afișare cu efect vizual rapid
            calcTotal.textContent = finalPrice;
        };

        // Ascultători de evenimente pentru modificări spontane
        serviceType.addEventListener('change', runCalculation);
        carClassRadios.forEach(radio => {
            radio.addEventListener('change', runCalculation);
        });
    }
});