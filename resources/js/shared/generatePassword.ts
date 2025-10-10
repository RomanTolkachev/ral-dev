const nouns = [
    'кот', 'дом', 'стол', 'город', 'ветер', 'солнце', 'море', 'лес', 'цветок', 'книга',
    'друг', 'ночь', 'день', 'рука', 'нога', 'голова', 'сердце', 'мечта', 'песня', 'танец',
    'огонь', 'вода', 'земля', 'воздух', 'путь', 'время', 'слово', 'число', 'образ', 'мысль',
    'сила', 'власть', 'работа', 'жизнь', 'смерть', 'любовь', 'страх', 'счастье', 'гора', 'река',
    'птица', 'рыба', 'зверь', 'поле', 'сад', 'парк', 'улица', 'площадь', 'мост', 'окно',
    'дверь', 'стена', 'пол', 'потолок', 'крыша', 'комната', 'кухня', 'спальня', 'ванна', 'балкон',
    'машина', 'поезд', 'самолет', 'корабль', 'велосипед', 'телефон', 'компьютер', 'экран', 'клавиша', 'мышь',
    'чай', 'кофе', 'хлеб', 'сыр', 'мясо', 'суп', 'салат', 'торт', 'сок', 'вода',
    'музыка', 'фильм', 'игра', 'спорт', 'бег', 'прыжок', 'удар', 'бросок', 'победа', 'поражение'
];

const verbs = [
    'бежит', 'стоит', 'сидит', 'лежит', 'ходит', 'смотрит', 'видит', 'слышит', 'говорит', 'поет',
    'играет', 'работает', 'учится', 'пишет', 'читает', 'рисует', 'строит', 'чинит', 'готовит', 'ест',
    'пьет', 'спит', 'просыпается', 'мечтает', 'думает', 'знает', 'помнит', 'забывает', 'любит', 'ненавидит',
    'боится', 'радуется', 'плачет', 'смеется', 'кричит', 'шепчет', 'зовет', 'ждет', 'ищет', 'находит',
    'теряет', 'дает', 'берет', 'продает', 'покупает', 'меняет', 'создает', 'разрушает', 'открывает', 'закрывает',
    'включает', 'выключает', 'начинает', 'заканчивает', 'побеждает', 'проигрывает', 'помогает', 'мешает', 'спасает', 'губит',
    'летает', 'плавает', 'ползает', 'прыгает', 'бегает', 'катится', 'падает', 'поднимается', 'опускается', 'вращается',
    'светит', 'горит', 'мерцает', 'шумит', 'звучит', 'пахнет', 'вкусно', 'тепло', 'холодно', 'мокро',
    'сухо', 'высоко', 'низко', 'далеко', 'близко', 'быстро', 'медленно', 'громко', 'тихо', 'ярко'
];

const adjectives = [
    'быстрый', 'медленный', 'умный', 'глупый', 'красивый', 'уродливый', 'большой', 'маленький', 'высокий', 'низкий',
    'длинный', 'короткий', 'широкий', 'узкий', 'тяжелый', 'легкий', 'горячий', 'холодный', 'теплый', 'прохладный',
    'светлый', 'темный', 'яркий', 'тусклый', 'громкий', 'тихий', 'резкий', 'мягкий', 'твердый', 'мягкий',
    'гладкий', 'шершавый', 'мокрый', 'сухой', 'чистый', 'грязный', 'новый', 'старый', 'молодой', 'древний',
    'современный', 'простой', 'сложный', 'легкий', 'трудный', 'интересный', 'скучный', 'веселый', 'грустный', 'страшный',
    'смешной', 'серьезный', 'важный', 'неважный', 'дорогой', 'дешевый', 'богатый', 'бедный', 'сильный', 'слабый',
    'здоровый', 'больной', 'счастливый', 'несчастный', 'добрый', 'злой', 'честный', 'лживый', 'храбрый', 'трусливый',
    'активный', 'пассивный', 'открытый', 'закрытый', 'свободный', 'занятый', 'полный', 'пустой', 'прямой', 'кривой',
    'круглый', 'квадратный', 'острый', 'тупой', 'сладкий', 'горький', 'кислый', 'соленый', 'вкусный', 'невкусный',
    'ароматный', 'вонючий', 'шумный', 'тихий', 'оживленный', 'спокойный', 'опасный', 'безопасный', 'редкий', 'частый'
];

