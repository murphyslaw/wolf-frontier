import { HeadingOne } from "../../components/HeadingOne.tsx";
import { HeadingTwo } from "../../components/HeadingTwo.tsx";
import { Link } from "../../components/Link.tsx";
import { Paragraph } from "../../components/Paragraph.tsx";

export default function TermsOfService() {
  return (
    <>
      <HeadingOne>
        Terms of Service
      </HeadingOne>

      <Paragraph>
        Please read these terms of service ("terms", "terms of service")
        carefully before using <Link href="/">wolf-frontier.uk</Link>{" "}
        website (the "service") operated by the EVE Frontier entity WOLF -
        Wandering Order of the Last ("us", "we", "our", WOLF).
      </Paragraph>

      <HeadingTwo>Conditions of Use</HeadingTwo>

      <Paragraph>
        We will provide our services to you, which are subject to the conditions
        stated below in this document. Every time you visit this website, use
        its services, you accept the following conditions. This is why we urge
        you to read them carefully.
      </Paragraph>

      <Paragraph>
        Any of the trademarks, service marks, collective marks, design rights,
        personality rights or similar rights that are mentioned, used or cited
        on this site are the property of their respective owners. Unless
        otherwise stated, WOLF sites are neither endorsed by nor affiliated with
        any of the holders of such rights, nor can WOLF grant rights to use
        otherwise protected materials. Your use of any such incorporeal property
        is at your own risk.
      </Paragraph>

      <HeadingTwo>Privacy Policy</HeadingTwo>

      <Paragraph>
        Before you continue using our website we advise you to read our privacy
        policy <Link href="/legal/privacy-policy">privacy policy</Link>{" "}
        regarding our user data collection. It will help you better understand
        our practices.
      </Paragraph>

      <HeadingTwo>CCP Copyright Notice</HeadingTwo>

      <Paragraph>
        EVE Frontier and the EVE logo are the registered trademarks of CCP ehf.
        All rights are reserved worldwide. All other trademarks are the property
        of their respective owners. EVE Frontier, the EVE logo, EVE and all
        associated logos and designs are the intellectual property of CCP ehf.
        All artwork, screenshots, characters, vehicles, storylines, world facts
        or other recognizable features of the intellectual property relating to
        these trademarks are likewise the intellectual property of CCP ehf. CCP
        ehf. has granted permission to WOLF to use EVE Frontier and all
        associated logos and designs for promotional and information purposes on
        its website but does not endorse, and is not in any way affiliated with,
        WOLF. CCP ehf. is in no way responsible for the content on or
        functioning of this website, nor can it be liable for any damage arising
        from the use of this website.
      </Paragraph>

      <HeadingTwo>Communications</HeadingTwo>

      <Paragraph>
        The entire communication with us is electronic. Every time you send us
        an email or visit our website, you are going to be communicating with
        us. You hereby consent to receive communications from us. We will
        continue to communicate with you by posting news and notices on our
        website. You also agree that all notices, disclosures, agreements, and
        other communications we provide to you electronically meet the legal
        requirements that such communications be in writing.
      </Paragraph>

      <HeadingTwo>Applicable Law</HeadingTwo>

      <Paragraph>
        Please note that the information found here may be in violation of the
        laws of the country or jurisdiction from where you are viewing this
        information. WOLF does not encourage the violation of any laws, but this
        information is stored on a server in Germany, and is maintained in
        reference to the protections afforded to content providers and readers
        in that jurisdiction. The laws in your country may not recognize a
        similarly broad protection of free speech; WOLF cannot be responsible
        for potential violations of such laws, should you link to this domain or
        reuse any of the information contained herein.
      </Paragraph>

      <HeadingTwo>Disputes</HeadingTwo>

      <Paragraph>
        Any dispute related in any way to your visit to this website shall be
        arbitrated by state or federal court Berlin, Germany and you consent to
        exclusive jurisdiction and venue of such courts.
      </Paragraph>

      <HeadingTwo>License and Site Access</HeadingTwo>

      <Paragraph>
        The content of this site is being provided under the EVE Frontier{" "}
        <Link href="https://www.evefrontier.com/en/nda">
          NDA & Disclaimers
        </Link>, and no kind of agreement or contract is created between you and
        the owners or users of this site, the owners of the servers upon which
        it is housed, individual contributors to these pages, or project
        administrators, sysops or anyone else connected with this project
        subject to your claims against them directly. You are granted a limited
        license to copy anything from this site; it does not create or imply any
        contractual or extracontractual liability on the part of WOLF or any of
        its agents, members, organizers or other users.
      </Paragraph>
    </>
  );
}
