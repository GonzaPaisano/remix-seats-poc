import { isRouteErrorResponse, useRouteError, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json, redirect, type ActionFunctionArgs, type MetaFunction, } from "@remix-run/node";
import Chart from "~/common/components/Chart";
import { events } from "~/common/eventMocks";
import { selectSeats } from "~/common/utils/seats";


export const meta: MetaFunction = () => {
    return [
        { title: "Seats Selection - Paisatickets" },
    ];
};


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { eventId } = params;
    const eventData = events.find(e => e.event === eventId);
    if (!eventData) throw new Error("Event not found");
    return json({ eventData });
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const selectedObjects = formData.get("selectedObjects");
    const event = formData.get("event");

    const selectionId = await selectSeats(event as string, selectedObjects as string);

    return redirect(`/checkout/${selectionId}`);
};

export default function Index() {
    const { eventData } = useLoaderData<typeof loader>();

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Chart eventData={eventData} />
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return <div> Event not Found. Please select another </div>
    }
    return <div />
}


