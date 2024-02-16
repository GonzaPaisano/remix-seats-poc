import { json, type LoaderFunctionArgs, ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { SeatType, client } from "~/common/utils/seats";
import { findById } from "~/db.server";

export const meta: MetaFunction = () => {
    return [
        { title: "Checkout - Paisatickets" },
    ];
};

type SelectionType = {
    id: number
    event: string
    seats: SeatType[]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const selectionId = Number(params.selectionId);
    const selectionRaw = await findById(selectionId);
    if (!selectionRaw) return json({ selection: null });
    const selection: SelectionType = {
        ...selectionRaw,
        seats: JSON.parse(selectionRaw.seats),
    }
    return json({ selection });
};


export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const event = formData.get("event");
    const seatsRaw = formData.get("seats");
    const seats = JSON.parse(seatsRaw as string).map((seat: SeatType) => seat.label);

    const book = await client.events.book(event as string, seats);

    console.log(book)
    return redirect(`/success`);
};

export default function Index() {
    const { selection } = useLoaderData<typeof loader>();
    if (!selection) return null;
    console.log('Selection: ', selection);
    const { seats, event } = selection;

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1>Confirm Order</h1>

            {seats ?
                <div>
                    <h2>Selected Seats</h2>
                    {seats.map((seat) => (
                        <div key={seat.label} style={{ display: 'flex', alignItems: 'center', gap: 50 }}>
                            <div>
                                <span>{seat.label}</span>
                            </div>
                            <div>
                                <span>${seat.price}</span>
                            </div>
                        </div>
                    ))}
                    <br />
                    <Form method="POST">
                        <input type="hidden" name="event" value={event} />
                        <input type="hidden" name="seats" value={JSON.stringify(seats)} />
                        <button type="submit"> Confirm Order </button>
                    </Form>

                </div> : null
            }

        </div>
    );
}



