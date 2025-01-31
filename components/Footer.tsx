import { OnlineBadgeIndicator } from "./OnlineBadgeIndicator.tsx";

interface Props {
  worldApiStatus: boolean;
}

export function Footer({ worldApiStatus }: Props) {
  return (
    <footer class="h-min-60 px-12 py-16 bg-gray text-white">
      <div class="grid grid-cols-4 justify-between">
        <a href="/" class="col-span-2">
          <svg
            width="72"
            height="72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#a)">
              <path
                d="M26.963 28.152 29.027.744c.048-.144.096-.288.288-.48a.733.733 0 0 1 .48-.192h2.256c.144 0 .288.096.432.192.144.192.192.336.192.48L30.18 32.328c0 .192-.096.336-.192.48-.192.144-.336.192-.528.192h-2.88c-.432 0-.768-.192-1.008-.576L19.283 21.72l-6.288 10.704c-.24.384-.576.576-1.008.576h-2.88c-.192 0-.336-.048-.528-.192-.096-.144-.192-.288-.192-.48L5.891.744c-.048-.144 0-.288.144-.48.144-.096.288-.192.48-.192h2.256c.192 0 .336.096.48.192.144.192.192.336.24.48l2.112 27.408 5.712-10.176c.24-.384.576-.576 1.008-.576h1.92c.432 0 .768.192 1.008.576l5.712 10.176ZM58.08 33H47.376c-.96 0-1.872-.192-2.736-.576-.816-.336-1.536-.864-2.208-1.44-.576-.672-1.104-1.392-1.44-2.256a6.662 6.662 0 0 1-.576-2.736V7.08c0-.96.192-1.872.576-2.688.336-.864.864-1.632 1.44-2.256.672-.624 1.392-1.152 2.208-1.488a6.662 6.662 0 0 1 2.736-.576H58.08c.96 0 1.872.192 2.688.576a6.604 6.604 0 0 1 2.256 1.488 6.604 6.604 0 0 1 1.488 2.256c.384.816.576 1.728.576 2.688v18.912c0 .96-.192 1.872-.576 2.736-.336.864-.864 1.584-1.488 2.256-.624.576-1.392 1.104-2.256 1.44A6.284 6.284 0 0 1 58.08 33Zm0-29.28H47.376c-.912 0-1.728.336-2.352.96-.672.672-1.008 1.488-1.008 2.4v18.912c0 .912.336 1.728 1.008 2.4.624.624 1.44.96 2.352.96H58.08c.912 0 1.728-.336 2.4-.96.624-.672.96-1.488.96-2.4V7.08c0-.912-.336-1.728-.96-2.4-.672-.624-1.488-.96-2.4-.96ZM8.387 36.264c.192-.144.336-.192.48-.192h2.304c.432 0 .672.24.672.672v28.608h18.768c.192 0 .336.096.48.192.144.192.192.336.192.48v2.304c0 .432-.24.672-.672.672H8.867c-.144 0-.288-.048-.48-.192-.096-.144-.192-.288-.192-.48V36.744c0-.192.096-.336.192-.48Zm32.749 32.064V36.744c0-.432.24-.672.672-.672h22.368c.432 0 .672.24.672.672v2.304c0 .432-.24.672-.672.672h-19.44v10.992h17.808c.144 0 .336.048.432.24.192.096.24.288.24.432v2.304a.532.532 0 0 1-.24.48c-.096.144-.288.192-.432.192H44.736v13.968c0 .432-.24.672-.672.672h-2.256c-.432 0-.672-.24-.672-.672Z"
                fill="#FAFAE5"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h72v72H0z" />
              </clipPath>
            </defs>
          </svg>
        </a>

        <ul>
          <li>
            <h3 class="labelSmall text-grayLight">
              Legal
            </h3>
          </li>

          <li>
            <a href="/legal/terms-of-service" class="bodyMedium">
              Terms of Service
            </a>
          </li>

          <li>
            <a href="/legal/privacy-policy" class="bodyMedium">
              Privacy Policy
            </a>
          </li>
        </ul>

        <ul>
          <li>
            <h3 class="labelSmall text-grayLight">
              Related Content
            </h3>
          </li>

          <li>
            <a href="https://www.evefrontier.com/" class="bodyMedium">
              EVE Frontier
            </a>
          </li>

          <li>
            <a href="https://www.ccpgames.com" class="bodyMedium">
              CCP Games
            </a>
          </li>

          <li>
            <a
              href="https://blockchain-gateway-stillness.live.tech.evefrontier.com/docs/doc.json"
              class="bodyMedium"
            >
              World API <OnlineBadgeIndicator online={worldApiStatus} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
