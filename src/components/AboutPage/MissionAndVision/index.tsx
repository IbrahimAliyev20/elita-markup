import Image from "next/image";
import React from "react";
import { MissionData } from "@/src/types";

interface MissionAndVisionProps {
  data: MissionData[] | null;
  aboutData: {
    image_1: string;
    image_2: string;
  };
}

const MissionAndVision: React.FC<MissionAndVisionProps> = ({
  data,
  aboutData,
}) => {
  const valuesItem = data?.[0];
  const visionItem = data?.[1];
  const missionItem = data?.[2];

  return (
    <div className="flex flex-col py-14">
      {/* Mission Section */}
      <div className="flex flex-col md:flex-row justify-between w-full pb-10">
        <div className="flex flex-row items-center gap-5 w-full md:w-[45%]">
          {/* SVG Icon */}
          <div className="flex-shrink-0">
            <svg
              width="76"
              height="282"
              viewBox="0 0 76 282"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_10670_2917)">
                <path
                  d="M16.817 225V206.175H60.24V86.95H16.566V72.894C22.7573 72.392 29.116 71.4717 35.642 70.133C42.3353 68.7943 48.8613 66.7027 55.22 63.858C61.5787 60.846 67.3517 56.9973 72.539 52.312H82.579V206.175H123.492V225H16.817Z"
                  fill="#18181B"
                />
              </g>
              <rect x="73" width="3" height="282" fill="#18181B" />
              <defs>
                <clipPath id="clip0_10670_2917">
                  <rect
                    width="73"
                    height="214"
                    fill="white"
                    transform="translate(0 34)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-textBase font-archivo text-3xl font-medium leading-8">
              {missionItem?.title ?? "Missiyamız"}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  missionItem?.description ?? "",
              }}
              className="text-elementSecondary font-manrope text-base leading-6"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={aboutData.image_1}
            alt="mission"
            width={500}
            height={500}
            className="w-[320px] h-[400px] object-cover"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="flex flex-col md:flex-row justify-center items-center w-full pb-10">
        <div className="flex flex-row items-center gap-3 w-full md:w-[45%]">
          {/* SVG Icon */}
          <div className="flex-shrink-0">
            <svg
              width="86"
              height="282"
              viewBox="0 0 86 282"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_10670_2918)">
                <path
                  d="M12.55 225V217.721C12.55 210.693 13.8887 204.251 16.566 198.394C19.4107 192.37 23.092 186.932 27.61 182.079C32.2953 177.059 37.5663 172.29 43.423 167.772C49.2797 163.254 55.22 158.82 61.244 154.469C69.4433 148.78 76.9733 143.09 83.834 137.401C90.862 131.712 96.4677 125.604 100.651 119.078C104.834 112.385 106.926 104.938 106.926 96.739C106.926 91.5517 105.671 86.8663 103.161 82.683C100.818 78.3323 97.2207 74.902 92.368 72.392C87.5153 69.882 81.324 68.627 73.794 68.627C64.9253 68.627 57.8137 70.133 52.459 73.145C47.1043 76.157 43.172 80.173 40.662 85.193C38.3193 90.213 37.148 95.735 37.148 101.759V112.05H15.311C15.1437 111.213 14.9763 109.958 14.809 108.285C14.6417 106.444 14.558 104.353 14.558 102.01C14.558 89.6273 17.319 79.671 22.841 72.141C28.363 64.4437 35.7257 58.838 44.929 55.324C54.1323 51.6427 64.0887 49.802 74.798 49.802C84.336 49.802 92.5353 51.1407 99.396 53.818C106.257 56.328 111.946 59.842 116.464 64.36C120.982 68.878 124.329 74.0653 126.504 79.922C128.679 85.6113 129.767 91.6353 129.767 97.994C129.767 105.859 128.345 113.054 125.5 119.58C122.823 126.106 118.974 132.214 113.954 137.903C109.101 143.425 103.328 148.78 96.635 153.967C90.109 159.154 82.9973 164.425 75.3 169.78C69.9453 173.294 64.6743 177.059 59.487 181.075C54.2997 184.924 49.8653 188.856 46.184 192.872C42.5027 196.888 40.16 200.737 39.156 204.418H130.771V225H12.55Z"
                  fill="#18181B"
                />
              </g>
              <rect x="83" width="3" height="282" fill="#18181B" />
              <defs>
                <clipPath id="clip0_10670_2918">
                  <rect
                    width="83"
                    height="214"
                    fill="white"
                    transform="translate(0 34)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-textBase font-archivo text-3xl font-medium leading-8">
              {visionItem?.title ?? "Vizyonumuz"}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  visionItem?.description ?? "",
              }}
              className="text-elementSecondary font-manrope text-base leading-6"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="hidden md:block">
          <Image
            src={aboutData.image_2}
            alt="values"
            width={500}
            height={500}
            className="w-[320px] h-[400px] object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="flex flex-row items-center gap-5 w-full md:w-[45%]">
          <div className="flex-shrink-0">
            <svg
              width="103"
              height="282"
              viewBox="0 0 103 282"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_10670_2934)">
                <path
                  d="M72.288 228.012C58.9013 228.012 47.6063 226.004 38.403 221.988C29.1997 217.805 22.2553 211.948 17.57 204.418C12.8847 196.888 10.542 187.936 10.542 177.561V174.298H32.881V177.561C32.881 187.936 36.144 195.884 42.67 201.406C49.3633 206.761 58.5667 209.438 70.28 209.438C81.9933 209.438 91.4477 206.928 98.643 201.908C105.838 196.721 109.436 188.521 109.436 177.31C109.436 169.111 107.512 162.836 103.663 158.485C99.8143 154.134 94.7943 151.122 88.603 149.449C82.579 147.608 76.1367 146.688 69.276 146.688H51.204V128.114H70.029C76.3877 128.114 82.2443 127.11 87.599 125.102C92.9537 123.094 97.2207 119.831 100.4 115.313C103.747 110.628 105.42 104.604 105.42 97.241C105.42 90.5477 103.914 85.1093 100.902 80.926C98.0573 76.7427 94.125 73.647 89.105 71.639C84.085 69.4637 78.563 68.376 72.539 68.376C65.8457 68.376 59.8217 69.5473 54.467 71.89C49.1123 74.0653 44.8453 77.412 41.666 81.93C38.654 86.448 37.148 92.1373 37.148 98.998V102.261H14.558V97.743C14.558 88.205 16.9843 79.8383 21.837 72.643C26.857 65.4477 33.634 59.842 42.168 55.826C50.8693 51.81 60.8257 49.802 72.037 49.802C83.081 49.802 92.7863 51.559 101.153 55.073C109.687 58.587 116.38 63.7743 121.233 70.635C126.086 77.4957 128.512 85.946 128.512 95.986C128.512 103.349 127.173 109.624 124.496 114.811C121.819 119.831 118.305 124.014 113.954 127.361C109.603 130.708 104.918 133.469 99.898 135.644V136.648C109.101 139.325 116.799 144.178 122.99 151.206C129.181 158.234 132.277 167.437 132.277 178.816C132.277 189.023 129.683 197.808 124.496 205.171C119.476 212.534 112.364 218.223 103.161 222.239C94.125 226.088 83.834 228.012 72.288 228.012Z"
                  fill="#18181B"
                />
              </g>
              <rect x="100" width="3" height="282" fill="#18181B" />
              <defs>
                <clipPath id="clip0_10670_2934">
                  <rect
                    width="103"
                    height="214"
                    fill="white"
                    transform="translate(0 34)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-textBase font-archivo text-3xl font-medium leading-8">
              {valuesItem?.title ?? "Dəyərimiz"}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  valuesItem?.description ?? "",
              }}
              className="text-elementSecondary font-manrope text-base leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;