const layoutMap: { [key: string]: string } = {
    'а': 'f', 'б': ',', 'в': 'd', 'г': 'u', 'д': 'l', 'е': 't', 'ё': '`', 'ж': ';', 'з': 'p', 'и': 'b',
    'й': 'q', 'к': 'r', 'л': 'k', 'м': 'v', 'н': 'y', 'о': 'j', 'п': 'g', 'р': 'h', 'с': 'c', 'т': 'n',
    'у': 'e', 'ф': 'a', 'х': '[', 'ц': 'w', 'ч': 'x', 'ш': 'i', 'щ': 'o', 'ъ': ']', 'ы': 's', 'ь': 'm',
    'э': "'", 'ю': '.', 'я': 'z',
    'А': 'F', 'Б': '<', 'В': 'D', 'Г': 'U', 'Д': 'L', 'Е': 'T', 'Ё': '~', 'Ж': ':', 'З': 'P', 'И': 'B',
    'Й': 'Q', 'К': 'R', 'Л': 'K', 'М': 'V', 'Н': 'Y', 'О': 'J', 'П': 'G', 'Р': 'H', 'С': 'C', 'Т': 'N',
    'У': 'E', 'Ф': 'A', 'Х': '{', 'Ц': 'W', 'Ч': 'X', 'Ш': 'I', 'Щ': 'O', 'Ъ': '}', 'Ы': 'S', 'Ь': 'M',
    'Э': '"', 'Ю': '>', 'Я': 'Z'
};

export const convertToEnglishLayout = (russianText: string): string => {
    return russianText
        .split('')
        .map(char => layoutMap[char] || char)
        .join('');
};

export const generatePassword = (options: {
    wordCount?: number;
    separator?: string;
    capitalize?: boolean;
    addNumber?: boolean;
} = {}) => {
    const {
        wordCount = 3,
        separator = '',
        capitalize = true,
        addNumber = true
    } = options;

    const getRandomWord = (array: string[]) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const capitalizeWord = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const getRandomDigit = (): string => {
        return Math.floor(Math.random() * 10).toString(); // случайная цифра от 0 до 9
    };

    const adjustAdjectiveEnding = (adjective: string, noun: string): string => {
        const lastChar = noun.slice(-1);
        const isFeminine = ['а', 'я'].includes(lastChar);
        const isNeuter = ['о', 'е'].includes(lastChar);

        if (isFeminine) {
            if (adjective.endsWith('ый')) return adjective.slice(0, -2) + 'ая';
            if (adjective.endsWith('ий')) return adjective.slice(0, -2) + 'яя';
            if (adjective.endsWith('ой')) return adjective.slice(0, -2) + 'ая';
            if (adjective.endsWith('кий')) return adjective.slice(0, -3) + 'кая';
        } else if (isNeuter) {
            if (adjective.endsWith('ый')) return adjective.slice(0, -2) + 'ое';
            if (adjective.endsWith('ий')) return adjective.slice(0, -2) + 'ее';
            if (adjective.endsWith('ой')) return adjective.slice(0, -2) + 'ое';
            if (adjective.endsWith('кий')) return adjective.slice(0, -3) + 'кое';
        }
        return adjective;
    };

    const adjustVerbEnding = (verb: string, noun: string): string => {
        const lastChar = noun.slice(-1);
        const isFeminine = ['а', 'я'].includes(lastChar);
        const isNeuter = ['о', 'е'].includes(lastChar);
        const isPlural = ['и', 'ы'].includes(lastChar);

        if (isFeminine) {
            return verb;
        } else if (isNeuter) {
            return verb;
        } else if (isPlural) {
            if (verb.endsWith('ет')) return verb.slice(0, -2) + 'ут';
            if (verb.endsWith('ит')) return verb.slice(0, -2) + 'ят';
        }

        return verb;
    };

    const noun = getRandomWord(nouns);
    const adjective = getRandomWord(adjectives);
    const verb = getRandomWord(verbs);

    const adjustedAdjective = adjustAdjectiveEnding(adjective, noun);
    const adjustedVerb = adjustVerbEnding(verb, noun);

    const words = [adjustedAdjective, noun, adjustedVerb];

    let result = words
        .slice(0, wordCount)
        .map(word => capitalize ? capitalizeWord(word) : word)
        .join(separator);

    if (addNumber) {
        result += getRandomDigit();
    }

    return result;
};