"use client";

import { UserProfile } from "@clerk/nextjs";
import { Container } from "@/components/general/Container";
import { Navbar } from "@/components/general/Navbar";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
            <Navbar />
            <main className="py-10">
                <Container className="max-w-4xl flex justify-center">
                    <UserProfile routing="path" path="/profile" />
                </Container>
            </main>
        </div>
    );
}

