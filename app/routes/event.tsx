import { json, type MetaFunction, } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { events } from "~/common/eventMocks";


export const meta: MetaFunction = () => {
    return [
        { title: "Paisatickets" },
        { name: "description", content: "Welcome to Paisatickets!" },
    ];
};

export const loader = async () => {
    return json({ events });
};

export default function Index() {
    const { events } = useLoaderData<typeof loader>();

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <div style={{ display: 'flex', placeItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <h2> Upcoming Events:</h2>
                    <ul>
                        {events.map((event) => (
                            <Link to={`/event/${event.event}`} key={event.event}>
                                <li>{event.event}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1 }}> <Outlet /> </div>
            </div>
        </div>
    );
}
