import React from "react";

interface FormSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export default function FormSectionTitle({
  title,
  ...props
}: FormSectionTitleProps) {
  return (
    <div className="col-span-2 mb-5 flex flex-col border-b border-[#323138]" {...props}>
      <h2 className="!text-lg font-WFVisualSansRegular py-5" >
        {title}
      </h2>
      
    </div>
  );
}
