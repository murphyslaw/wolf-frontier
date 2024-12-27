export default function News() {
  return (
    <>
      <h1 class="displayLarge">
        <span class="text-orange-600">N</span>ews
      </h1>

      <div class="flex flex-col gap-16">
        <article class="max-w-[40vw] flex flex-col gap-y-8 mx-auto">
          <header>
            <h2 class="headlineLarge">
              smarter gates and more current data
            </h2>

            <time
              class="labelMedium text-grayLight"
              datetime="2024-12-21 09:00"
            >
              2024-12-27 16:17
            </time>
          </header>

          <main class="flex flex-col gap-y-8">
            <p class="bodyMedium">
              A crucial information for Smart Gates was missing -{" "}
              <span class="text-orange-600">Linked Gate Information</span>{" "}
              is now available.
            </p>

            <p class="bodyMedium">
              You are now able to see if a Smart Gate is linked and to what
              other Smart Gate it is linked to. You can even click the linked
              Smart Gate and see its details.
            </p>

            <img
              class="bordered"
              src="/images/news/linked-smart-gate.jpg"
            />

            <p class="bodyMedium">
              This time around, we mainly improved the backend side, where the
              data is now{" "}
              <span class="text-orange-600">
                synched and loaded more dynamically
              </span>. For example, Killmails are synched every hour, all Smart
              Character and Smart Assembly data is at least synched once a day,
              but also refetched in the background, if the details are requested
              and they are older than 10 minutes. The threshold might need to be
              adjusted in the future, depending on how heavy the page is used.
            </p>

            <p class="bodyMedium">
              We also improved the consistency of the page header for character
              and tribe pages, and the tribes got a "random" image, to make them
              more recognizable. You will also find a direct link to the most
              recent blockchain data in the character information section. Most
              pages now have{" "}
              <span class="text-orange-600">Tabbed Content</span>, which reduces
              a bit the load on the new lazy load and synchronization
              functionality, by not loading everything right away in the
              background.
            </p>

            <img
              class="bordered"
              src="/images/news/tabbed-content.jpg"
            />

            <p class="bodyMedium">
              Fly Safe,<br />
              Murphyslaw
            </p>
          </main>
        </article>

        <article class="max-w-[40vw] flex flex-col gap-y-8 mx-auto">
          <header>
            <h2 class="headlineLarge">
              integration of smart assemblies
            </h2>

            <time
              class="labelMedium text-grayLight"
              datetime="2024-12-21 09:00"
            >
              2024-12-23 17:29
            </time>
          </header>

          <main class="flex flex-col gap-y-8">
            <p class="bodyMedium">
              A major new feature was added to the page -{" "}
              <span class="text-orange-600">Smart Assemblies Insights</span>.
            </p>

            <p class="bodyMedium">
              You are now able to see the status of smart assemblies, like if
              they are online, how much fuel (hours) they have left, who owns it
              and in which solar system it is located. You can also directly
              open the latest Blockchain data for the selected Smart Assembly.
              Get deeper insights about Smart Assemblies of a character, of a
              whole tribe or within a solar system.
            </p>

            <img
              class="bordered"
              src="/images/news/smart-assemblies-insights.jpg"
            />

            <p class="bodyMedium">
              Additionally, we've overhauled the display of the killmails, to
              give it a bit more of a timeline vibe of events happening in the
              frontier.
            </p>

            <img
              class="bordered"
              src="/images/news/killmails-timeline.jpg"
            />

            <p class="bodyMedium">
              See you in the stars,<br />
              Murphyslaw
            </p>
          </main>
        </article>

        <article class="max-w-[40vw] flex flex-col gap-y-8 mx-auto">
          <header>
            <h2 class="headlineLarge">
              WOLF launches EVE Frontier web presence
            </h2>

            <time
              class="labelMedium text-grayLight"
              datetime="2024-12-21 09:00"
            >
              2024-12-21 09:09
            </time>
          </header>

          <main class="flex flex-col gap-y-8">
            <p class="bodyMedium">
              We are very proud to officially launch our web presence for the
              EVE Frontier tribe{" "}
              <span class="text-orange-600">WOLF - Wandering Order</span>{" "}
              of the Last Frontier. It not just marks the beginning of improved
              communication within our tribe, but also an opportunity to connect
              with other survivors in this harsh and shattered frontier.
            </p>

            <p class="bodyMedium">
              In the upcoming weeks, you will be presented with an evergrowing
              density of information about WOLF and EVE Frontier. Interactive
              access points will provide you valuable insights and services,
              which are about to enhance your in-game abilities.
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
              the World API, slightly enhanced with manually collected
              information or data available in the builder community. You can
              retrieve <a href="/characters">Smart Character</a>{" "}
              data and see a listing including officer labels of the WOLF tribe
              members.
            </p>

            <p class="bodyMedium">
              We are constantly roaming the stars and therefore looking for
              other survivors that either want to exchange information and join
              our quest to rebuild the shattered universe. If you happen to be
              one of those dangling souls, reach out to us on{" "}
              <a href="https://discord.gg/4tK66raYzC">Discord</a>.
            </p>

            <p class="bodyMedium">
              Awake eternally,<br />
              Murphyslaw
            </p>
          </main>
        </article>
      </div>
    </>
  );
}
