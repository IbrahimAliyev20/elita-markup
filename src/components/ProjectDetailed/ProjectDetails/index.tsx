import React from "react";
import { useTranslation } from "react-i18next";

interface ProjectDetailsProps {
  description: string;

}

function ProjectDetails({ description }: ProjectDetailsProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col xl:flex-row justify-between py-8 lg:py-14">
      <div className="flex flex-col w-full lg:w-auto">
        <div className="mb-[60px] lg:mb-[100px]">
          <div className="flex gap-3 lg:gap-5 items-center">
            <span className="text-elements text-lg lg:text-xl font-medium font-Moneta">
              (01)
            </span>
            <span className="h-[1px] w-full bg-elements"></span>
          </div>
          <h2 className="text-textBase text-right pt-6 lg:pt-8 font-archivo text-2xl md:text-3xl lg:text-4xl font-medium leading-9">
            {t("service_about")}
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:mt-0">
        <div className="hidden lg:flex items-center h-[21px]">
          <span className="h-[1px] w-full bg-elements"></span>
        </div>
        <div className="flex flex-col gap-6 lg:gap-8">
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-secondary pt-6 lg:pt-8 text-left flex flex-col items-start text-sm lg:text-base font-manrope max-w-full lg:max-w-[805px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
