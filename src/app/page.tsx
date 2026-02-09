import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { getSession } from "~/server/better-auth/server";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
    const session = await getSession();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <HydrateClient>
            <Button>ShikShya</Button>
        </HydrateClient>
    );
}
