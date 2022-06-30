function services(selector, data) {
    // validuojame atejusius duomenis
    const inputResult = isValidServiceInput(selector, data);
    if (inputResult !== true) {
        return console.error(inputResult);
    }

    // logika
    const DOM = document.querySelector(selector);
    if (!DOM) {
        return console.error('Nerastas elementas i kuri reikia sugeneruoti nauja turini');
    }

    let HTML = '';

    for (const item of data) {
        if (!isValidServiceItem(item)) {
            continue;
        }

        console.log(item);
        HTML += `<div class="col-12 col-md-6 col-lg-4 services">
                    <i class="icon fa fa-${item.icon}"></i>
                    <h3 class="title">${item.title}</h3>
                    <p class="description">${item.description}</p>
                </div>`;
    }

    // validuojame rezultata
    if (HTML === '') {
        return console.error('Duomenyse nera normalios/teisingos informacijos');
    }

    // graziname rezultata
    DOM.innerHTML = HTML;

    return true;
}

function isValidServiceInput(selector, data) {
    if (typeof selector !== 'string'
        || selector === '') {
        return 'Selektorius turi buti ne tuscias string`as';
    }

    if (!Array.isArray(data)
        || data.length === 0) {
        return 'Services function requires non-empty array of data';
    }

    return true;
}

function isValidServiceItem(data) {
    if (typeof data !== 'object'
        || data === null
        || Array.isArray(data)
        || typeof data.icon !== 'string'
        || !data.icon
        || data.icon.length > 15
        || typeof data.title !== 'string'
        || !data.title
        || data.title.length > 20
        || typeof data.description !== 'string'
        || !data.description
        || data.description.length > 100
        || Object.keys(data).length !== 3) {
        return false;
    }
    return true;
}

export { services }