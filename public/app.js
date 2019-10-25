const toCurrency = (price) => {
    return new Intl.NumberFormat('ukr', {
        currency: 'uah',
        style: 'currency'
    }).format(price);
};

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
});

const cardFull = document.querySelector('#card');
if (cardFull) {
    cardFull.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;

            fetch(`/card/remove/${id}`, {
                method: 'delete',
            }).then(response => response.json())
                .then((card) => {
                    if (card.courses.length) {
                        const html = card.courses.map((item) => {
                            return `
                                   <tr>
                                <td>${item.title}</td>
                                <td>${item.counter}</td>
                               <td>
                             <button class="btn btn-small js-remove" data-id="${item.id}">Remove</button>
                                </td>
                                    </tr>`
                        }).join('');

                        cardFull.querySelector('tbody').innerHTML = html;
                        cardFull.querySelector('.price').textContent = toCurrency(card.price);
                    } else {
                        cardFull.innerHTML = `<p>Shopping cart is null</p>`;
                    }
                })
                .catch(error => console.error(error))
        }
    });
}