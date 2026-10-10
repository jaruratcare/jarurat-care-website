<script>
    import { onMount } from "svelte";
    import logo from "$lib/assets/our-journey-logo.png";
    import photo1 from "$lib/assets/journey-1.png"; // Dec 2023 (LEFT)
    import photo2 from "$lib/assets/journey-2.png"; // 2024 Priyanka (RIGHT)
    import photo3 from "$lib/assets/journey-3.png"; // 2024 Action (LEFT)

    let container;
    let connector;

    // The connector is only drawn on larger layouts, starting at `lg`.
    const DESKTOP_QUERY = "(min-width: 1024px)";
    const CLEARANCE = 22;
    const EDGE_PADDING = 12;
    const TITLE_GAP = 6;
    const INTRO_RADIUS = 36;
    const EXIT_RADIUS = 90;
    const ARROW_SIZE = 15;
    const ARROW_GAP = 12;

    const f = (v) => Math.round(v * 100) / 100;

    function buildPath({ width, title, images, bars, minX, maxX }) {
        const mid = width / 2;
        const sides = images.map((img) => (img.cx < mid ? "left" : "right"));

        const offset = bars[0].cy - images[0].bottom;
        const runs = [images[0].top - offset, ...bars.slice(0, images.length).map((b) => b.cy)];

        const trunkX = bars[images.length].cx;
        const startY = title.bottom + TITLE_GAP;

        const intro = Math.max(1, Math.min(INTRO_RADIUS, runs[0] - startY));
        const introDir = sides[0] === "left" ? -1 : 1;
        let d =
            `M ${f(trunkX)} ${f(startY)} V ${f(runs[0] - intro)} ` +
            `A ${f(intro)} ${f(intro)} 0 0 ${introDir === -1 ? 1 : 0} ${f(trunkX + introDir * intro)} ${f(runs[0])}`;

        const clears = (rho, gutter, gap) => {
            if (gutter < CLEARANCE || gap < CLEARANCE) return false;
            if (rho <= gutter || rho <= gap) return true;
            return Math.hypot(rho - gutter, rho - gap) <= rho - CLEARANCE;
        };

        images.forEach((img, i) => {
            const yA = runs[i];
            const yB = runs[i + 1];
            const isLeft = sides[i] === "left";
            const r = (yB - yA) / 2;
            const top = img.top - yA;
            const bottom = yB - img.bottom;

            const needed = (gap) =>
                r - Math.sqrt(Math.max(0, (r - CLEARANCE) ** 2 - (r - gap) ** 2));
            const ideal = Math.max(needed(top), needed(bottom), r * 0.72);
            const room = Math.max(0, isLeft ? img.left - minX : maxX - img.right);
            const gutter = Math.min(ideal, room);

            let rho = r;
            while (rho > 4 && !(clears(rho, gutter, top) && clears(rho, gutter, bottom))) rho -= 1;

            const xE = isLeft ? img.left - gutter : img.right + gutter;
            const away = isLeft ? -1 : 1;
            const sweep = isLeft ? 0 : 1;
            d +=
                ` H ${f(xE - away * rho)}` +
                ` A ${f(rho)} ${f(rho)} 0 0 ${sweep} ${f(xE)} ${f(yA + rho)}` +
                ` V ${f(yB - rho)}` +
                ` A ${f(rho)} ${f(rho)} 0 0 ${sweep} ${f(xE - away * rho)} ${f(yB)}`;
        });

        const n = images.length;
        const exitDir = sides[n - 1] === "left" ? 1 : -1;
        const y = runs[n];
        const tipY = bars[n].top - ARROW_GAP;
        const lastBar = bars[n - 1];
        const barEdge = exitDir === 1 ? lastBar.right : lastBar.left;
        const exit = Math.max(
            1,
            Math.min(EXIT_RADIUS, Math.abs(trunkX - barEdge) - 16, tipY - y - ARROW_SIZE - 16)
        );
        d +=
            ` H ${f(trunkX - exitDir * exit)}` +
            ` A ${f(exit)} ${f(exit)} 0 0 ${exitDir === 1 ? 1 : 0} ${f(trunkX)} ${f(y + exit)}` +
            ` V ${f(tipY)}` +
            ` M ${f(trunkX - ARROW_SIZE)} ${f(tipY - ARROW_SIZE)}` +
            ` L ${f(trunkX)} ${f(tipY)}` +
            ` L ${f(trunkX + ARROW_SIZE)} ${f(tipY - ARROW_SIZE)}`;

        return d;
    }

    function updateConnector() {
        if (!container || !connector) return;

        if (!window.matchMedia(DESKTOP_QUERY).matches) {
            connector.setAttribute("d", "");
            return;
        }

        const origin = container.getBoundingClientRect();
        const measure = (el) => {
            const r = el.getBoundingClientRect();
            const left = r.left - origin.left;
            const top = r.top - origin.top;
            return {
                left,
                right: left + r.width,
                top,
                bottom: top + r.height,
                cx: left + r.width / 2,
                cy: top + r.height / 2,
            };
        };

        const titleEl = container.querySelector("[data-journey-title]");
        const images = [...container.querySelectorAll("[data-journey-image]")].map(measure);
        const bars = [...container.querySelectorAll("[data-journey-bar]")].map(measure);
        if (!titleEl || images.length < 1 || bars.length !== images.length + 1) return;

        const viewportWidth = document.documentElement.clientWidth;
        const d = buildPath({
            width: origin.width,
            title: measure(titleEl),
            images,
            bars,
            minX: EDGE_PADDING - origin.left,
            maxX: viewportWidth - EDGE_PADDING - origin.left,
        });
        connector.setAttribute("d", d);
    }

    onMount(() => {
        let frame = 0;
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(updateConnector);
        };

        const observer = new ResizeObserver(schedule);
        observer.observe(container);
        container
            .querySelectorAll("[data-journey-title], [data-journey-image], [data-journey-bar]")
            .forEach((el) => observer.observe(el));

        // Re-measure after images and fonts finish loading so the line stays aligned.
        const images = [...container.querySelectorAll("img")];
        images.forEach((img) => img.addEventListener("load", schedule));
        window.addEventListener("resize", schedule);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);

        updateConnector();
        schedule();

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            images.forEach((img) => img.removeEventListener("load", schedule));
            window.removeEventListener("resize", schedule);
        };
    });
