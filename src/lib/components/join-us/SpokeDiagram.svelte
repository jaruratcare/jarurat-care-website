<script>
    import FocusAreaConnectors from '$lib/svg/focus-area-connectors.svg';

    import jaruratCareLogo from '$lib/assets/icons/jarurat-care-logo.svg';
    import designIcon from '$lib/assets/icons/design-icon.svg';
    import technologyIcon from '$lib/assets/icons/technology-icon.svg';
    import businessIcon from '$lib/assets/icons/business-icon.svg';
    import hrIcon from '$lib/assets/icons/hr-icon.svg';
    import marketingIcon from '$lib/assets/icons/marketing-icon.svg';

    export let center = "Jarurat Care";
</script>

<section
    class="w-full bg-[#d9edff] px-4 sm:px-6 py-16 md:px-10 md:py-20 lg:px-16 overflow-hidden box-border"
>
    <!-- ========================= -->
    <!-- SECTION HEADING -->
    <!-- ========================= -->

    <div class="mx-auto text-center px-2">
        <h2
            class="font-bold leading-tight text-3xl sm:text-4xl md:text-[42px]"
            style="color: rgba(12, 31, 86, 1);"
        >
            Our Focus Areas
        </h2>

        <p
            class="mt-3 font-semibold text-base sm:text-lg md:text-[20px]"
            style="color: rgba(107, 114, 128, 1);"
        >
            Explore the areas where Jarurat Care is making a difference.
        </p>
    </div>


    <!-- ========================= -->
    <!-- MAIN DIAGRAM -->
    <!-- ========================= -->

    <div
        class="
            mx-auto
            mt-10
            md:mt-16
            grid
            w-full
            max-w-[1305px]
            grid-cols-1
            lg:grid-cols-[340px_395px_568px]
            items-center
            justify-center
            gap-8
            lg:gap-0
        "
    >

        <!-- ========================= -->
        <!-- JARURAT CARE CARD -->
        <!-- ========================= -->

        <div
            class="
                relative
                z-10
                flex
                h-[180px]
                sm:h-[200px]
                lg:h-[240px]
                w-full
                max-w-[340px]
                mx-auto
                lg:mx-0
                shrink-0
                items-center
                justify-center
                rounded-[24px]
                bg-white
                shadow-[0_8px_18px_rgba(0,0,0,0.16)]
                box-border
            "
        >
            <img
                src={jaruratCareLogo}
                alt={center}
                class="h-auto w-[200px] sm:w-[220px] lg:w-[250px] object-contain"
            />
        </div>


        <!-- ===================================== -->
        <!-- CONNECTOR AREA (Hidden on Mobile/Tablet) -->
        <!-- ===================================== -->

        <div
            class="
                relative
                hidden
                lg:block
                h-[479px]
                w-[395px]
            "
        >
            <img
                src={FocusAreaConnectors}
                alt=""
                aria-hidden="true"
                class="
                    pointer-events-none
                    absolute
                    z-0
                "
                style="
                    width: 294px;
                    height: 479px;
                    left: 25px;
                    top: 50%;
                    transform: translateY(-50%);
                "
            />
        </div>


        <!-- ===================================== -->
        <!-- FOCUS AREA CARDS -->
        <!-- ===================================== -->

        <div
            class="
                relative
                z-10
                flex
                w-full
                lg:w-[568px]
                lg:-translate-x-[20px]
                flex-col
                gap-4
                sm:gap-6
                box-border
            "
        >

            <!-- ========================= -->
            <!-- 1. DESIGN & CREATIVE -->
            <!-- ========================= -->

            <div
                class="
                    relative
                    z-10
                    flex
                    h-auto
                    min-h-[90px]
                    sm:h-[100px]
                    w-full
                    items-center
                    rounded-[16px]
                    bg-white
                    px-4
                    sm:px-6
                    py-4
                    sm:py-0
                    shadow-[0_6px_14px_rgba(0,0,0,0.14)]
                    box-border
                "
            >
                <div
                    class="
                        flex
                        h-[42px]
                        w-[42px]
                        sm:h-[48px]
                        sm:w-[48px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#e9efff]
                    "
                >
                    <img
                        src={designIcon}
                        alt=""
                        aria-hidden="true"
                        class="h-8 w-8 sm:h-12 sm:w-12 object-contain"
                    />
                </div>

                <div class="ml-3 sm:ml-4 overflow-hidden">
                    <h3
                        class="font-bold leading-tight text-lg sm:text-[20px]"
                        style="color: rgba(12, 31, 86, 1);"
                    >
                        Design & Creative Side
                    </h3>

                    <p
                        class="mt-1 sm:mt-2 text-xs sm:text-sm md:text-[16px] text-gray-500 leading-normal"
                    >
                        UI/UX Design · Graphic Design · Creative Design
                    </p>
                </div>
            </div>


            <!-- ========================= -->
            <!-- 2. TECHNOLOGY -->
            <!-- ========================= -->

            <div
                class="
                    relative
                    z-10
                    flex
                    h-auto
                    min-h-[90px]
                    sm:h-[100px]
                    w-full
                    items-center
                    rounded-[16px]
                    bg-white
                    px-4
                    sm:px-6
                    py-4
                    sm:py-0
                    shadow-[0_6px_14px_rgba(0,0,0,0.14)]
                    box-border
                "
            >
                <div
                    class="
                        flex
                        h-[42px]
                        w-[42px]
                        sm:h-[48px]
                        sm:w-[48px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#e9efff]
                    "
                >
                    <img
                        src={technologyIcon}
                        alt=""
                        aria-hidden="true"
                        class="h-8 w-8 sm:h-12 sm:w-12 object-contain"
                    />
                </div>

                <div class="ml-3 sm:ml-4 overflow-hidden">
                    <h3
                        class="font-bold leading-tight text-lg sm:text-[20px]"
                        style="color: rgba(12, 31, 86, 1);"
                    >
                        Technology & Automation
                    </h3>

                    <p
                        class="mt-1 sm:mt-2 text-xs sm:text-sm md:text-[16px] text-gray-500 leading-normal"
                    >
                        Python Automation · Automation & Operations
                    </p>
                </div>
            </div>


            <!-- ========================= -->
            <!-- 3. BUSINESS -->
            <!-- ========================= -->

            <div
                class="
                    relative
                    z-10
                    flex
                    h-auto
                    min-h-[90px]
                    sm:h-[100px]
                    w-full
                    items-center
                    rounded-[16px]
                    bg-white
                    px-4
                    sm:px-6
                    py-4
                    sm:py-0
                    shadow-[0_6px_14px_rgba(0,0,0,0.14)]
                    box-border
                "
            >
                <div
                    class="
                        flex
                        h-[42px]
                        w-[42px]
                        sm:h-[48px]
                        sm:w-[48px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#e9efff]
                    "
                >
                    <img
                        src={businessIcon}
                        alt=""
                        aria-hidden="true"
                        class="h-8 w-8 sm:h-12 sm:w-12 object-contain"
                    />
                </div>

                <div class="ml-3 sm:ml-4 overflow-hidden">
                    <h3
                        class="font-bold leading-tight text-lg sm:text-[20px]"
                        style="color: rgba(12, 31, 86, 1);"
                    >
                        Business & Operations
                    </h3>

                    <p
                        class="mt-1 sm:mt-2 text-xs sm:text-sm md:text-[16px] text-gray-500 leading-normal"
                    >
                        Business Development · Lead Generation · Partnership
                    </p>
                </div>
            </div>


            <!-- ========================= -->
            <!-- 4. HR -->
            <!-- ========================= -->

            <div
                class="
                    relative
                    z-10
                    flex
                    h-auto
                    min-h-[90px]
                    sm:h-[100px]
                    w-full
                    items-center
                    rounded-[16px]
                    bg-white
                    px-4
                    sm:px-6
                    py-4
                    sm:py-0
                    shadow-[0_6px_14px_rgba(0,0,0,0.14)]
                    box-border
                "
            >
                <div
                    class="
                        flex
                        h-[42px]
                        w-[42px]
                        sm:h-[48px]
                        sm:w-[48px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#e9efff]
                    "
                >
                    <img
                        src={hrIcon}
                        alt=""
                        aria-hidden="true"
                        class="h-8 w-8 sm:h-12 sm:w-12 object-contain"
                    />
                </div>

                <div class="ml-3 sm:ml-4 overflow-hidden">
                    <h3
                        class="font-bold leading-tight text-lg sm:text-[20px]"
                        style="color: rgba(12, 31, 86, 1);"
                    >
                        HR & People Operations
                    </h3>

                    <p
                        class="mt-1 sm:mt-2 text-xs sm:text-sm md:text-[16px] text-gray-500 leading-normal"
                    >
                        HR · Talent Acquisition · Clinical Psychology
                    </p>
                </div>
            </div>


            <!-- ========================= -->
            <!-- 5. MARKETING -->
            <!-- ========================= -->

            <div
                class="
                    relative
                    z-10
                    flex
                    h-auto
                    min-h-[90px]
                    sm:h-[100px]
                    w-full
                    items-center
                    rounded-[16px]
                    bg-white
                    px-4
                    sm:px-6
                    py-4
                    sm:py-0
                    shadow-[0_6px_14px_rgba(0,0,0,0.14)]
                    box-border
                "
            >
                <div
                    class="
                        flex
                        h-[42px]
                        w-[42px]
                        sm:h-[48px]
                        sm:w-[48px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#e9efff]
                    "
                >
                    <img
                        src={marketingIcon}
                        alt=""
                        aria-hidden="true"
                        class="h-8 w-8 sm:h-12 sm:w-12 object-contain"
                    />
                </div>

                <div class="ml-3 sm:ml-4 overflow-hidden">
                    <h3
                        class="font-bold leading-tight text-base sm:text-lg lg:text-[20px]"
                        style="color: rgba(12, 31, 86, 1);"
                    >
                        Marketing, Branding & Communications
                    </h3>

                    <p
                        class="mt-1 sm:mt-2 text-xs sm:text-sm md:text-[16px] text-gray-500 leading-normal"
                    >
                        Marketing · Social Media & content · Public Relations
                    </p>
                </div>
            </div>

        </div>
    </div>

</section>