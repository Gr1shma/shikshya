import { HydrateClient } from "~/trpc/server";
import { TestRoutersClient } from "~/app/_components/test-routers-client";

export default async function Home() {
    return (
        <HydrateClient>
            <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
                <header className="space-y-1">
                    <h1 className="text-2xl font-semibold">
                        Router Test Panel
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Use the buttons below to call each CRUD endpoint.
                    </p>
                </header>
                <TestRoutersClient />
            </main>
        </HydrateClient>
    );
}
