export default function News() {
  return (
    <>
      <h1 class="displayLarge">
        <span class="text-orange">N</span>ews
      </h1>

      <article class="max-w-[40vw] flex flex-col gap-y-8 mx-auto">
        <header>
          <h2 class="headlineLarge">
            WOLF launches EVE Frontier web presence
          </h2>

          <time class="labelMedium text-grayLight" datetime="2024-12-21 09:00">
            2024-12-21 09:09
          </time>
        </header>

        <main class="flex flex-col gap-y-8">
          <p class="bodyMedium">
            We are very proud to officially launch our web presence for the EVE
            Frontier tribe{" "}
            <span class="text-orange">WOLF - Wandering Order</span>{" "}
            of the Last Frontier. It not just marks the beginning of improved
            communication within our tribe, but also an opportunity to connect
            with other survivors in this harsh and shattered frontier.
          </p>

          <p class="bodyMedium">
            In the upcoming weeks, you will be presented with an evergrowing
            density of information about WOLF and EVE Frontier. Interactive
            access points will provide you valuable insights and services, which
            are about to enhance your in-game abilities.
          </p>

          <ul class="bodyMedium bulletList">
            <li>Retrieve up-to-date intelligence reports</li>

            <li>
              Create awareness of ongoing conflicts within the solar system
            </li>

            <li>
              Dive into the social structures the survivors are shaping
            </li>

            <li>
              Access tools and services to enhance your economic success and
              industry endeavours
            </li>
          </ul>

          <p class="bodyMedium">
            In this first iteration, we mainly provide informational access to
            the World API, slightly enhanced with manually collected information
            or data available in the builder community. You can retrieve{" "}
            <a href="/characters">Smart Character</a>{" "}
            data and see a listing including officer labels of the WOLF tribe
            members.
          </p>

          <p class="bodyMedium">
            We are constantly roaming the stars and therefore looking for other
            survivors that either want to exchange information and join our
            quest to rebuild the shattered universe. If you happen to be one of
            those dangling souls, reach out to us on{" "}
            <a href="https://discord.gg/4tK66raYzC">Discord</a>.
          </p>

          <p class="bodyMedium">
            Awake eternally,<br />
            Murphyslaw
          </p>
        </main>
      </article>
    </>
  );
}