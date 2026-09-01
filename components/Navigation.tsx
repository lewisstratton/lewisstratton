"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "./TransitionLink";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { markIntroPlayed } from "@/lib/intro";
import { EASE, EASE_IN } from "@/lib/motion";
import type { Article, SiteSettings } from "@/lib/sanity/types";
import ArticleOverlay from "./ArticleOverlay";

const mobileMenuContainer = {
    hidden: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: EASE,
            staggerChildren: 0.06,
            delayChildren: 0.08,
        },
    },
};

const mobileMenuItem = {
    hidden: { opacity: 0, x: -10, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: EASE },
    },
};

function CreditList({ label, entries }: { label: string; entries: string[] }) {
    return (
        <div>
            <span className="opacity-40 block mb-2 tracking-tighter text-[10px]">{label}</span>
            <p className="leading-relaxed">
                {entries.map((entry, index) => (
                    <span key={entry + index}>
                        {entry}
                        {index < entries.length - 1 && <span className="opacity-30"> / </span>}
                    </span>
                ))}
            </p>
        </div>
    );
}

export default function Navigation({
    settings,
    articles,
}: {
    settings: SiteSettings;
    articles: Article[];
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isArticlesOpen, setIsArticlesOpen] = useState(false);
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);

    function openArticle(article: Article) {
        setActiveArticle(article);
        setIsArticlesOpen(false);
        setIsMobileMenuOpen(false);
    }

    const preloaderContentRef = useRef<HTMLDivElement>(null);
    const countDesktopRef = useRef<HTMLSpanElement>(null);
    const countMobileRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const counter = { val: 0 };

        gsap.timeline({
            onComplete: () => {
                markIntroPlayed();
                setIsLoading(false);
            },
        })
            .to(counter, {
                val: 100,
                duration: 2,
                ease: "none",
                onUpdate: () => {
                    const v = Math.round(counter.val);
                    if (countDesktopRef.current) countDesktopRef.current.textContent = `[${v}%]`;
                    if (countMobileRef.current) countMobileRef.current.textContent = `${v}%`;
                },
            })
            .to(preloaderContentRef.current, {
                opacity: 0,
                y: -10,
                filter: "blur(5px)",
                duration: 0.5,
                ease: EASE_IN,
            });
    });

    const navItemClass = "hover:opacity-50 transition-opacity duration-300 cursor-pointer block";
    const panelHeaderClass = "flex lg:hidden fixed top-0 left-0 right-0 w-full px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-6 justify-between items-start font-mono text-[10px] tracking-tighter z-50 text-foreground";
    const mobileLinkClass = "block text-left py-[1.125rem] pr-12 font-bold leading-none cursor-pointer transition-opacity duration-300 hover:opacity-50 active:opacity-50";

    const mobileMenuItems: {
        label: string;
        href?: string;
        onSelect?: () => void;
        expandsArticles?: boolean;
    }[] = [
            { label: "Credits", href: "/credits" },
            { label: "Articles", expandsArticles: true },
            { label: "About", onSelect: () => setIsAboutOpen(true) },
            { label: "Contact", onSelect: () => setIsContactOpen(true) },
        ];

    useEffect(() => {
        if (isMobileMenuOpen || isLoading || isAboutOpen || isContactOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen, isLoading, isAboutOpen, isContactOpen]);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.0, ease: EASE }}
                        className="fixed inset-0 z-40 bg-background pointer-events-none select-none text-foreground font-mono text-xs tracking-tighter"
                    >
                        <div ref={preloaderContentRef} className="absolute inset-0">
                            <div className="font-medium absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                                {settings.role}
                            </div>
                            <span
                                ref={countDesktopRef}
                                className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 tabular-nums font-medium"
                            >
                                [0%]
                            </span>
                            <span
                                ref={countMobileRef}
                                className="lg:hidden absolute right-6 top-6 mt-1 font-medium"
                            >
                                0%
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isArticlesOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="hidden lg:block fixed inset-0 z-30 backdrop-blur-xl bg-background/60"
                        onClick={() => setIsArticlesOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div className="hidden lg:block fixed inset-0 z-50 pointer-events-none select-none text-foreground font-mono text-xs tracking-tighter leading-tight">

                <div className="absolute top-0 bottom-0 left-0 w-[25%] flex flex-col justify-center px-8 xl:px-12 border-r border-transparent">
                    <AnimatePresence mode="wait">
                        {isContactOpen ? (
                            <motion.div
                                key="contact-left"
                                initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="pointer-events-auto relative"
                            >
                                <a href={settings.instagramUrl ?? "#"} target="_blank" rel="noopener noreferrer" className={`${navItemClass} font-bold`}>{settings.instagramHandle}</a>
                                <div className="absolute top-full mt-6 flex flex-col gap-1">
                                    <span>{settings.shortTagline}</span>
                                    <a href={`mailto:${settings.email}`} className={navItemClass}>{settings.email}</a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="default-left"
                                initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="pointer-events-auto flex gap-12 items-center"
                            >
                                <div className="font-bold whitespace-nowrap">
                                    <TransitionLink href="/" className={navItemClass}>{settings.name}</TransitionLink>
                                </div>

                                <AnimatePresence>
                                    {!isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                            transition={{ duration: 1, delay: 0.1, ease: EASE }}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={isAboutOpen ? "about-close" : "list"}
                                                    initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                                    transition={{ duration: 0.4, ease: EASE }}
                                                >
                                                    {isAboutOpen ? (
                                                        <button onClick={() => setIsAboutOpen(false)} className={navItemClass}>Close</button>
                                                    ) : (
                                                        <TransitionLink href="/credits" className={navItemClass}>Credits</TransitionLink>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="absolute top-0 bottom-0 right-0 w-[25%] flex flex-col justify-center px-8 xl:px-12">
                    <AnimatePresence mode="wait">
                        {isContactOpen ? (
                            <motion.div
                                key="contact-right"
                                initial={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="pointer-events-auto relative flex flex-col gap-1"
                            >
                                <span className="font-bold">{settings.location}</span>
                            </motion.div>
                        ) : !isLoading && !isAboutOpen && !isContactOpen ? (
                            <motion.div
                                key="default-right"
                                initial={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                                transition={{ duration: 0.3, delay: 0.15, ease: EASE }}
                                className="pointer-events-auto flex justify-between w-full"
                            >
                                <div className="flex gap-12">
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsArticlesOpen(!isArticlesOpen)}
                                            className={navItemClass}
                                        >
                                            Articles
                                        </button>

                                        <AnimatePresence>
                                            {isArticlesOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                                                    transition={{ duration: 0.4, ease: EASE }}
                                                    className="absolute right-full top-0 mr-12 flex flex-col items-end gap-3 text-right whitespace-nowrap"
                                                >
                                                    {articles.map((article) => (
                                                        <button
                                                            key={article.slug}
                                                            onClick={() => openArticle(article)}
                                                            className={`${navItemClass} text-right`}
                                                        >
                                                            {article.title}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <button onClick={() => setIsAboutOpen(true)} className={navItemClass}>About</button>
                                </div>

                                <button onClick={() => setIsContactOpen(true)} className={navItemClass}>Contact</button>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {!isAboutOpen && !isContactOpen && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex lg:hidden fixed top-0 left-0 right-0 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-6 justify-between items-start font-mono text-[10px] tracking-tighter w-full pointer-events-auto z-50 text-foreground"
                    >
                        <div className="font-bold whitespace-nowrap z-50 flex flex-col items-start flex-1 min-w-0">
                            <TransitionLink href="/" onClick={() => setIsMobileMenuOpen(false)}>{settings.name}</TransitionLink>

                            <AnimatePresence>
                                {isMobileMenuOpen && (
                                    <motion.nav
                                        variants={mobileMenuContainer}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="flex flex-col items-start mt-2"
                                    >
                                        {mobileMenuItems.map((item) => (
                                            <motion.div key={item.label} variants={mobileMenuItem}>
                                                {item.href ? (
                                                    <TransitionLink
                                                        href={item.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={mobileLinkClass}
                                                    >
                                                        {item.label}
                                                    </TransitionLink>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (item.expandsArticles) {
                                                                setIsArticlesOpen(!isArticlesOpen);
                                                                return;
                                                            }
                                                            setIsMobileMenuOpen(false);
                                                            item.onSelect?.();
                                                        }}
                                                        className={mobileLinkClass}
                                                    >
                                                        {item.label}
                                                    </button>
                                                )}

                                                {item.expandsArticles && (
                                                    <AnimatePresence>
                                                        {isArticlesOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                                exit={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                                                transition={{ duration: 0.4, ease: EASE }}
                                                                className="flex flex-col items-start pb-2"
                                                            >
                                                                {articles.map((article) => (
                                                                    <button
                                                                        key={article.slug}
                                                                        onClick={() => openArticle(article)}
                                                                        className={`${mobileLinkClass} font-normal opacity-40 whitespace-nowrap`}
                                                                    >
                                                                        {article.title}
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.nav>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="z-50 text-right">
                            <AnimatePresence>
                                {!isLoading && (
                                    <motion.button
                                        key="menu-btn"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        className="font-bold tracking-tighter hover:opacity-50 transition-opacity duration-300"
                                    >
                                        {isMobileMenuOpen ? "Close" : "Menu"}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="fixed inset-0 z-30 lg:hidden backdrop-blur-xl bg-background/30"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="fixed top-0 left-0 right-0 h-[50svh] z-40 lg:hidden bg-background border-b border-foreground/10"
                        />
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isContactOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE } }}
                            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.25, ease: EASE } }}
                            className="fixed inset-0 z-30 backdrop-blur-xl bg-background/60"
                            onClick={() => setIsContactOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, filter: "blur(6px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, delay: 0.08, ease: EASE } }}
                            exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE } }}
                            className="fixed inset-0 z-40 lg:hidden overflow-y-auto overscroll-contain px-6 py-24"
                            data-lenis-prevent
                        >
                            <div className="w-full max-w-md mx-auto">
                                <div className="font-mono text-xs leading-relaxed tracking-tight text-foreground/80 flex flex-col gap-8">
                                    <p>{settings.tagline}</p>

                                    <div className="flex flex-col gap-1 tracking-tighter text-[10px]">
                                        <a href={`mailto:${settings.email}`} className={navItemClass}>
                                            <span className="opacity-40">Mail</span> {settings.email}
                                        </a>
                                        <a href={settings.instagramUrl ?? "#"} target="_blank" rel="noopener noreferrer" className={navItemClass}>
                                            <span className="opacity-40">Instagram</span> {settings.instagramHandle}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.08, ease: EASE } }}
                            exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
                            className={panelHeaderClass}
                        >
                            <span className="font-bold whitespace-nowrap">{settings.name}</span>
                            <button
                                onClick={() => setIsContactOpen(false)}
                                className="font-bold hover:opacity-50 transition-opacity duration-300"
                            >
                                Close
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isAboutOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE } }}
                            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.25, ease: EASE } }}
                            className="fixed inset-0 z-30 backdrop-blur-xl bg-background/60"
                            onClick={() => setIsAboutOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, filter: "blur(6px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, delay: 0.08, ease: EASE } }}
                            exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE } }}
                            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain px-6 lg:px-0 pt-24 pb-24 lg:pt-[calc(50vh-9.75px)]"
                            data-lenis-prevent
                        >
                            <div className="w-full max-w-md mx-auto">
                                <div className="font-mono text-xs leading-relaxed tracking-tight text-foreground/80 flex flex-col gap-8">
                                    <p>{settings.tagline}</p>

                                    <div className="flex flex-col gap-1 tracking-tighter text-[10px]">
                                        <a href={`mailto:${settings.email}`} className={navItemClass}>
                                            <span className="opacity-40">Mail</span> {settings.email}
                                        </a>
                                        <a href={settings.instagramUrl ?? "#"} target="_blank" rel="noopener noreferrer" className={navItemClass}>
                                            <span className="opacity-40">Instagram</span> {settings.instagramHandle}
                                        </a>
                                    </div>

                                    <CreditList label="Selected Publications" entries={settings.publications} />
                                    <CreditList label="Selected Talent" entries={settings.talent} />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.08, ease: EASE } }}
                            exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
                            className={panelHeaderClass}
                        >
                            <span className="font-bold whitespace-nowrap">{settings.name}</span>
                            <button
                                onClick={() => setIsAboutOpen(false)}
                                className="font-bold hover:opacity-50 transition-opacity duration-300"
                            >
                                Close
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <ArticleOverlay article={activeArticle} onClose={() => setActiveArticle(null)} />
        </>
    );
}
