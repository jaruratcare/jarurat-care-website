<script>
    import exploreRoles from '$lib/svg/explore-roles.svg';
    import selectDomain from '$lib/svg/select-domain.svg';
    import submitApplication from '$lib/svg/submit-application.svg';
    import teamReview from '$lib/svg/team-review.svg';
    import interview from '$lib/svg/interview.svg';
    import onboarding from '$lib/svg/onboarding.svg';

    const steps = [
        {
            title: "Explore Roles",
            description: "View available opportunities.",
            icon: exploreRoles
        },
        {
            title: "Select Domain",
            description: "Choose your area of interest.",
            icon: selectDomain
        },
        {
            title: "Submit Application",
            description: "Apply in just a few steps.",
            icon: submitApplication
        },
        {
            title: "Team Review",
            description: "Our team carefully reviews your application.",
            icon: teamReview
        },
        {
            title: "Interview",
            description: "Discuss your interests and goals with our team.",
            icon: interview
        },
        {
            title: "Onboarding",
            description: "Begin your internship journey with Jarurat Care.",
            icon: onboarding
        }
    ];
</script>

<section class="bg-white py-12 md:py-24 overflow-hidden box-border">

    <!-- Main section container -->
    <div class="w-[92%] sm:w-[91%] max-w-[1560px] mx-auto box-border">

        <!-- SECTION HEADING -->
        <div class="text-center mb-10 md:mb-14 px-2">

            <h2
                class="font-extrabold text-3xl sm:text-4xl md:text-[46px] leading-tight"
                style="color: #0c1f56;"
            >
                Be Part of JCF
            </h2>

            <p
                class="mt-3 sm:mt-4 text-base sm:text-lg md:text-[20px] leading-relaxed"
                style="color: #6b778c;"
            >
                Students and passionate individuals are welcome to contribute
                <br class="hidden md:block" />
                and make a difference.
            </p>

        </div>


        <!-- MAIN TWO-COLUMN CARD -->
        <div
            class="w-full overflow-hidden rounded-[20px] sm:rounded-[26px] shadow-[0_6px_20px_rgba(0,0,0,0.10)] box-border"
        >

            <div class="grid grid-cols-1 md:grid-cols-2">


                <!-- ================= LEFT SIDE ================= -->

                <div
                    class="bg-white px-6 py-8 sm:px-7 sm:py-9 md:px-9 md:py-10 lg:px-9 box-border"
                >

                    <!-- Graduation Cap Icon -->
                    <div
                        class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6"
                        style="background-color: #e9eef8;"
                    >

                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#2563eb"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="sm:w-[27px] sm:h-[27px]"
                        >
                            <path d="M22 10L12 5 2 10l10 5 10-5Z" />

                            <path
                                d="M6 12.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-3.5"
                            />

                            <path d="M22 10v6" />
                        </svg>

                    </div>


                    <!-- TITLE -->

                    <h3
                        class="font-semibold text-[30px] sm:text-[34px] md:text-[40px] leading-tight"
                        style="color: #2857d9;"
                    >
                        Internship Opportunity
                    </h3>


                    <!-- DESCRIPTION -->

                    <p
                        class="mt-4 sm:mt-5 max-w-[650px] text-base sm:text-[17px] md:text-[18px] leading-[1.55]"
                        style="color: #68758a;"
                    >
                        We regularly offer internships through internshala where
                        students can contribute to research, outreach programs,
                        digital initiatives, and awareness campaigns.
                    </p>


                    <!-- BUTTON -->

                    <a
                        href="https://internshala.com/company/jarurat-care-1716706901"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center mt-6 sm:mt-7 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-white font-semibold text-base sm:text-[17px] transition-transform duration-200 hover:scale-[1.02]"
                        style="background-color: #2857d9;"
                    >
                        Apply For Internship
                    </a>

                </div>


                <!-- ================= RIGHT SIDE ================= -->

                <div
                    class="px-6 py-8 sm:px-7 sm:py-9 md:px-9 md:pt-[76px] md:pb-8 lg:px-7 box-border"
                    style="background-color: #f3f4f7;"
                >

                    <div class="space-y-4">


                        <!-- EXPLORE ROLES -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div class="flex-shrink-0 mt-0.5">
                                <img
                                    src={exploreRoles}
                                    alt=""
                                    class="w-6 h-6 sm:w-[27px] sm:h-[27px] object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: #173477;"
                            >
                                <span class="font-medium">
                                    Explore Roles:
                                </span>
                                View available opportunities.
                            </p>

                        </div>


                        <!-- SELECT DOMAIN -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div class="flex-shrink-0 mt-0.5">
                                <img
                                    src={selectDomain}
                                    alt=""
                                    class="w-6 h-6 sm:w-[27px] sm:h-[27px] object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: #173477;"
                            >
                                <span class="font-medium">
                                    Select Domain:
                                </span>
                                Choose your area of interest.
                            </p>

                        </div>


                        <!-- SUBMIT APPLICATION -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div class="flex-shrink-0 mt-0.5">
                                <img
                                    src={submitApplication}
                                    alt=""
                                    class="w-6 h-6 sm:w-[27px] sm:h-[27px] object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: #173477;"
                            >
                                <span class="font-medium">
                                    Submit Application:
                                </span>
                                Apply in just a few steps.
                            </p>

                        </div>


                        <!-- TEAM REVIEW -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div class="flex-shrink-0 mt-0.5">
                                <img
                                    src={teamReview}
                                    alt=""
                                    class="w-6 h-6 sm:w-[27px] sm:h-[27px] object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: #173477;"
                            >
                                <span class="font-medium">
                                    Team Review:
                                </span>
                                Our team carefully reviews your application.
                            </p>

                        </div>


                        <!-- INTERVIEW -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div class="flex-shrink-0 mt-0.5">
                                <img
                                    src={interview}
                                    alt=""
                                    class="w-6 h-6 sm:w-[27px] sm:h-[27px] object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: #173477;"
                            >
                                <span class="font-medium">
                                    Interview:
                                </span>
                                Discuss your interests and goals with our team.
                            </p>

                        </div>


                        <!-- ONBOARDING -->

                        <div class="flex items-start gap-3.5 sm:gap-4">

                            <div class="flex-shrink-0 mt-0.5">
                                <img
                                    src={onboarding}
                                    alt=""
                                    class="w-6 h-6 sm:w-[27px] sm:h-[27px] object-contain"
                                />
                            </div>

                            <p
                                class="text-base sm:text-[17px] md:text-[18px] leading-[1.45]"
                                style="color: #173477;"
                            >
                                <span class="font-medium">
                                    Onboarding:
                                </span>
                                Begin your internship journey with Jarurat Care.
                            </p>

                        </div>


                    </div>

                </div>

            </div>

        </div>

    </div>

</section>