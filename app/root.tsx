import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ background: '#F1F1F1', maxWidth: 1000, margin: '0 auto', fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <header style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }} ><h1>Paisatickets</h1></Link>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
