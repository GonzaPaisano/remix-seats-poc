import { SimplePricing } from "@seatsio/seatsio-react";

export type EventType = {
    pricing: SimplePricing[]
    event: string
}

export const events: EventType[] = [
    {
        event: "2bd4a54a-57da-4b5d-8e39-eb4acdd18a26",
        pricing: [
            { category: 1, price: 70 },
            { category: 2, price: 60 },
            { category: 3, price: 50 },
            { category: 4, price: 40 }
        ]
    },
    {
        event: "8f44e35f-8039-4702-82b7-3147d5b446b0",
        pricing: [
            { category: 1, price: 50 },
            { category: 2, price: 40 },
            { category: 3, price: 30 },
            { category: 4, price: 20 }
        ]
    }
]