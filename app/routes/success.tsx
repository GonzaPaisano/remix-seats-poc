import { MetaFunction } from "@remix-run/node";


export const meta: MetaFunction = () => {
    return [
        { title: "Paisatickets" },
        { name: "description", content: "Welcome to Paisatickets!" },
    ];
};


export default function SuccessRoute() {
    return (
        <div style={{ display: "flex", flexDirection: 'column', placeItems: 'center' }}>
            <h1>Grasia!</h1>
        </div >
    );
}
