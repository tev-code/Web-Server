document.addEventListener('DOMContentLoaded', () => {
  // Fetch Bitcoin prices in different currencies
  fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data); // Log the entire API response for inspection

      // Ensure the expected properties are present in the response
      if (data && data.bpi) {
        const currencies = Object.keys(data.bpi);
        const prices = currencies.map(currency => parseFloat(data.bpi[currency].rate.replace(',', '')));

        // Display the prices in the widget
        document.getElementById('bitcoinChart').innerText = `
          Bitcoin Price (${currencies[0]}): $${prices[0].toFixed(2)}
          Bitcoin Price (${currencies[1]}): $${prices[1].toFixed(2)}
          Bitcoin Price (${currencies[2]}): $${prices[2].toFixed(2)}
        `;

        // Create a comparison chart
        createChart(prices, currencies);
      } else {
        console.error('Incomplete or unexpected API response:', data);
      }
    })
    .catch(error => console.error('Error fetching Bitcoin prices:', error));

  // Function to create a comparison chart
  function createChart(prices, currencies) {
    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: currencies,
        datasets: [{
          label: 'Bitcoin Price Comparison',
          data: prices,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 255, 0, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 255, 0, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});
