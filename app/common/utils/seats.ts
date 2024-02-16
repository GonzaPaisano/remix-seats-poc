import { createRegister } from "~/db.server"
import { events } from "../eventMocks"
import { Region, SeatsioClient } from "seatsio"

export type SeatType = {
    label: string
    ticketType: number
    price: number
}

export const client = new SeatsioClient(Region.SA(), '718b0d81-0e14-4894-8f48-255e83bfb886')


export const selectSeats = async (event: string, selectedSeats: string) => {
    const eventData = events.find(e => e.event === event)
    const selectedObjects = selectedSeats.split(',').map((seat: string) => {
        const seatCategory = seat.split('-')[1]
        const pricing = eventData?.pricing.find(p => p.category === Number(seatCategory))
        return {
            label: seat,
            ticketType: pricing?.category,
            price: pricing?.price
        }
    })
    const selectionRegister = await createRegister({
        event: event as string,
        seats: JSON.stringify(selectedObjects),
      })
    console.log('Selection Register: ', selectionRegister)
    return selectionRegister.id
}