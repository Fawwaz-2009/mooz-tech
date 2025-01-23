import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface WaitlistWelcomeEmailProps {
  position: number;
  discountPercentage: number;
}

export const WaitlistWelcomeEmail = ({
  position,
  discountPercentage,
}: WaitlistWelcomeEmailProps) => {
  const previewText = `You&apos;re In! Join Fadi&apos;s Waitlist with ${discountPercentage}% off`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to the Future of SEO
            </Heading>
            
            <Text className="text-black text-[14px] leading-[24px]">
              Great news! You&apos;ve secured position #{position} on Fadi&apos;s exclusive waitlist. 
              As one of our early supporters, you&apos;ll get {discountPercentage}% off when we launch.
            </Text>

            <Section className="my-[32px]">
              <Heading className="text-black text-[18px] font-semibold mb-[16px]">
                What&apos;s Coming Your Way
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Get ready to experience AI-powered SEO that works as your personal expert:
              </Text>
              <ul className="list-disc pl-[20px] mt-[16px]">
                <li className="text-black text-[14px] leading-[24px]">Instant SEO Scorecard: Get actionable insights in seconds</li>
                <li className="text-black text-[14px] leading-[24px]">Quick-Fix Enhancements: Optimize your content faster than ever</li>
                <li className="text-black text-[14px] leading-[24px]">Smart Content Transformations: Turn articles into audio and more</li>
              </ul>
            </Section>

            <Text className="text-black text-[14px] leading-[24px] italic">
              We&apos;re putting the finishing touches on something special. Your {discountPercentage}% launch discount is locked in, and you&apos;ll be among the first to know when we&apos;re ready to transform your SEO game.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://pages.mooz.tech/fadi"
              >
                Learn More About Fadi
              </Button>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-black text-[14px] leading-[24px]">
              Excited to have you onboard,<br />
              The Fadi Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WaitlistWelcomeEmail.PreviewProps = {
  position: 22,
  discountPercentage: 20,
} as WaitlistWelcomeEmailProps;

export default WaitlistWelcomeEmail; 