export interface Car {
    make: string,
    model: string
}

export interface Item extends Car {
    id: number
}