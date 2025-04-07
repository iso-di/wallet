// Данные карточек (можно редактировать)
const discountCards = [
    {
        id: 1,
        name: "Сам Маркет",
        image: "cards/sam.jpg",
        number: "9339024704292",
        barcodeType: "code128",
        color: "#DF2A2A"
    },
    {
        id: 2,
        name: "Перекрёсток",
        image: "cards/sam.jpg",
        number: "993 902 470 429 2",
        barcodeType: "code128",
        color: "#00A650"
    },
    {
        id: 3,
        name: "Магнит",
        image: "cards/magnit.jpg",
        number: "5678901234567",
        barcodeType: "code128",
        color: "#E30613"
    },
    {
        id: 4,
        name: "Пятёрочка",
        image: "cards/pyaterochka.jpg",
        number: "3210987654321",
        barcodeType: "code128",
        color: "#FFD700"
    }
];

// DOM элементы
const cardsContainer = document.getElementById('cardsContainer');
const cardModal = document.getElementById('cardModal');
const modalTitle = document.getElementById('modalTitle');
const modalCardImage = document.getElementById('modalCardImage');
const modalCardNumber = document.getElementById('modalCardNumber');
const closeBtn = document.querySelector('.close-btn');
const barcodeSvg = document.getElementById('barcode');

// Отображение карточек
function renderCards() {
    cardsContainer.innerHTML = '';

    discountCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.style.backgroundColor = card.color || '#007AFF';

        cardElement.innerHTML = `
            <div class="card-image-container">
                <img src="${card.image}" alt="${card.name}" class="card-image">
            </div>
            <div class="card-info">
                <div class="card-name">${card.name}</div>
                <div class="card-number">${formatCardNumber(card.number)}</div>
            </div>
        `;

        cardElement.addEventListener('click', () => openCardModal(card));
        cardsContainer.appendChild(cardElement);
    });
}

// Форматирование номера карты
function formatCardNumber(number) {
    return number.match(/.{1,4}/g).join(' ');
}

// Открытие модального окна с картой
function openCardModal(card) {
    modalTitle.textContent = card.name;
    modalCardImage.src = card.image;
    modalCardImage.alt = card.name;
    modalCardNumber.textContent = formatCardNumber(card.number);

    // Генерация штрих-кода
    JsBarcode(barcodeSvg, card.number, {
        format: card.barcodeType || "code128",
        width: 2,
        height: 80,
        displayValue: false,
        margin: 10,
        background: "transparent",
        lineColor: "#000000"
    });

    cardModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    cardModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие по клику вне модального окна
window.addEventListener('click', (e) => {
    if (e.target === cardModal) {
        closeModal();
    }
});

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker зарегистрирован');
            })
            .catch(err => {
                console.log('Ошибка регистрации ServiceWorker:', err);
            });
    });
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', renderCards);
closeBtn.addEventListener('click', closeModal);