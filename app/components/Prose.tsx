import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export function Prose({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={clsx(className, "article-body")} {...props} />;
}
