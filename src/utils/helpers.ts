import {Person} from "./types.ts";
import {name1, name2} from "./constatns.ts";

export function CreateData(n: number) {
    const data: Person[] = []

    for (let i = 0; i < n; i++) {
        const fullName = nameGenerator()
        const userName = userNameGenerator(fullName)
        const age = Math.floor(Math.random() * 100)

        data.push({
            fullName,
            userName,
            age,
            id: Math.floor(Math.random() * 10000000)
        })
    }

    return data.sort((a, b) => Number(a.id) - Number(b.id))
}

function capFirst(string: string) {
    if (!string) return undefined
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function nameGenerator() {
    return `${capFirst(name1[getRandomInt(0, name1.length + 1)])} ${capFirst(name2[getRandomInt(0, name2.length + 1)])}`;
}

function userNameGenerator(name: string) {
    return `${name.toLowerCase().replaceAll(' ', '')}${Math.floor(Math.random() * 1000)}`
}
