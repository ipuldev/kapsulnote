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
    <Link href={props.href} className={clsx(props.classNames, "bg-black text-white rounded-md mt-5 px-4 py-2 text-white hover:shadiw-lg duration-150 flex gap-2 fixed top-0 left-2")}>
        <ChevronLeft></ChevronLeft>
        Back
    </Link>
  );
}
