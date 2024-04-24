import { apiInstance } from './base'

export interface IRates {
    RUB: number
    USD: number
    EUR: number
}

export interface IRatesDto {
    rates: IRates
    base: string
    timestamp: number
    date: string
}

export interface Error {
    statusCode: number
    message: string
    error: string
}

export const getRates = async (url: string): Promise<IRatesDto | Error> => {
    try {
        const response = await apiInstance.get<IRatesDto>(url)
        return response
    } catch (error: unknown) {
        const knownError = error as Error
        throw knownError
    }
}
