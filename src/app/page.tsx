import { Button } from "~/components/ui/button";
import { getSession } from "~/server/better-auth/server";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
    const session = await getSession();

    if (session) {
        void api.post.getLatest.prefetch();
    }

    return (
        <HydrateClient>
            <Button>ShikShya</Button>
        </HydrateClient>
    );
}
