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
    <div className="col-span-2 mb-4 flex flex-col  " {...props}>
      <h2 className="!text-lg " >
        {title}
      </h2>
      <hr className="col-span-2 border-accent" />
    </div>
  );
}