</script>

<div class="w-full bg-[#0F52BA] py-16 px-4 md:px-10 text-white relative overflow-hidden">
    <div bind:this={container} class="max-w-5xl mx-auto relative">
        <div class="hidden lg:block absolute inset-0 pointer-events-none z-0" aria-hidden="true">
            <svg class="absolute inset-0 w-full h-full overflow-visible" fill="none">
                <path
                    bind:this={connector}
                    d=""
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                />
            </svg>
        </div>

        <!-- 1. HEADER & LOGO -->
        <div class="flex flex-col items-center mb-16 relative z-10">
            <img src={logo} alt="Our Journey Logo" class="w-24 h-24 md:w-30 md:h-30 mb-3 object-contain" />
            <h2 data-journey-title class="text-3xl md:text-5xl font-extrabold text-white tracking-wide">Our Journey</h2>
        </div>

        <!-- 2. TIMELINE CONTENT STACK -->
        <div class="relative z-10 flex flex-col gap-20 md:gap-28 lg:gap-0 pt-4">
            <!-- STEP 1: LEFT ALIGNED -->
            <div class="w-full flex justify-start md:pl-12 lg:pl-24 lg:items-start lg:h-[18.375rem]">
                <div class="w-full max-w-[360px] flex flex-col items-center text-center">
                    <div data-journey-image class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 lg:mb-8 bg-white/10">
                        <img src={photo1} alt="December 2023" class="w-full h-52 md:h-56 object-cover rounded-3xl" />
                    </div>
                    <!-- Yellow bar sits over the connector line. -->
                    <div data-journey-bar class="w-28 h-1.5 bg-[#FFC107] mb-4 rounded-full relative z-20"></div>
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2023, December</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">Our story began with a personal loss.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        We lost our mother to cholangiocarcinoma after a seven-month battle.
                    </p>
                </div>
            </div>

            <!-- STEP 2: RIGHT ALIGNED -->
            <div class="w-full flex justify-end md:pr-12 lg:pr-24 lg:items-start lg:h-[18.375rem]">
                <div class="w-full max-w-[360px] flex flex-col items-center text-center">
                    <div data-journey-image class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 lg:mb-8 bg-white/10">
                        <img src={photo2} alt="Priyanka Founder" class="w-full h-52 md:h-56 object-cover rounded-3xl" />
                    </div>
                    <div data-journey-bar class="w-28 h-1.5 bg-[#FFC107] mb-4 rounded-full relative z-20"></div>
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2024</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">Priyanka begins the journey.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        As Founder of Jarurat Care Foundation, Priyanka's firsthand experience with cancer drove her to uncover what patients and families truly need.
                    </p>
                </div>
            </div>

            <!-- STEP 3: LEFT ALIGNED -->
            <div class="w-full flex justify-start md:pl-12 lg:pl-24">
                <div class="w-full max-w-[360px] flex flex-col items-center text-center">
                    <div data-journey-image class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 lg:mb-8 bg-white/10">
                        <img src={photo3} alt="Community Initiatives" class="w-full h-52 md:h-56 object-cover rounded-3xl" />
                    </div>
                    <div data-journey-bar class="w-28 h-1.5 bg-[#FFC107] mb-4 rounded-full relative z-20"></div>
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2024</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">From insight to action.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        We shaped a clear vision for support initiatives and started building community-led programs.
                    </p>
                </div>
            </div>

            <!-- STEP 4: CENTERED 2026; the connector arrow points to this bar. -->
            <div class="w-full flex justify-center text-center pt-8">
                <div class="flex flex-col items-center max-w-xs">
                    <div data-journey-bar class="w-28 h-1.5 mt-2 mb-5 rounded-full relative z-20"></div>
                    <h3 class="text-2xl font-black text-white mb-1 tracking-wide">2026</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">Expanding</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        Reaching more lives through ongoing care and support.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>