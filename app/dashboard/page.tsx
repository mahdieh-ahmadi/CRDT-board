"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/general/Button";
import { Container } from "@/components/general/Container";
import { Navbar } from "@/components/general/Navbar";
import { Modal } from "@/components/general/Modal";

type Board = {
    title: string;
    lastModified: string;
    shared: boolean;
    lastViewedDaysAgo: number;
    previewImageUrl?: string;
    id: string | number;
};

const boards: Board[] = [
    {
        title: "Product roadmap Q1",
        lastModified: "2025-02-04",
        shared: true,
        lastViewedDaysAgo: 1,
        id: "product-roadmap-q1"
    },
    {
        title: "Research synthesis",
        lastModified: "2025-01-28",
        shared: true,
        lastViewedDaysAgo: 3,
        id: "research-synthesis"
    },
    {
        title: "Engineering retro",
        lastModified: "2025-01-18",
        shared: false,
        lastViewedDaysAgo: 9,
        id: "engineering-retro"
    },
    {
        title: "Growth experiments",
        lastModified: "2024-12-12",
        shared: false,
        lastViewedDaysAgo: 30,
        id: "growth-experiments"
    },
];

type Filter = "recent" | "shared" | "all";

export default function Dashboard() {
    const [filter, setFilter] = useState<Filter>("recent");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const router = useRouter();

    const filteredBoards = useMemo(() => {
        return boards.filter((board) => {
            if (filter === "all") return true;
            if (filter === "shared") return board.shared;
            // recent: viewed within last 14 days
            return board.lastViewedDaysAgo <= 14;
        });
    }, [filter]);

    const handleCreate = () => {
        const name = newBoardName.trim();
        if (!name) return;
        const id =
            typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : Date.now().toString();
        setIsModalOpen(false);
        setNewBoardName("");
        router.push(`/board?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`);
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
            <Navbar />
            <main className="py-10">
                <Container className="space-y-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                Pick a board to jump back in or create a new one.
                            </p>
                        </div>
                        <Button onClick={() => setIsModalOpen(true)}>New board</Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {[
                            { key: "recent", label: "Recently viewed" },
                            { key: "shared", label: "Shared boards" },
                            { key: "all", label: "All" },
                        ].map(({ key, label }) => {
                            const active = filter === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key as Filter)}
                                    className={[
                                        "rounded-full border px-4 py-2 text-sm transition cursor-pointer",
                                        active
                                            ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                                            : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900",
                                    ].join(" ")}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBoards.map((board) => (
                            <Link
                                href={`/board?id=${board.id}`}
                                key={board.title}
                                className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950"
                            >
                                {board.previewImageUrl ? (
                                    <img
                                        src={board.previewImageUrl}
                                        alt={`${board.title} preview`}
                                        className="mb-2 h-36 w-full rounded-xl object-cover border border-zinc-100 dark:border-zinc-900"
                                    />
                                ) : (
                                    <div className="mb-2 h-36 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 text-sm">
                                        No preview
                                    </div>
                                )}
                                <div className="flex items-start justify-between gap-2">
                                    <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                                        {board.title}
                                    </h2>
                                    {board.shared ? (
                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                                            Shared
                                        </span>
                                    ) : null}
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Last modified {board.lastModified}
                                </p>
                            </Link>
                        ))}
                        {filteredBoards.length === 0 ? (
                            <div className="col-span-full rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                                No boards match this filter yet.
                            </div>
                        ) : null}
                    </div>
                </Container>
            </main>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create a new board"
                primaryAction={{
                    label: "Create",
                    onClick: handleCreate,
                    disabled: !newBoardName.trim(),
                }}
                secondaryAction={{
                    label: "Cancel",
                    onClick: () => setIsModalOpen(false),
                }}
            >
                <label className="space-y-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Board name
                    <input
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        placeholder="e.g. Growth strategy"
                        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
                    />
                </label>
            </Modal>
        </div>
    );
}