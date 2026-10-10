<script lang="ts">
    import awarenessIcon from '$lib/assets/icons/why-awareness.svg';
    import caregiverIcon from '$lib/assets/icons/why-caregiver.svg';
    import supportIcon from '$lib/assets/icons/why-support.svg';
    import communityIcon from '$lib/assets/icons/why-community.svg';

    const points = [
        {
            icon: awarenessIcon,
            text: 'Cancer awareness: Educating communities'
        },
        {
            icon: caregiverIcon,
            text: 'Caregiver training: Building essential skills'
        },
        {
            icon: supportIcon,
            text: 'Patient support services: Guidance throughout treatment'
        },
        {
            icon: communityIcon,
            text: 'Community building: Connecting patients and families'
        }
    ];
</script>

<section class="w-full bg-white py-12 md:py-24 overflow-hidden">

    <!-- Main section container -->
    <div class="w-[92%] sm:w-[90%] max-w-[1560px] mx-auto box-border">

        <!-- ================= SECTION HEADING ================= -->

        <div class="mx-auto mb-10 md:mb-14 max-w-3xl text-center px-2">

            <h2
                class="font-bold leading-tight text-3xl sm:text-4xl md:text-[42px]"
                style="color: rgba(12, 31, 86, 1);"
            >
                Why We Exist
            </h2>

            <p
                class="mt-3 sm:mt-4 font-semibold text-base sm:text-lg md:text-[20px] leading-relaxed"
                style="color: rgba(107, 114, 128, 1);"
            >
                Supporting patients and caregivers through education,
                <br class="hidden md:block" />
                advocacy, and collective action.
            </p>

        </div>

        <!-- ================= MAIN CARD ================= -->

        <div
            class="w-full overflow-hidden rounded-[20px] md:rounded-[24px] bg-white shadow-[0_5px_20px_rgba(0,0,0,0.11)] box-border"
        >

            <div class="grid grid-cols-1 md:grid-cols-2">

                <!-- ================= LEFT SIDE ================= -->

                <div
                    class="flex flex-col justify-center bg-white px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 box-border"
                >

                    <h3
                        class="font-medium leading-tight text-[30px] sm:text-[34px] md:text-[40px]"
                        style="color: rgba(37, 88, 220, 1);"
                    >
                        Our Mission
                    </h3>

                    <p
                        class="mt-4 sm:mt-5 max-w-[620px] text-base sm:text-[17px] md:text-[18px] leading-[1.55]"
                        style="color: rgba(107, 114, 128, 1);"
                    >
                        Building India's largest cancer care community by
                        raising awareness, empowering caregivers, supporting
                        patients, and ensuring no family fights cancer alone.
                    </p>

                </div>

                <!-- ================= RIGHT SIDE ================= -->

                <div
                    class="flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 bg-[#F5F6F8] px-6 py-8 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12 box-border"
                >

                    <div class="space-y-4 sm:space-y-5">

                        <!-- ================= AWARENESS ================= -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div
                                class="flex h-6 w-6 shrink-0 items-center justify-center mt-0.5"
                            >
                                <img
                                    src={awarenessIcon}
                                    alt=""
                                    class="h-6 w-6 object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: rgba(12, 31, 86, 1);"
                            >
                                Cancer awareness: Educating communities
                            </p>

                        </div>

                        <!-- ================= CAREGIVER ================= -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div
                                class="flex h-6 w-6 shrink-0 items-center justify-center mt-0.5"
                            >
                                <img
                                    src={caregiverIcon}
                                    alt=""
                                    class="h-6 w-6 object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: rgba(12, 31, 86, 1);"
                            >
                                Caregiver training: Building essential skills
                            </p>

                        </div>

                        <!-- ================= PATIENT SUPPORT ================= -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div
                                class="flex h-6 w-6 shrink-0 items-center justify-center mt-0.5"
                            >
                                <img
                                    src={supportIcon}
                                    alt=""
                                    class="h-6 w-6 object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: rgba(12, 31, 86, 1);"
                            >
                                Patient support services: Guidance throughout
                                treatment
                            </p>

                        </div>

                        <!-- ================= COMMUNITY ================= -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div
                                class="flex h-6 w-6 shrink-0 items-center justify-center mt-0.5"
                            >
                                <img
                                    src={communityIcon}
                                    alt=""
                                    class="h-6 w-6 object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: rgba(12, 31, 86, 1);"
                            >
                                Community building: Connecting patients and
                                families
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>