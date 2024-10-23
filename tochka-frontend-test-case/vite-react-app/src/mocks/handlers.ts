import { http, HttpResponse } from "msw";

const getEventsHandler = http.get('/api/events', eventsResolver);


const finalCountRequest = Math.round(Math.random() * 5);
let countRequest = 0;
let currentDay = Date.now();
enum typeEvents {
    Balance = 'Balance',
    Notification = 'Notification'
}

interface IEvent {
    // Гарантируется, что события уже отсортированы по дате на бэке
    date: Date;
    // Главный текст
    title: string;
    // Пояснение к главному тексту
    description: string;
    // Более подробное пояснение (третья строчка у события в макете)
    optionalDescription?: string;
    // Тип события
    type: typeEvents
    // Ссылка на иконку
    icon: string;
    // Существует только при типе balance, показывают сумму списания или прибыли
    balance?: string;
    // Существует только при типе notification, показывает из какого сервиса пришло уведомление
    service?: string;
}

const dataset : Array<Omit<IEvent, 'date'>> = [
    {
        title: 'Лаванда, ООО',
        description: 'Оплата лицензионного вознаграждения за использование базовой лицензии за период с 01.11.22 по 30.11.22. НДС не предусмотрен.',
        icon: 'Bank Rossii.svg',
        type: typeEvents.Balance,
        balance: '– 250 000 ₽',
        optionalDescription: '№6884, 13:40'
    },
    {
        title: 'Иван Иванович С.',
        description: '+7 (906) 999‑88‑77',
        icon: 'Raiffeisenbank.svg',
        type: typeEvents.Balance,
        balance: '– 2 000 ₽',
        optionalDescription: '№6884, 13:40'
    },
    {
        title: 'Промт, ООО',
        description: 'Оплата услуг контрагенту по договору подряда № 206 от 12.03.2019, в т. ч. НДС 18%',
        icon: 'Alfabank.svg',
        type: typeEvents.Balance,
        balance: '+ 50 000 ₽',
        optionalDescription: '№6884, 13:40'
    },
    {
        title: 'Сергеев, С.С., ИП',
        description: 'По договору №8923 от 10 октября 2022 в т.ч. НДС 20%',
        icon: 'Sberbank.svg',
        type: typeEvents.Balance,
        balance: '– 250 000 ₽',
        optionalDescription: '№6884, 13:40'
    },
    {
        title: 'Сидоров Д.В., ИП',
        description: 'По договору №8923 от 10 октября 2022 в т.ч. НДС 20%',
        icon: '№6884, 13:40',
        type: typeEvents.Balance,
        balance: '– 250 000 ₽',
        optionalDescription: ''
    },
    {
        title: 'Счёт на оплату №170 от 21.10.22',
        description: '****2626',
        icon: 'Services/Document Paid.svg',
        type: typeEvents.Balance,
        balance: '+ 12 560 ₽',
        optionalDescription: '13:40'
    },
    {
        title: 'ИФНС России по Кировскому району в городе Казань',
        description: 'По решению о взыскании № 4514 от 08.06.2022 на основании ст.46 НК РФ от 31.07.1998г. № 146‑ФЗ без НДС',
        icon: 'Severgazbank.svg',
        type: typeEvents.Balance,
        balance: '– 2 700 ₽',
        optionalDescription: '№6884, 13:40'
    },
    {
        title: 'Готова аналитика по вашим операциям за 3 месяца',
        description: '13:40',
        icon: 'Non Financial Event.svg',
        type: typeEvents.Notification,
        service: 'Карты',
    },
];
function eventsResolver({request, params}) {
    if (countRequest < finalCountRequest) {
        let result = [];
        for (let i = 0; i < 20;) {
            let countEventsPerDay = Math.round(Math.random() * 5);
            for (let j = 0; j <= countEventsPerDay; j++) {
                let index = Math.round(Math.random() * (dataset.length - 1))
                let event: IEvent = {
                    ...dataset[index],
                    date: new Date(currentDay)
                };
                result.push(event);
                i++;
            }
            currentDay = currentDay - (24*60*60*1000);

        }
        return HttpResponse.json({
            data: result
        });
    }

    return HttpResponse.json({
        data: []
    });
}

export const handlers = [getEventsHandler];

