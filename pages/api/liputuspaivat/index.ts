import { NextApiRequest, NextApiResponse } from 'next'
import { liputuspaivat } from "../../../liputuspaivat"
import { ApiResponse, Liputuspaiva } from '../../../types/liputuspaiva'
import dayjs from 'dayjs'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        if (!liputuspaivat || liputuspaivat.length === 0) {
            return res.status(404).json({ message: 'Liputuspäiviä ei löytynyt' })
        }

        // Convert Dayjs objects to strings for the API response
        const formattedLiputuspaivat: Liputuspaiva[] = liputuspaivat.map(paiva => ({
            ...paiva,
            date: dayjs.isDayjs(paiva.date) ? paiva.date.format() : paiva.date
        }))

        return res.status(200).json({
            data: formattedLiputuspaivat,
            count: formattedLiputuspaivat.length
        })
    } catch (error) {
        console.error('Error in liputuspaivat API:', error)
        return res.status(500).json({ 
            message: 'Virhe haettaessa liputuspäiviä',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        })
    }
}