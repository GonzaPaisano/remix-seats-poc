import { Form } from "@remix-run/react";
import { SeatsioSeatingChart, Pricing } from "@seatsio/seatsio-react";
// React SDK for Seats.io
// https://github.com/seatsio/seatsio-react

type ChartProps = {
    eventData: {
        event: string
        pricing: Pricing
    }
}

const Chart = ({ eventData }: ChartProps) => {
    const { event, pricing } = eventData

    return (
        <Form method="POST">
            <div style={{ width: 500 }}>
                <SeatsioSeatingChart
                    workspaceKey="a6ee32b1-7767-4da2-9cfc-f485f782d2e6"
                    event={event}
                    pricing={pricing}
                    region="sa" // South America
                    priceFormatter={(price) => `ARS ${price}`}
                    selectionValidators={[
                        { type: 'noOrphanSeats' },
                        { type: 'consecutiveSeats' },
                    ]}
                    showSectionPricingOverlay={true}
                    // onRenderStarted is fired when the chart has started loading, but hasn't rendered yet
                    onRenderStarted={(createdChart) => console.log('Loading Chart...', createdChart)}
                    // onChartRendered is fired when the chart is rendered successfully:
                    onChartRendered={(createdChart) => console.log('Chart Loaded!', createdChart)}
                    // Generate a hiden input with chart as name and the selected tickets as value
                    selectedObjectsInputName="selectedObjects"
                    session="start"
                />
                <input type="hidden" name="event" value={event} />
            </div>
            <button type="submit"> Continuar </button>
        </ Form>
    )
}

export default Chart