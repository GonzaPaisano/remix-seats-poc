import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";



export const meta: MetaFunction = () => {
  return [
    { title: "Paisatickets" },
    { name: "description", content: "Welcome to Paisatickets!" },
  ];
};


export default function Index() {

  return (
    <div style={{ display: "flex", flexDirection: 'column', placeItems: 'center' }}>
      <h1>Welcome to Paisatickets</h1>
      <div style={{ display: 'flex', placeItems: 'center' }}>
        <Link to="/event" style={{ textDecoration: 'none' }} >
          <div style={{ padding: 4, border: '1px solid black', borderRadius: '5px', }}>
            Upcoming Events!
          </div>
        </Link>
      </div >
    </div >
  );
}
