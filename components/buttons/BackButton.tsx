import { type ComponentProps } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft } from "../icons/ChevronLeft";

type Props = ComponentProps<"button"> & {
  href: string
  classNames?: string
};

export function BackButton(props : Props) {
  return (
    <Link href={props.href} className={clsx(props.classNames, "bg-white text-black rounded-md px-4 py-2 border border-black hover:shadiw-lg duration-150 flex gap-2")}>
        <ChevronLeft></ChevronLeft>
        Back
    </Link>
  );
}
