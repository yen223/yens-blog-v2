import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, redirect, useRouteError } from "@remix-run/react";
import { isRouteErrorResponse } from "@remix-run/react";
import { z } from "zod";
import { Container } from "~/components/Container";

const ParamZ = z.object({
    catchall: z.string(),
});

// This redirect exists to support the legacy URL system, before the /articles/ prefix was introduced.
export async function loader({ params }: LoaderFunctionArgs) {
    const redirects = {
        "smart-constructors": "/articles/smart-constructors",
        "a-gentle-introduction-to-functors": "/articles/a-gentle-introduction-to-functors",
        "set-up-ubuntu-server": "/articles/set-up-ubuntu-server",
        "on-professional-communications": "/articles/on-professional-communications",
        "a-reflection-on-my-masters-course": "/articles/a-reflection-on-my-masters-course",
    };
    const { catchall } = ParamZ.parse(params);
    const redirectUrl = redirects[catchall as keyof typeof redirects];
    if (redirectUrl) {
        return redirect(redirectUrl, 302);
    } else {
        throw new Response("The link you followed is either outdated or incorrect.", { status: 404 });
    }
}

export function ErrorBoundary() {
    const error = useRouteError();
    const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Something went wrong";
    const message = isRouteErrorResponse(error) ? error.data : "Sorry, an unexpected error occurred.";
    return (
        <Container>
            <div className="flex flex-col prose dark:prose-invert" >
                <h2>{title} </h2>
                <p> {message} </p>
                <Link to="/"> Go back to the home page </Link>
            </div>
        </Container>
    )
}