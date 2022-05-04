import ButtonLink from "../actions/ButtonLink";
import MobileLogo from "./MobileLogo";

const Copyright = ({ withLogo = false, color = "primary" }) => {
  if (withLogo)
    return (
      <div className="w-full py-8 bg-dark-backgroundDark flex flex-col justify-center items-center text-whites-dark font-light text-2xs tracking-tight">
        <span>
          <MobileLogo size="tiny" color={color} />
        </span>
        <span>
          Copyright © 2022 -{" "}
          <span>
            <a
              className="underline"
              target="_blank"
              href="https://www.meshu-web.dev"
            >
              meshu-web.dev
            </a>
          </span>{" "}
          - All rights reserved
        </span>
        <div className="flex space-x-12 pt-2">
          <ButtonLink
            text="Privacy Policy"
            href="/privacy-policy"
            className="privacy text-whites-dark text-xs"
            textOnly
          />
          <ButtonLink
            text="Terms & Conditions"
            href="/terms-conditions"
            className="privacy text-whites-dark text-xs"
            textOnly
          />
        </div>
      </div>
    );

  return (
    <div className="w-full py-8 bg-dark-backgroundDark flex flex-col justify-center items-center text-whites-dark font-light text-2xs tracking-tight">
      <span>
        Copyright © 2022 -{" "}
        <span>
          <a
            className="underline"
            target="_blank"
            href="https://www.meshu-web.dev"
          >
            meshu-web.dev
          </a>
        </span>{" "}
        - All rights reserved
      </span>
      <div className="flex space-x-12 pt-2">
        <ButtonLink
          text="Privacy Policy"
          href="/privacy-policy"
          className="privacy text-whites-dark text-xs"
          textOnly
        />
        <ButtonLink
          text="Terms & Conditions"
          href="/terms-conditions"
          className="privacy text-whites-dark text-xs"
          textOnly
        />
      </div>
    </div>
  );
};

export default Copyright;
