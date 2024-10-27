const trades = [
    {
        stock: {
            src: 'assets/tesla.png',
            ticker: 'TSLA',
            name: 'Tesla Inc.',
        },
        price: 205.43,
        quantity: 15,
        type: 'buy',
        status: 'completed',
        orderDate: '2024-06-04T12:00:00',
    },
    {
        stock: {
            src: 'assets/apple.png',
            ticker: 'AAPL',
            name: 'Apple Inc.',
        },
        price: 220.15,
        quantity: 30,
        type: 'buy',
        orderType: 'limit',
        status: 'completed',
        orderDate: '2024-07-04T12:00:00',
    },
    {
        stock: {
            src: 'assets/google.png',
            ticker: 'GOOG',
            name: 'Alphabet Inc.',
        },
        price: 187.39,
        quantity: 100,
        type: 'buy',
        orderType: 'limit',
        status: 'completed',
        orderDate: '2024-07-04T12:00:00',
    },
 
    {
        stock: {
            src: 'assets/shell.png',
            ticker: 'SHELL',
            name: 'Shell Plc.',
        },
        price: 33.25,
        quantity: 100,
        type: 'sell',
        status: 'completed',
        orderDate: '2024-06-05T10:00:00',
    },
    {
        stock: {
            src: 'assets/oxy.png',
            ticker: 'OXY',
            name: 'Occidental',
        },
        price: 62.39,
        quantity: 200,
        type: 'buy',
        orderType: 'limit',
        status: 'completed',
        orderDate: '2024-07-04T12:00:00',
    },
    {
        stock: {
            src: 'assets/nvidia.png',
            ticker: 'NVDA',
            name: 'NVidia Corp.',
        },
        price: 205.43,
        quantity: 15,
        type: 'buy',
        status: 'completed',
        orderDate: '2024-07-03T11:00:00',
    },
    {
        stock: {
            src: 'assets/google.png',
            ticker: 'GOOG',
            name: 'Alphabet Inc.',
        },
        price: 187.39,
        quantity: 50,
        type: 'sell',
        orderType: 'limit',
        status: 'completed',
        orderDate: '2024-07-04T12:00:00',
    },
    {
        stock: {
            src: 'assets/apple.png',
            ticker: 'AAPL',
            name: 'Apple Inc.',
        },
        price: 225.15,
        quantity: 15,
        type: 'sell',
        orderType: 'limit',
        status: 'completed',
        orderDate: '2024-07-12T12:00:00',
    },
];

const tableWidget = document.getElementsByClassName('table-widget');

const itemsOnPage = 4;

const numberOfPages = Math.ceil(trades.length / itemsOnPage);

const start = (new URLSearchParams(window.location.search)).get('page') || 1;

const mappedRecords = trades
    .map(
        (trade) => {
            return `<tr>
                <td class="team-member-profile">
                    <img
                        src="${trade.stock.src}"
                        alt="${trade.stock.name}"
                    >
                    <span class="profile-info">
                        <span class="profile-info__name">
                            ${trade.stock.ticker}
                        </span>
                        <span class=profile-info__alias>
                            ${trade.stock.name}
                        </span>
                    </span>
                </td>
                <td>
                    <div class='order-type order-type--${trade.type}'>
                        ${trade.type.toUpperCase()}
                    </div>
                </td>
                <td>
                    ${trade.quantity}
                </td>
                <td>
                    ${trade.price}
                </td>
                <td>
                    ${Math.round(trade.quantity * trade.price * 100) / 100}
                </td>
                <td>
                    ${new Date(trade.orderDate).toLocaleDateString('en-us', 
                        {
                            'weekday': 'short',
                            'year': 'numeric', 
                            'month': 'short', 
                            'day': 'numeric',
                        }
                    )}
                </td>
            </tr>`;
        }
    );

const linkList = [];

for (let i = 0; i < numberOfPages; i++) {
    const pageNumber = i + 1;
    linkList.push(
        `<li>
            <a
                href="?page=${pageNumber}" 
                ${pageNumber == start ? 'class="active"' : ''} 
                title="page ${pageNumber}">
                ${pageNumber}
            </a>
        </li>`
    );
}

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);
    
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});


const table = DOMPurify.sanitize(`
    <table>
        <caption>
            All Trades
            <div class="table-row-count">
                <div class="status"></div>
                (${trades.length}) Trades
            </div>
        </caption> 
        <thead>
            <tr>
                <th>Stock</th>
                <th>Order Type</th>
                <th>Quantity</th>
                <th>Price [$]</th>
                <th>Trade Value [$]</th>
                <th>Order Date</th>
            </tr>
        </thead>
        <tbody id="table-rows">
            ${mappedRecords.join('')}
        </tbody>
</table>`);

tableWidget[0].innerHTML = table;